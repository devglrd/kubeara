<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('/', function () {
    return [
        'api'
    ];
});

Route::post('/register', [\App\Http\Controllers\Controller::class, 'register']);

Route::post('/auth', [\App\Http\Controllers\Controller::class, 'login']);

Route::get('/app/tenant', [\App\Http\Controllers\Controller::class, 'tenant'])->middleware('tenant.auth');
Route::middleware('tenant.auth')->group(function () {
    Route::get('/commits', [\App\Http\Controllers\Controller::class, 'commits']);
});

Route::get('/db', function (Request $request) {
    return [
        'tenant' => app('tenant'),
        'user'   => \App\Models\User::all()
    ];
});
