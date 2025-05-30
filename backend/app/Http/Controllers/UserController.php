<?php

namespace App\Http\Controllers;

use App\Http\Requests\ActivateUserRequest;
use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Services\EmployeeService;
use App\Services\EmploymentStatusHistoryService;
use App\Services\UserRoleService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;

class UserController extends Controller
{
    protected $userService, $employmentStatusHistoryService, $employeeService, $userRoleService;

    public function __construct(UserService $userService, EmploymentStatusHistoryService $employmentStatusHistoryService, EmployeeService $employeeService, UserRoleService $userRoleService)
    {
        $this->userService = $userService;
        $this->employmentStatusHistoryService = $employmentStatusHistoryService;
        $this->employeeService = $employeeService;
        $this->userRoleService = $userRoleService;
    }

    // Create New User Account for Employee
    public function activate(ActivateUserRequest $request):JsonResponse
    {
        $validated = $request->validated();

        $decoded_employee_id = $this->employeeService->decodeEmployeeId($validated['employee_id']);
        if (!$decoded_employee_id) {
            return response()->json(['message' => 'Invalid employee ID.'], 400);
        }

        $new_user = $this->userService->activateUser($decoded_employee_id, $validated['email'], $validated['password']);

        $role_assigned = $this->userRoleService->createUserRole($new_user->id, $validated['user_role']);

        if (!$new_user || !$role_assigned) {
            return response()->json(['message' => 'User activation failed.'], 400);
        }

        $logged_user = Auth::user();

        $this->employmentStatusHistoryService->createEmploymentStatusHistory($decoded_employee_id, 'active',$new_user->updated_at, 'User registered', $logged_user->employee->first_name . ' ' . $logged_user->employee->last_name , $logged_user->employee->id);

        return response()->json(['message' => 'User registered successfully!'], 201);
    }

    // Change Password
    public function changePassword(PasswordChangeRequest $request): JsonResponse
    {
        try {
            $user = Auth::user(); // Authenticated user
            $updatedUser = $this->userService->changeUserPassword(
                $user,
                $request->input('new_password')
            );

            return response()->json([
                'message' => 'Password changed successfully.',
                'user' => $updatedUser,
            ], 200);
        } catch (\Throwable $e) {
            return response()->json([
                'message' => 'Failed to change password.',
                'error' => $e->getMessage(),
            ], 400);
        }
    }

}
