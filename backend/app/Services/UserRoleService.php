<?php

namespace App\Services;

use App\Models\UserRole;

class UserRoleService
{
    // Create User Role
    public function createUserRole(int $user_id, int $role_id)
    {
        $role_assigned = UserRole::create([
            'user_id' => $user_id,
            'role_id' => $role_id,
        ]);

        if($role_assigned){
            return true;
        }

        return false;
    }

    // Read (Get a single user role by ID)
    public function getUserRoleById(int $id): ?UserRole
    {
        return UserRole::findOrFail($id);
    }

    // Read (Get all user roles - will refactor for filters in the future)
    public function getAllUserRoles()
    {
        return UserRole::all();
    }

    // Update User Role
    public function updateUserRole(UserRole $user_role, array $data)
    {
        $user_role->update($data);
        return $user_role;
    }

    // Delete User Role
    public function deleteUserRole(UserRole $user_role): bool
    {
        return $user_role->delete();
    }
}
