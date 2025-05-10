<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEmployeeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Models\Employee;
use App\Services\EmployeeService;
use App\Services\EmploymentStatusHistoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    protected $employeeService, $employmentStatusHistoryService;

    public function __construct(EmployeeService $employeeService, EmploymentStatusHistoryService $employmentStatusHistoryService)
    {
        $this->employeeService = $employeeService;
        $this->employmentStatusHistoryService = $employmentStatusHistoryService;
    }

    // Get all employees
    public function index()
    {
        $employee_list = $this->employeeService->getAllEmployees();

        return response()->json([
            'employee_list' => $employee_list
        ], 200);
    }

    // Create Employee Method
    public function create(CreateEmployeeRequest $request): JsonResponse
    {
        $new_employee = $this->employeeService->createEmployee($request->validated());

        $this->employmentStatusHistoryService->createEmploymentStatusHistory($new_employee->id, 'employee_created',$new_employee->date_hired);

        return response()->json(['message' => 'Employee created successfully!'], 201);
    }

    // Update Employee Method
    public function update(UpdateEmployeeRequest $request, $employee_id): JsonResponse
    {
        // Decode the employee ID
        $id = $this->employeeService->decodeEmployeeId($employee_id);

        // If the ID is invalid (null), return a custom error message and status code
        if ($id === null) {
            return response()->json(['message' => 'Invalid ID provided!'], 400); // 400 Bad Request
        }

        // Find the employee by ID
        $employee =$this->employeeService->getEmployeeById($id);

        // If the employee is not found, return a 404 response
        if (!$employee) {
            return response()->json(['message' => 'Employee not found!'], 404);
        }

        // Proceed with updating the employee's details
        $updated_employee = $this->employeeService->updateEmployee($employee, $request->validated());

        // Return the updated employee as a JSON response
        return response()->json([
            'updated_employee' => $updated_employee
        ], 200);
    }

    // Delete Employee Method
    public function destroy(Employee $employee): JsonResponse
    {
        $this->employeeService->deleteEmployee($employee);

        return response()->json(['message' => 'Employee deleted successfully!'], 200);
    }

}
