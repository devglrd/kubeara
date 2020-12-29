<?php


namespace App\Traits;

use App\Exceptions\OvhApiException;
use \Ovh\Api;

trait OvhTrait
{


    public function registerDomain($request, $ovh)
    {
        $domain = $request->get('domain');

        try {
            $ovh->post("/domain/zone/kubeara.tech/record", [
                "fieldType" => "A",
                "subDomain" => $domain,
                "target"    => "51.38.41.215"
            ]);
        } catch (\Exception $e) {
            throw new OvhApiException($e->getMessage());
        }

        try {
            $ovh->post('/domain/zone/kubeara.tech/refresh');
        } catch (\Exception $e) {
            throw new OvhApiException($e->getMessage());
        }

        return $ovh;
    }

    public function ovhLogin()
    {

        /**
         * Instanciate an OVH Client.
         * You can generate new credentials with full access to your account on
         * the token creation page
         */
        $ovh = new Api('p0EFNW1BKmQQtxR5',  // Application Key
            'crr7KrLQDcPfwM8ZGwnAHPPYDY5TI5vn',  // Application Secret
            'ovh-eu',      // Endpoint of API OVH Europe (List of available endpoints)
            'aA4ZCRoiAwXhEHduTdPdvvH1Gp6YKHyq'); // Consumer Key

        return $ovh;
    }

}
