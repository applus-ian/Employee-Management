<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Services\DocumentationService;
use App\Services\EmployeeService;
use App\Services\EmployeeSkillService;
use App\Services\EmploymentStatusHistoryService;
use App\Services\LocationAssignmentService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class EmployeeController extends Controller
{
    protected $employeeService, $userService, $employmentStatusHistoryService, $employeeSkillService, $locationAssignmentService, $documentationService;

    public function __construct(EmployeeService $employeeService, UserService $userService, EmploymentStatusHistoryService $employmentStatusHistoryService, EmployeeSkillService $employeeSkillService, LocationAssignmentService $locationAssignmentService, DocumentationService $documentationService)
    {
        $this->employeeService = $employeeService;
        $this->userService = $userService;
        $this->employmentStatusHistoryService = $employmentStatusHistoryService;
        $this->employeeSkillService = $employeeSkillService;
        $this->locationAssignmentService = $locationAssignmentService;
        $this->documentationService = $documentationService;
    }

    // Get all employees
    public function index()
    {
        $records = $this->employeeService->getAllEmployees();

        return response()->json([
            'records' => $records
        ], 200);
    }

    // Get single employee
    public function show($employee_id)
    {
        $employee_data = $this->employeeService->getEmployeeById($employee_id);

        return response()->json([
            'employee_data' => $employee_data
        ],200);
    }

    // Create Employee Method
    public function create(CreateEmployeeRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $new_employee = $this->employeeService->createEmployee($validated);

        // Create only if employee_skills is provided and not empty
        if (!empty($validated['employee_skills'] ?? [])) {
            $this->employeeSkillService->createEmployeeSkill($new_employee->id, $validated['employee_skills']);
        }

        // Create only if location_assignment is provided and not empty
        if (!empty($validated['location_assignment'] ?? [])) {
            $this->locationAssignmentService->createLocationAssignment($new_employee->id, $validated['location_assignment']);
        }

        // Create only if uploaded_documentations is provided and not empty
        if (!empty($validated['uploaded_documentations'] ?? [])) {
            $this->documentationService->createDocumentation($new_employee->id, $validated['uploaded_documentations']);
        }

        $this->employmentStatusHistoryService->createEmploymentStatusHistory($new_employee->id, 'employee_created',$new_employee->date_hired);

        $this->userService->registerUser($new_employee->id, $validated['email'], 'Applus@123');

        $encoded_employee_id = $this->employeeService->encodeEmployeeId($new_employee->id);

        return response()->json(['message' => 'Employee created successfully!', 'employee_id' => $encoded_employee_id], 201);
    }

    // Update Employee Method
    public function update(Request $request, $employee_id): JsonResponse
    {
        $id = $this->employeeService->decodeEmployeeId($employee_id);

        if (!$id) {
            return response()->json(['message' => 'Invalid employee ID.'], 400);
        }

        // Merge decoded ID into request if your rules depend on it
        $data = array_merge($request->all(), ['decoded_employee_id' => $id]);

        // Validate using UpdateEmployeeRequest
        $validator = Validator::make($data, (new UpdateEmployeeRequest())->rules());

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        // At this point, the request is valid
        $validated = $validator->validated();

        // Retrieve and update employee
        $employee = $this->employeeService->getEmployeeById($id);
        if (!$employee) {
            return response()->json(['message' => 'Employee not found.'], 404);
        }

        $updatedEmployee = $this->employeeService->updateEmployee($employee, $validated);

        return response()->json(['updated_employee' => $updatedEmployee], 200);
    }

    // Delete Employee Method
    public function destroy(Employee $employee): JsonResponse
    {
        $this->employeeService->deleteEmployee($employee);

        return response()->json(['message' => 'Employee deleted successfully!'], 200);
    }

}
