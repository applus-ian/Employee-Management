<?php

namespace App\Http\Controllers;

use App\Models\EmployeeProject;
use App\Services\EmployeeProjectService;
use App\Http\Requests\CreateEmployeeProjectRequest;
use App\Http\Requests\UpdateEmployeeProjectRequest;
use Illuminate\Http\JsonResponse;

class EmployeeProjectController extends Controller
{
    protected $employeeProjectService;

    public function __construct(EmployeeProjectService $employeeProjectService)
    {
        $this->employeeProjectService = $employeeProjectService;
    }

    // Update Employee Project
    public function update(UpdateEmployeeProjectRequest $request, EmployeeProject $employeeProject): JsonResponse
    {
        $updated = $this->employeeProjectService->updateEmployeeProject($employeeProject, $request->validated());

        return response()->json($updated, 200);
    }

    // Get All Employee Projects
    public function index($employee_id): JsonResponse
    {
        $projects = $this->employeeProjectService->getAllEmployeeProjects($employee_id);

        return response()->json($projects, 200);
    }

    // Get a Single Employee Project
    public function show(EmployeeProject $employeeProject): JsonResponse
    {
        return response()->json($employeeProject, 200);
    }

    // Delete Employee Project
    public function destroy(EmployeeProject $employeeProject): JsonResponse
    {
        $this->employeeProjectService->deleteEmployeeProject($employeeProject);

        return response()->json(['message' => 'Employee project deleted successfully!'], 200);
    }
}

