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
            ['name' => 'create-employee', 'description' => 'Create New Employee.'],
            ['name' => 'update-employee', 'description' => 'Update Employee Record.'],
        ]);
    }
}
