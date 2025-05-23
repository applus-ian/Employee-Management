<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateEmployeeRequest;
use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\UpdateEmployeeRequest;
use App\Http\Requests\UpdateGovBankNumbersRequest;
use App\Http\Requests\UpdatePersonalInfoRequest;
use App\Http\Requests\UpdateResidentialInfoRequest;
use App\Models\Employee;
use App\Models\User;
use App\Services\EmployeeService;
use App\Services\EmploymentStatusHistoryService;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

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
        $new_employee = $this->employeeService->createEmployee($request->validated());

        $this->employmentStatusHistoryService->createEmploymentStatusHistory($new_employee->id, 'employee_created',$new_employee->date_hired);

        return response()->json(['message' => 'Employee created successfully!'], 201);
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

    // Change Employee Password
    public function changeEmployeePassword(PasswordChangeRequest $request, $employee_id): JsonResponse
    {
        try {
            $employee = User::where('employee_id', $employee_id)->first();

            if (!$employee) {
                return response()->json([
                    'message' => 'User with this employee ID not found.',
                ], 404);
            }

            $updatedEmployee = $this->employeeService->changeEmployeePassword(
                $employee_id,
                $request->input('new_password')
            );

            return response()->json([
                'message' => 'Password changed successfully.',
                'user' => $updatedEmployee,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to change password.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    // Update Employee's Personal Info
    public function updateEmployeePersonalInfo(UpdatePersonalInfoRequest $request, $employee_id): JsonResponse
    {
        try {
            $employee = Employee::where('id', $employee_id)->first();

            if (!$employee) {
                return response()->json([
                    'message' => 'Employee not found.',
                ], 404);
            }

            $updatedEmployee = $this->employeeService->updateEmployeePersonalInfo(
                $employee,
                $request->validated()
            );

            return response()->json([
                'message' => 'Personal Information Updated.',
                'user' => $updatedEmployee,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update personal information.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }


    // Update Employee Residential Info
   public function updateEmployeeResidentialInfo(UpdateResidentialInfoRequest $request, $employee_id): JsonResponse
    {
        try {
            $employee = Employee::where('id', $employee_id)->first();

            if (!$employee) {
                return response()->json([
                    'message' => 'Employee not found.',
                ], 404);
            }

            $updatedEmployee = $this->employeeService->updateEmployeeResidentialInfo(
                $employee,
                $request->validated()
            );

            return response()->json([
                'message' => 'Residential Information Updated.',
                'user' => $updatedEmployee,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update residential information.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

    public function updateEmployeeGovBankNumbers(UpdateGovBankNumbersRequest $request, $employee_id): JsonResponse
    {
        try {
            $employee = Employee::where('id', $employee_id)->first();

            if (!$employee) {
                return response()->json([
                    'message' => 'Employee not found.',
                ], 404);
            }

            $updatedEmployee = $this->employeeService->updateEmployeeGovBankNumbers(
                $employee,
                $request->validated()
            );

            return response()->json([
                'message' => 'Government and Bank Numbers Updated.',
                'user' => $updatedEmployee,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to update government and bank numbers.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

}
