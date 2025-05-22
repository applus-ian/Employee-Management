<?php

namespace App\Http\Controllers;

use App\Models\EmploymentStatusHistory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\EmploymentStatusHistoryService;

class EmploymentStatusHistoryController extends Controller
{
    protected $employmentStatusHistoryService;

    public function __construct(EmploymentStatusHistoryService $employmentStatusHistoryService)
    {
        $this->employmentStatusHistoryService = $employmentStatusHistoryService;
    }

    public function index($employeeId): JsonResponse
    {
        $history = $this->employmentStatusHistoryService->getEmployeeStatusHistory($employeeId)
            ->map(function ($entry) {
                return [
                    'id' => $entry->id,
                    'status' => $entry->status_set,
                    'changed_at' => $entry->effective_date,
                    'changed_by' => $entry->changed_by ?? 'Unknown',
                    'remarks' => $entry->remarks ?? '',
                ];
            });
        return response()->json($history);
    }
}
