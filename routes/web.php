<?php

use App\Http\Controllers\LoginLogoutController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/login', function () {
    return view('pages.auth.login');
});
Route::post('/login', [LoginLogoutController::class, 'authenticate'])->name('login');
