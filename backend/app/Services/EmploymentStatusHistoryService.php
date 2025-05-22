<?php

namespace App\Services;

use App\Models\EmploymentStatusHistory;

class EmploymentStatusHistoryService
{
    // Create Employee Status History
    public function createEmploymentStatusHistory(int $employee_id, string $status_set, string $effective_date, string $remarks = null, string $changed_by = null)
    {
        return EmploymentStatusHistory::create([
            'employee_id' => $employee_id,
            'status_set' => $status_set,
            'effective_date' => $effective_date,
            'remarks' => $remarks,
            'changed_by' => $changed_by,
        ]);
    }

    // Get Employee Status History
    public function getEmployeeStatusHistory(int $employee_id)
    {
        return EmploymentStatusHistory::where('employee_id', $employee_id)
            ->orderBy('effective_date', 'desc')
            ->get();
    }
}
