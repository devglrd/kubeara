<?php

namespace App\Exceptions;

use Exception;
use Throwable;

class OvhApiException extends Exception
{

    public function __construct($message = "", $code = 0, Throwable $previous = null)
    {
        parent::__construct($message, $code, $previous);
    }

    /**
     * Report the exception.
     *
     * @return void
     */
    public function report()
    {
    }

    /**
     * Render the exception into an HTTP response.
     *
     */
    public function render($request)
    {
        return response()->json([
            'status' => 'error',
            'message' => $this->getMessage()
        ], 500);
    }
}
