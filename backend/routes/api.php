<?php

use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TeamAssignController;
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
        Route::get('/list-employee', 'index')->middleware('permission:employee_list');
        Route::post('/new-employee', 'create')->middleware('permission:employee_create');
        // Route::get('/{employee}', 'show')->middleware('permission:employee-view');
        Route::put('/update-employee/{employee}', 'update')->middleware('permission:employee_update');
        // Route::delete('/delete-employee/{employee}', 'destroy')->middleware('permission:employee_delete');
    });
});


// Routes for Team Assign
Route::middleware(['auth:sanctum'])->group(function () {
    Route::controller(TeamAssignController::class)->prefix('team-assigns')->group(function () {
        Route::get('/list-team-assigns', 'index')->middleware('permission:team_assign-list');
        Route::post('/new-team-assign', 'create')->middleware('permission:team_assign-create');
        // Route::get('/{team_assign}', 'show')->middleware('permission:team_assign-view');
        Route::put('/update-team-asign/{team_assign}', 'update')->middleware('permission:team_assign-update');
        // Route::delete('/delete-team-assign/{team_assign}', 'destroy')->middleware('permission:team_assign-delete');
    });
});
