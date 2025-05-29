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

    public function registerUser(int $employee_id, string $email, string $password )
    {
        return User::create([
            'employee_id' => $employee_id,
            'email' => $email,
            'password' => bcrypt($password),
        ]);
    }

    public function changeUserPassword(User $user, string $newPassword): User
    {
        $user->password = Hash::make($newPassword);
        $user->save();

        return $user;
    }

}
