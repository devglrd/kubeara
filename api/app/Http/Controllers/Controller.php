<?php

namespace App\Http\Controllers;

use App\Exceptions\ItemAlreadyExist;
use App\Exceptions\OvhApiException;
use App\Models\Commit;
use App\Models\Tenant;
use App\Traits\OvhTrait;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Foundation\Bus\DispatchesJobs;
use Illuminate\Foundation\Validation\ValidatesRequests;
use Illuminate\Http\Request;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\Http;
use mysqli;

class Controller extends BaseController
{
    use AuthorizesRequests, DispatchesJobs, ValidatesRequests, OvhTrait;

    public function register(Request $request)
    {

        $request->validate([
            'domain'   => 'required|string',
            'name'     => 'required|string',
            'password' => 'required|confirmed',
            'email'    => 'required|string'
        ]);

        $tenant = Tenant::whereDomain($request->domain)->orWhere('email', $request->email)->first();
        if ($tenant) throw new ItemAlreadyExist("Tenant already exist");

        $ovh = $this->ovhLogin();
        $this->registerDomain($request, $ovh);

        $tenant = $this->createTenant($request);

        $create = $this->createDatabase($request, $tenant);

        if (!$create) abort(500);


        Artisan::call('tenants:migrate');

        return [
            'data' => ['tenant' => $tenant]
        ];
    }

    public function login(Request $request)
    {
        $request->validate([
            'domain'   => "required|string",
            "password" => "required|string"
        ]);

        $tenant = Tenant::whereDomain($request->domain)->firstOrFail();

        $token = $tenant->createToken($request->domain);


        return ['data' => ['tenant' => $tenant, 'token' => $token]];

    }

    public function tenant(Request $request)
    {
        return [
            'user' => auth()->user(), 'tenant' => Tenant::find(app()->get('tenant')->id)
        ];
    }

    public function commits(Request $request)
    {

        return [
            "data" => Commit::all()
        ];
    }

    private function createDatabase(Request $request, Tenant $tenant)
    {


        $servername = "127.0.0.1";
        $username = "root";
        $password = "root";

        // Create connection
        $conn = new mysqli($servername, $username, $password);
        // Check connection
        if ($conn->connect_error) {
            return false;
        }

        // Create database
        $sql = "CREATE DATABASE " . $tenant->database;
        if ($conn->query($sql) === true) {
            return true;
        } else {
            return false;
        }
    }

    private function createTenant(Request $request)
    {
        $tenant = new Tenant();
        $tenant->name = str_slug($request->get('name'));
        $tenant->domain = $request->get('domain');
        $tenant->database = "kubeare_" . $request->get('domain');
        $tenant->email = $request->get('email');
        $tenant->save();
        $value_to_be_encrypted = $tenant->id . '_root';
        $tenant->password = Crypt::encrypt($value_to_be_encrypted);
        $tenant->user_password = bcrypt($request->get('confirm'));
        $tenant->save();

        return $tenant;

    }
}
