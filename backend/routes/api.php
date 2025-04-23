<?php


use App\Http\Controllers\EmployeeController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::controller(AuthController::class)
    ->prefix('auth')
    ->group(function () {
        Route::post('/validate-token', 'validateToken');
        Route::post('/login', 'login');
        Route::middleware('auth:sanctum')->group(function () {
            Route::post('/logout', 'logout');
            Route::get('/fetch-user', 'fetchUser');
        });
});


Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(EmployeeController::class)->prefix('employees')->group(function () {
        Route::get('/', 'index')->middleware('permission:employee-list');
        Route::post('/', 'create')->middleware('permission:employee-create');
        // Route::get('/{employee}', 'show')->middleware('permission:employee-view');
        Route::put('/{employee}', 'update')->middleware('permission:employee-update');
        // Route::delete('/{employee}', 'destroy')->middleware('permission:employee-delete');
    });
});

