<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome', ['nifValid' => null, 'error' => false]);
});

Route::post('/validarNif', 'RestController@validarNIF');
Route::post('/validarIBAN', 'RestController@validarIBAN');
Route::post('/consultarCP', 'RestController@consultarCP');
Route::post('/generarPresupuesto', 'RestController@generarPresupuesto');