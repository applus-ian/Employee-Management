<?php

namespace App\Http\Controllers;

use App\Models\EmploymentStatusHistory;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use App\Services\EmploymentStatusHistoryService;
use App\Services\EmployeeService;
use App\Http\Requests\CreateEmploymentStatusHistoryRequest;
use App\Http\Resources\EmploymentStatusHistoryResource;
use Illuminate\Support\Facades\Auth;

class EmploymentStatusHistoryController extends Controller
{
    protected $employmentStatusHistoryService;
    protected $employeeService;

    public function __construct(EmploymentStatusHistoryService $employmentStatusHistoryService, EmployeeService $employeeService)
    {
        $this->employmentStatusHistoryService = $employmentStatusHistoryService;
        $this->employeeService = $employeeService;
    }

    public function index($employeeId): JsonResponse
    {
        $history = $this->employmentStatusHistoryService->getEmployeeStatusHistory($employeeId);
        return response()->json(EmploymentStatusHistoryResource::collection($history));
    }

    public function create(CreateEmploymentStatusHistoryRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $decoded_employee_id = $this->employeeService->decodeEmployeeId($validated['employee_id']);
        $changed_by_employee = Auth::user()->employee;

        if ($changed_by_employee) {
            $changed_by = trim($changed_by_employee->first_name . ' ' . $changed_by_employee->last_name);
            $changed_by_employee_id = $changed_by_employee->id;
        } else {
            return response()->json(['message' => 'User not authenticated.'], 401);
        }

        $entry = $this->employmentStatusHistoryService->createEmploymentStatusHistory(
            $decoded_employee_id,
            $validated['status_set'],
            $validated['effective_date'],
            $validated['remarks'] ?? null,
            $changed_by,
            $changed_by_employee_id
        );

        return response()->json(['message' => 'Employment status history updated.', 'entry' => new EmploymentStatusHistoryResource($entry)], 201);
    }
}
