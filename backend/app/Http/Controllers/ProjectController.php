<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateProjectRequest;
use App\Http\Requests\UpdateProjectRequest;
use App\Models\Project;
use App\Services\ProjectService;
use Illuminate\Http\JsonResponse;

class ProjectController extends Controller
{
    protected $projectService;

    public function __construct(ProjectService $projectService)
    {
        $this->projectService = $projectService;
    }

    // Create Project Method
    public function create(CreateProjectRequest $request): JsonResponse
    {
        $this->projectService->createProject($request->validated());

        return response()->json(['message' => 'Project created successfully!'], 201);
    }

    // Update Project Method
    public function update(UpdateProjectRequest $request, Project $project): JsonResponse
    {
        // Proceed with updating the project's details
        $updated_project = $this->projectService->updateProject($project, $request->validated());

        // Return the updated project as a JSON response
        return response()->json($updated_project, 200);
    }

    // Get All Projects Method
    public function index(): JsonResponse
    {
        $projects = $this->projectService->getAllProjects();

        return response()->json($projects, 200);
    }

    // Get Single Project Method
    public function show(Project $project): JsonResponse
    {
        return response()->json($project, 200);
    }

    // Delete Project Method
    public function destroy(Project $project): JsonResponse
    {
        $this->projectService->deleteProject($project);

        return response()->json(['message' => 'Project deleted successfully!'], 200);
    }
}
