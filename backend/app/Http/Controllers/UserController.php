<?php

namespace App\Http\Controllers;

use App\Http\Requests\PasswordChangeRequest;
use App\Http\Requests\RegisterUserRequest;
use App\Services\EmploymentStatusHistoryService;
use App\Services\UserService;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    protected $userService, $employmentStatusHistoryService;

    public function __construct(UserService $userService, EmploymentStatusHistoryService $employmentStatusHistoryService)
    {
        $this->userService = $userService;
        $this->employmentStatusHistoryService = $employmentStatusHistoryService;
    }

    // Create New User Account for Employee
    public function register(RegisterUserRequest $request):JsonResponse
    {
        $new_user = $this->userService->registerUser($request->validated());

        $this->employmentStatusHistoryService->createEmploymentStatusHistory($new_user->id, 'user_created',$new_user->created_at);

        return response()->json(['message' => 'User registered successfully!'], 201);
    }

    // Change Password
    public function changePassword(PasswordChangeRequest $request, int $userId): JsonResponse
    {
        try {
            // Call the service to change the password
            $user = $this->userService->changePassword(
                $userId,
                $request->current_password,
                $request->new_password,
                $request->new_password_confirmation
            );

            // Return a success response with the updated user data
            return response()->json(['message' => 'Password changed successfully.', 'user' => $user], 200);
        } catch (\Exception $e) {
            // Return an error response if any exception is thrown
            return response()->json(['message' => $e->getMessage()], 400);
        }
    }

}
