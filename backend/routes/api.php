<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProjectController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CountryAssignController;

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
        Route::get('/list-employee', 'index')->middleware('permission:employee_list');
        Route::post('/new-employee', 'create')->middleware('permission:employee_create');
        // Route::get('/{employee}', 'show')->middleware('permission:employee-view');
        Route::put('/update-employee/{employee}', 'update')->middleware('permission:employee_update');
        // Route::delete('/delete-employee/{employee}', 'destroy')->middleware('permission:employee_delete');
    });
});

Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(CountryAssignController::class)->prefix('country-assigns')->group(function () {
        Route::get('/list-country-assign', 'index')->middleware('permission:country_assign-list');
        Route::post('/new-country-assign', 'create')->middleware('permission:country_assign-create');
        // Route::get('/{country_assign}', 'show')->middleware('permission:country_assign-view');
        Route::put('/update-country-assign/{country_assign}', 'update')->middleware('permission:country_assign-update');
        // Route::delete('/delete-country-assign/{country_assign}', 'destroy')->middleware('permission:country_assign-delete');
    });
});




