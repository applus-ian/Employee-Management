<?php

namespace Database\Seeders;

use App\Models\Role;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Role::insert([
            ['name' => 'Super Admin', 'description' => 'Employee Super Admin User.'],
            ['name' => 'Admin', 'description' => 'Employee HR/Admin User.'],
            ['name' => 'Manager', 'description' => 'Employee Manager User.'],
            ['name' => 'User', 'description' => 'Employee Normal User.'],
        ]);
    }
}
