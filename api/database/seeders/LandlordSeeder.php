<?php

namespace Database\Seeders;

use App\Models\Tenant;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Crypt;

class LandlordSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Tenant::truncate();

        $t = new Tenant();
        $t->name = "Laravel";
        $t->domain = "laravel.kubeare.tech";
        $t->database = "kubeare_laravel";
        $t->email = 'glrd.remi@gmail.com';
        $t->save();
        $value_to_be_encrypted = $t->id . '_root';
        $t->password = Crypt::encrypt($value_to_be_encrypted);
        $t->user_password = bcrypt('password');
        $t->save();


        $t = new Tenant();
        $t->name = "Paravel";
        $t->domain = "paravel.kubeare.tech";
        $t->database = "kubeare_paravel";
        $t->email = 'glrd.remi2@gmail.com';
        $t->save();
        $value_to_be_encrypted = $t->id . '_root';
        $t->password = Crypt::encrypt($value_to_be_encrypted);
        $t->user_password = bcrypt('password');
        $t->save();


    }
}
