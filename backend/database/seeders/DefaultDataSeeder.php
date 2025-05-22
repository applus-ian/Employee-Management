<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use App\Models\Employee;

class DefaultDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Truncate tables to avoid foreign key issues and ensure predictable IDs
        DB::statement('SET FOREIGN_KEY_CHECKS=0;');
        Employee::truncate();
        DB::table('employment_status_histories')->truncate();
        DB::statement('SET FOREIGN_KEY_CHECKS=1;');

        $this->call([
            // Core reference data
            JobPositionSeeder::class,
            DepartmentAssignSeeder::class,
            EmploymentTypeSeeder::class,
            OfficeAssignSeeder::class,
            TeamAssignSeeder::class,
            CountryAssignSeeder::class,
            SkillCategorySeeder::class,
            SkillSeeder::class,
            ProjectRoleSeeder::class,
            ProjectSeeder::class,
            DocumentTypeSeeder::class,
            RoleSeeder::class,
            PermissionSeeder::class,
            RolePermissionSeeder::class,
            SuperAdminSeeder::class,

            // Employees and related data
            EmployeeSeeder::class,
            EmployeeSkillSeeder::class,
            EmployeeProjectSeeder::class,

            // (must come after employees)
            UserRoleSeeder::class,
            DocumentationSeeder::class,
            LocationAssignmentSeeder::class,
            EmploymentStatusHistorySeeder::class,
        ]);
    }
}
