<?php

namespace App\Services;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

class AuthService
{
    public function loginUser(array $credentials)
    {
        $user = User::where('email', $credentials['email'])->first();

        if(!$user || !Hash::check($credentials['password'], $user->password)){
            return null;
        }

        $employee = Employee::findOrFail($user->employee_id);

        $token = $user->createToken('LoggedUser')->plainTextToken;

        return [
            'user' => $user,
            'employee' => $employee,
            'token' => $token
        ];
    }

    public function logoutUser($user)
    {
        $user->currentAccessToken()->delete();

        return true;
    }

    public function checkToken($token)
    {
        if(!$token){
            return false; // No token provided
        }

        try {
            // Attempt to get the user associated with the token
            $user = Auth::guard('sanctum')->user();

            return ($user ? true : false);
        } catch (\Exception $e) {
            // Handle exception (if any error occurs)
            return false;
        }
    }
}
