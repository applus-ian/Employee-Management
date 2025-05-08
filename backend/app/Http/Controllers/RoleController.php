<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateRoleRequest;
use App\Http\Requests\UpdateRoleRequest;
use App\Models\Role;
use App\Services\RoleService;
use Illuminate\Http\JsonResponse;

class RoleController extends Controller
{
    protected $roleService;

    public function __construct(RoleService $roleService)
    {
        $this->roleService = $roleService;
    }

    // Create Role Method
    public function create(CreateRoleRequest $request): JsonResponse
    {
        $this->roleService->createRole($request->validated());

        return response()->json(['message' => 'Role created successfully!'], 201);
    }

    // Update Role Method
    public function update(UpdateRoleRequest $request, Role $role): JsonResponse
    {
        $updatedRole = $this->roleService->updateRole($role, $request->validated());

        return response()->json($updatedRole, 200);
    }

    // Get All Roles Method
    public function index(): JsonResponse
    {
        $roles = $this->roleService->getAllRoles();

        return response()->json($roles, 200);
    }

    // Get Single Role Method
    public function show(Role $role): JsonResponse
    {
        return response()->json($role, 200);
    }

    // Delete Role Method
    public function destroy(Role $role): JsonResponse
    {
        $this->roleService->deleteRole($role);

        return response()->json(['message' => 'Role deleted successfully!'], 200);
    }
}
