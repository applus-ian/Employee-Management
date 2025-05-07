<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateDepartmentAssignRequest;
use App\Http\Requests\UpdateDepartmentAssignRequest;
use App\Models\DepartmentAssign;
use App\Services\DepartmentAssignService;
use Illuminate\Http\JsonResponse;

class DepartmentAssignController extends Controller
{
    protected $department_assignService;

    public function __construct(DepartmentAssignService $department_assignService)
    {
        $this->department_assignService = $department_assignService;
    }

    // Create Department Assign Method
    public function create(CreateDepartmentAssignRequest $request): JsonResponse
    {
        $this->department_assignService->createDepartmentAssign($request->validated());

        return response()->json(['message' => 'Department assignment created successfully!'], 201);
    }

    // Update Department Assign Method
    public function update(UpdateDepartmentAssignRequest $request, DepartmentAssign $department_assign): JsonResponse
    {
        // Proceed with updating the assigned department's details
        $updated_department_assign = $this->department_assignService->updateDepartmentAssign($department_assign, $request->validated());

        // Return the updated assigned department as a JSON response
        return response()->json($updated_department_assign, 200);
    }

    // Get All Departments Assigned Method
    public function index(): JsonResponse
    {
        $department_assigns = $this->department_assignService->getAllDepartmentAssigns();

        return response()->json($department_assigns, 200);
    }

    // Get Single Department Assigned Method
    public function show(DepartmentAssign $department_assign): JsonResponse
    {
        return response()->json($department_assign, 200);
    }

    // Delete Department Assigned Method
    public function destroy(DepartmentAssign $department_assign): JsonResponse
    {
        $this->department_assignService->deleteDepartmentAssign($department_assign);

        return response()->json(['message' => 'The assigned department was deleted successfully!'], 200);
    }
}
