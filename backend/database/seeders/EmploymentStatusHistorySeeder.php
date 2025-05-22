<?php

namespace Database\Seeders;

use App\Models\EmploymentStatusHistory;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class EmploymentStatusHistorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        EmploymentStatusHistory::insert([
            // John Doe
            ['employee_id' => 1, 'status_set' => 'onboarding', 'effective_date' => now()->subDays(30)->toDateString(), 'remarks' => 'Initial onboarding', 'changed_by' => 'HR Admin'],
            ['employee_id' => 1, 'status_set' => 'account creation', 'effective_date' => now()->subDays(25)->toDateString(), 'remarks' => 'User account created', 'changed_by' => 'System'],
            ['employee_id' => 1, 'status_set' => 'active', 'effective_date' => now()->subDays(20)->toDateString(), 'remarks' => 'Activated', 'changed_by' => 'HR Admin'],
            // Maria Santos
            ['employee_id' => 2, 'status_set' => 'onboarding', 'effective_date' => now()->subDays(60)->toDateString(), 'remarks' => 'Initial onboarding', 'changed_by' => 'HR Admin'],
            ['employee_id' => 2, 'status_set' => 'account creation', 'effective_date' => now()->subDays(55)->toDateString(), 'remarks' => 'User account created', 'changed_by' => 'System'],
            ['employee_id' => 2, 'status_set' => 'active', 'effective_date' => now()->subDays(50)->toDateString(), 'remarks' => 'Activated', 'changed_by' => 'HR Admin'],
            ['employee_id' => 2, 'status_set' => 'terminated', 'effective_date' => now()->subDays(10)->toDateString(), 'remarks' => 'Resigned', 'changed_by' => 'HR Admin'],
            // Carlos Reyes
            ['employee_id' => 3, 'status_set' => 'onboarding', 'effective_date' => now()->subDays(10)->toDateString(), 'remarks' => 'Initial onboarding', 'changed_by' => 'HR Admin'],
            ['employee_id' => 3, 'status_set' => 'account creation', 'effective_date' => now()->subDays(8)->toDateString(), 'remarks' => 'User account created', 'changed_by' => 'System'],
            ['employee_id' => 3, 'status_set' => 'active', 'effective_date' => now()->subDays(5)->toDateString(), 'remarks' => 'Activated', 'changed_by' => 'HR Admin'],
        ]);
    }
}
