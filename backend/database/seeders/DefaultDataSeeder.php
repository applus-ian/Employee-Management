<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DefaultDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $this->call([
            JobPositionSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            EmploymentTypeSeeder::class,
            SuperAdminSeeder::class,
            UserRoleSeeder::class,
            RolePermissionSeeder::class,
        ]);
    }
}
