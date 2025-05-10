<?php

namespace App\Services;

use App\Models\EmployeeProject;

class EmployeeProjectService
{
    // Create Employee Project
    public function createEmployeeProject(array $data)
    {
        return EmployeeProject::create([
            'employee_id' => $data['employee_id'],
            'project_id' => $data['project_id'],
            'project_role_id' => $data['project_role_id'],
            'start_date' => $data['start_date'],
            'end_date' => $data['end_date'],
        ]);
    }

    // Read (Get a single employee project by ID)
    public function getEmployeeProjectById(int $id): ?EmployeeProject
    {
        return EmployeeProject::findOrFail($id);
    }

    // Read (Get all employee projects - will refactor for filters in the future)
    public function getAllEmployeeProjects()
    {
        return EmployeeProject::all();
    }

    // Update Employee Project
    public function updateEmployeeProject(EmployeeProject $employee_project, array $data)
    {
        $employee_project->update($data);
        return $employee_project;
    }

    // Delete Employee Project
    public function deleteEmployeeProject(EmployeeProject $employee_project): bool
    {
        return $employee_project->delete();
    }
}
