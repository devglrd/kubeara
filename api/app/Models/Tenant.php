<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Crypt;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Laravel\Sanctum\HasApiTokens;

class Tenant extends Model
{

    use HasApiTokens;

    protected $guarded = [];
    protected $connection = 'landlord';

    public function getPassword()
    {
        //dd($this->password, Crypt::decrypt($this->password));
        $crpyt = Crypt::decrypt($this->password);

        return str_replace($this->id . '_', '', $crpyt);
    }

    public function saveUser()
    {
        Schema::connection('landlord')->getConnection()->table('users')->insert([
            'name'         => $this->name,
            'email'        => $this->email,
            'password'     => bcrypt(request()->get('password')) ?? bcrypt('password'),
            'fk_tenant_id' => $this->id
        ]);

        //Artisan::call('tenants:migrate');
    }

    public function getCommits()
    {
        return $this->hasMany(Commit::class, 'fk_tenant_id', 'id');
    }


    public function configure()
    {

        config([
            'database.connections.tenant.database' => $this->database,
            'database.connections.tenant.password' => $this->getPassword(),
        ]);

        DB::purge('tenant');

        DB::reconnect('tenant');

        Schema::connection('tenant')->getConnection()->reconnect();

        return $this;
    }

    /**
     *
     */
    public function use()
    {
        app()->forgetInstance('tenant');

        app()->instance('tenant', $this);

        return $this;
    }
}
