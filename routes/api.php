<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;



Route::middleware(['auth:sanctum'])-> group(function () {

    Route::resource('users', 'App\Http\Controllers\UserController');
    Route::resource('posts', 'App\Http\Controllers\PostController');
});
