<?php

namespace App\Http\Middleware;

use App\Models\Tenant;
use App\Models\User;
use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\Sanctum;

class TenantAuth
{
    /**
     * Handle an incoming request.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Closure $next
     * @return mixed
     */
    public function handle(Request $request, Closure $next)
    {
        if ($token = $request->bearerToken()) {
            [$id, $token] = explode('|', $token, 2);
            $instance = Schema::connection('landlord')->getConnection()->table('personal_access_tokens')->where('id', $id)->first();

            $has = hash_equals($instance->token, hash('sha256', $token));
            if (!$has) {
                abort(401);
            }
            $tenant = Tenant::findOrFail($instance->tokenable_id);
            $user = Schema::connection('landlord')->getConnection()->table('users')->where('fk_tenant_id', $tenant->id)->first();
            if ($user && $tenant) {
                return $next($request);
            }

        }
        abort(401);

    }
}
