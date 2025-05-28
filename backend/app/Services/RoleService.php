<?php

namespace App\Services;

use App\Http\Resources\RolePermissionResource;
use App\Models\Permission;
use App\Models\Role;

class RoleService
{
    // Create Role
    public function createRole(array $data)
    {
        return Role::create([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);
    }

    // Read (Get a single role by ID)
    public function getRoleById(int $id): ?Role
    {
        return Role::findOrFail($id);
    }

    // Read (Get all roles - will refactor for filters in the future)
    public function getAllRoles()
    {
        return Role::all();
    }

    // Update Role
    public function updateRole(Role $role, array $data)
    {
        // Update role fields
        $role->update([
            'name' => $data['name'],
            'description' => $data['description'],
        ]);

        // Sync permissions if provided
        if (isset($data['permission_ids'])) {
            // permission_ids can be array of objects [{id: 1}, ...] or just ids [1,2,...]
            $ids = array_map(function($item) {
                return is_array($item) && isset($item['id']) ? $item['id'] : $item;
            }, $data['permission_ids']);
            $role->permissions()->sync($ids);
        }

        return $role->load('permissions');
    }

    // Delete Role
    public function deleteRole(Role $role): bool
    {
        return $role->delete();
    }

    // Fetch Role With Permissions
    public function roleWithPermissions(int $role_id)
    {
        $role = Role::findOrFail($role_id);
        return new RolePermissionResource($role->load('permissions'));
    }

    // Fetch All Roles With Permissions
    public function allRolesWithPermissions()
    {
        $roles = Role::with('permissions')->get();
        return RolePermissionResource::collection($roles);
    }

    // Fetch All Roles With Permissions
    public function allPermissions()
    {
        return Permission::all();;
    }
}
