<?php

namespace App\Services;

use App\Models\EmployeeSkill;

class EmployeeSkillService
{
    // Create Employee Skill
    public function createEmployeeSkill(array $data)
    {
        return EmployeeSkill::create([
            'employee_id' => $data['employee_id'],
            'skill_id' => $data['skill_id'],
            'years_of_experience' => $data['years_of_experience'],
        ]);
    }

    // Read (Get a single employee skill by ID)
    public function getEmployeeSkillById(int $id): ?EmployeeSkill
    {
        return EmployeeSkill::findOrFail($id);
    }

    // Read (Get all employee skills - will refactor for filters in the future)
    public function getAllEmployeeSkills()
    {
        return EmployeeSkill::all();
    }

    // Update Employee Skill
    public function updateEmployeeSkill(EmployeeSkill $employee_skill, array $data)
    {
        $employee_skill->update($data);
        return $employee_skill;
    }

    // Delete Employee Skill
    public function deleteEmployeeSkill(EmployeeSkill $employee_skill): bool
    {
        return $employee_skill->delete();
    }
}
