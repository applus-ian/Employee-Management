<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEmployeeSkillRequest;
use App\Http\Requests\UpdateEmployeeSkillRequest;
use App\Models\EmployeeSkill;
use App\Services\EmployeeSkillService;
use Illuminate\Http\JsonResponse;

class EmployeeSkillController extends Controller
{
    protected $employee_skillService;

    public function __construct(EmployeeSkillService $employee_skillService)
    {
        $this->employee_skillService = $employee_skillService;
    }

    // Create Employee Skill Method
    public function create(CreateEmployeeSkillRequest $request): JsonResponse
    {
        $this->employee_skillService->createEmployeeSkill($request->validated());

        return response()->json(['message' => 'The employee skill was created successfully.'], 201);
    }

    // Update Employee Skill Method
    public function update(UpdateEmployeeSkillRequest $request, EmployeeSkill $employee_skill): JsonResponse
    {
        // Proceed with updating the employee skill's details
        $updated_employee_skill = $this->employee_skillService->updateEmployeeSkill($employee_skill, $request->validated());

        // Return the updated employee skill as a JSON response
        return response()->json($updated_employee_skill, 200);
    }

    // Get All Employee Skills Method
    public function index(): JsonResponse
    {
        $employee_skills = $this->employee_skillService->getAllEmployeeSkills();

        return response()->json($employee_skills, 200);
    }

    // Get Single Employee Skilled Method
    public function show(EmployeeSkill $employee_skill): JsonResponse
    {
        return response()->json($employee_skill, 200);
    }

    // Delete Employee Skilled Method
    public function destroy(EmployeeSkill $employee_skill): JsonResponse
    {
        $this->employee_skillService->deleteEmployeeSkill($employee_skill);

        return response()->json(['message' => 'Employee skill has been deleted successfully!'], 200);
    }
}
