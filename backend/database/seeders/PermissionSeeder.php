<?php

namespace Database\Seeders;

use App\Models\Permission;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Permission::insert([
            // Employee Records Permission
            ['name' => 'employee_list', 'description' => 'Get All Employee Record.'],
            ['name' => 'employee_view', 'description' => 'Get Single Employee Record.'],
            ['name' => 'employee_create', 'description' => 'Create New Employee.'],
            ['name' => 'employee_update', 'description' => 'Update Employee Record.'],
            ['name' => 'employee_delete', 'description' => 'Delete Employee Record.'],

            // Project Records Permission
            ['name' => 'project_list', 'description' => 'Get All Project Record.'],
            ['name' => 'project_view', 'description' => 'Get Single Project Record.'],
            ['name' => 'project_create', 'description' => 'Create New Project.'],
            ['name' => 'project_update', 'description' => 'Update Project Record.'],
            ['name' => 'project_delete', 'description' => 'Delete Project Record.'],
        ]);
    }
}
