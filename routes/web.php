<?php

use Illuminate\Support\Facades\Route;

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
//Auth::routes();

Route::get('/dashboard/{path?}', [App\Http\Controllers\ReactController::class, 'index'])
    ->middleware('auth')
    ->name('dashboard')
    ->where('path', '.*');

Route::get('/{path?}', [App\Http\Controllers\ReactController::class, 'index'])
    ->name('react')
    //if the path contains the /api/ than let the api routes handle it. If not it's treated as a web route
    ->where('path', '^((?!api\/).)*$');

//
//
