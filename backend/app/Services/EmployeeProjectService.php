<?php

namespace App\Services;

use App\Http\Resources\ProjectResource;
use App\Models\Employee;
use App\Models\EmployeeProject;
use App\Models\Project;

class EmployeeProjectService
{
    protected $employeeService;

    public function __construct(EmployeeService $employeeService)
    {
        $this->employeeService = $employeeService;
    }

    // Create Employee Project
    public function createEmployeeProject($project, array $employees)
    {
        foreach ($employees as $employee) {
            $decodedId = $this->employeeService->decodeEmployeeId($employee['id']);

            // Validate the decoded employee ID
            if (!$decodedId || !Employee::find($decodedId)) {
                throw new \Exception("Invalid employee ID: {$employee['id']}");
            }

            // Create an entry in the employee_projects table
            EmployeeProject::create([
                'employee_id' => $decodedId,
                'project_id' => $project->id,
                'project_role_id' => $employee['project_role_id'],
                'start_date' => $project->start_date ?? null,
                'end_date' => $project->end_date ?? null,
            ]);
        }
    }

    // Read (Get a single employee project by ID)
    public function getEmployeeProjectById(int $id): ?EmployeeProject
    {
        return EmployeeProject::findOrFail($id);
    }

    // Read (Get all employee projects - will refactor for filters in the future)
    public function getAllEmployeeProjects(string $employee_id)
    {
        $decodedId = $this->employeeService->decodeEmployeeId($employee_id);

        $employee_projects = EmployeeProject::where('employee_id', $decodedId)->pluck('project_id');
        $projects = Project::whereIn('id', $employee_projects)->get();
        return ProjectResource::collection($projects);
    }

    // Update Employee Project
    public function updateEmployeeProject($project, array $employees)
    {
        $currentEmployeeIds = EmployeeProject::where('project_id', $project->id)
            ->pluck('employee_id')
            ->toArray();

        // Decode new employee IDs from the incoming $employees array
        $newEmployeeIds = [];
        foreach ($employees as $employee) {
            $decodedId = $this->employeeService->decodeEmployeeId($employee['id']);
            if (!$decodedId || !Employee::find($decodedId)) {
                throw new \Exception("Invalid employee ID: {$employee['id']}");
            }
            $newEmployeeIds[] = $decodedId;
        }

        // Determine which employees to remove (no longer assigned)
        $toRemove = array_diff($currentEmployeeIds, $newEmployeeIds);

        // Determine which employees to add (new assignments)
        $toAdd = array_diff($newEmployeeIds, $currentEmployeeIds);

        // Remove employee_project records for removed employees
        EmployeeProject::where('project_id', $project->id)
            ->whereIn('employee_id', $toRemove)
            ->delete();

        // Add new employee_project records for added employees
        foreach ($employees as $employee) {
            $decodedId = $this->employeeService->decodeEmployeeId($employee['id']);

            if (in_array($decodedId, $toAdd)) {
                EmployeeProject::create([
                    'employee_id' => $decodedId,
                    'project_id' => $project->id,
                    'project_role_id' => $employee['project_role_id'],
                    'start_date' => $project->start_date ?? null,
                    'end_date' => $project->end_date ?? null,
                ]);
            }
        }

        // Optionally: Update existing assignments with changed role or dates
        foreach ($employees as $employee) {
            $decodedId = $this->employeeService->decodeEmployeeId($employee['id']);
            if (in_array($decodedId, $currentEmployeeIds) && !in_array($decodedId, $toAdd)) {
                // Update the existing pivot record
                EmployeeProject::where('project_id', $project->id)
                    ->where('employee_id', $decodedId)
                    ->update([
                        'project_role_id' => $employee['project_role_id'],
                        'start_date' => $project->start_date ?? null,
                        'end_date' => $project->end_date ?? null,
                    ]);
            }
        }
    }


    // Delete Employee Project
    public function deleteEmployeeProject(EmployeeProject $employee_project): bool
    {
        return $employee_project->delete();
    }
}
