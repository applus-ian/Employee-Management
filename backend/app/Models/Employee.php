<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Notifications\Notifiable;
use App\Enums\Gender;
use App\Enums\CivilStatus;

class Employee extends Model
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable;

    protected $casts = [
        'gender' => Gender::class,
        'civil_status' => CivilStatus::class,
    ];

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'first_name',
        'middle_name',
        'last_name',
        'suffix',
        'gender',
        'birthdate',
        'civil_status',
        'nationality',
        'region',
        'province',
        'city_or_municipality',
        'barangay',
        'street',
        'phone_number',
        'emergency_contact1',
        'emergency_contact2',
        'email_address',
        'job_position_id',
        'date_hired',
        'employment_type',
        'manager_id',
        'profile_pic_url',
    ];
}
