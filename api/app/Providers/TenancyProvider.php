<?php

namespace App\Providers;

use App\Models\Tenant;
use Illuminate\Queue\Events\JobProcessing;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\ServiceProvider;

class TenancyProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {

    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        $this->configureRequest();
        $this->configureQueue();
    }

    private function configureRequest()
    {
        if (!$this->app->runningInConsole()) {
            $host = $this->app['request']->getHost();
            if ($host === "127.0.0.1") {
                $bearer = request()->bearerToken();
                if ($bearer) {
                    $fakeHost = $this->getTenant($bearer);
                } else {
                    $fakeHost = "laravel.kubeare.tech";
                }
                Tenant::whereDomain($fakeHost)->firstOrFail()->configure()->use();
            } else {
                Tenant::whereDomain($host)->firstOrFail()->configure()->use();
            }
        }
    }

    public function configureQueue()
    {
        $this->app['queue']->createPayloadUsing(function () {
            return $this->app['tenant'] ? ['tenant_id' => $this->app['tenant']->id] : [];
        });

        $this->app['events']->listen(JobProcessing::class, function ($event) {
            if (isset($event->job->payload()['tenant_id'])) {
                Tenant::find($event->job->payload()['tenant_id'])->configure()->use();
            }
        });
    }

    private function getTenant($bearer)
    {
        [$id, $token] = explode('|', $bearer, 2);
        $instance = Schema::connection('landlord')->getConnection()->table('personal_access_tokens')->where('id', $id)->first();

        $has = hash_equals($instance->token, hash('sha256', $token));
        if (!$has) {
            abort(401);
        }
        if (!$instance) {
            abort(401);
        }
        $tenant = Tenant::findOrFail($instance->tokenable_id);

        return $tenant->domain;
    }
}
