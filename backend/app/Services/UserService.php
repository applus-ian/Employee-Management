<?php

namespace App\Services;

use App\Http\Resources\UserResource;
use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class UserService
{

    public function fetchUser()
    {
        $user = Auth::user();

        return new UserResource($user->load('employee', 'employee.jobPosition', 'employee.employmentType', 'employee.manager', 'roles'));
    }

    public function registerUser(array $data)
    {
        return User::create([
            'employee_id' => $data['employee_id'],
            'email' => $data['email'],
            'password' => bcrypt($data['password']),
        ]);
    }

    public function changePassword(int $userId, string $currentPassword, string $newPassword, string $newPasswordConfirmation): User
    {
        $user = User::findOrFail($userId);

        // Update the user's password
        $user->password = Hash::make($newPassword);
        $user->save();

        return $user;
    }

}
