<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTeamAssignRequest;
use App\Http\Requests\UpdateTeamAssignRequest;
use App\Models\TeamAssign;
use App\Services\TeamAssignService;
use Illuminate\Http\JsonResponse;

class TeamAssignController extends Controller
{
    protected $team_assignService;

    public function __construct(TeamAssignService $team_assignService)
    {
        $this->team_assignService = $team_assignService;
    }

    // Create Team Assign Method
    public function create(CreateTeamAssignRequest $request): JsonResponse
    {
        $this->team_assignService->createTeamAssign($request->validated());

        return response()->json(['message' => 'Team created successfully!'], 201);
    }

    // Update Team Assign Method
    public function update(UpdateTeamAssignRequest $request, TeamAssign $project): JsonResponse
    {
        // Proceed with updating the assigned team's details
        $updated_team_assign = $this->team_assignService->updateTeamAssign($team_assign, $request->validated());

        // Return the updated assigned team as a JSON response
        return response()->json($updated_team_assign, 200);
    }

    // Get All Teams Assigned Method
    public function index(): JsonResponse
    {
        $team_assigns = $this->team_assignService->getAllProjects();

        return response()->json($team_assigns, 200);
    }

    // Get Single Team Assigned Method
    public function show(TeamAssign $team_assign): JsonResponse
    {
        return response()->json($team_assign, 200);
    }

    // Delete Team Assigned Method
    public function destroy(TeamAssign $team_assign): JsonResponse
    {
        $this->team_assignService->deleteTeamAssign($team_assign);

        return response()->json(['message' => 'Assigned Team deleted successfully!'], 200);
    }
}
