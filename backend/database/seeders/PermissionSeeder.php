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
            ['name' => 'employee-create', 'description' => 'Create New Employee.'],
            ['name' => 'employee-update', 'description' => 'Update Employee Record.'],
        ]);
    }
}
