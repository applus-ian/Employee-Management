<?php
namespace Database\Seeders;

use App\Models\Employee;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class EmployeeSeeder extends Seeder
{
    public function run(): void
    {
        Employee::insert([
            [
                'first_name' => 'John',
                'middle_name' => 'A.',
                'last_name' => 'Doe',
                'suffix' => '',
                'gender' => 'male',
                'birthdate' => '1990-01-01',
                'civil_status' => 'single',
                'nationality' => 'Filipino',
                'region' => '070000000',
                'province' => '072200000',
                'city_or_municipality' => '072217000',
                'barangay' => '072217044',
                'street' => 'Ayala',
                'phone_number' => '01234567892',
                'emergency_contact1' => '01234567891',
                'emergency_contact2' => '01234567891',
                'email' => 'john.doe@example.com',
                'job_position_id' => 2,
                'date_hired' => '2022-01-15',
                'employment_type_id' => 1,
                'manager_id' => null,
                'profile_pic_url' => 'applus-image1.png',
                'tin_number' => '123-456-789',
                'sss_number' => '01-2345678-9',
                'pagibig_number' => '1234-5678-9012',
                'philhealth_number' => '12-345678901-2',
                'bank_number' => '1234567890',
            ],
            [
                'first_name' => 'Maria',
                'middle_name' => 'B.',
                'last_name' => 'Santos',
                'suffix' => '',
                'gender' => 'female',
                'birthdate' => '1985-05-10',
                'civil_status' => 'married',
                'nationality' => 'Filipino',
                'region' => '070000000',
                'province' => '072200000',
                'city_or_municipality' => '072217000',
                'barangay' => '072217044',
                'street' => 'Ayala',
                'phone_number' => '01234567893',
                'emergency_contact1' => '01234567891',
                'emergency_contact2' => '01234567891',
                'email' => 'maria.santos@example.com',
                'job_position_id' => 2,
                'date_hired' => '2021-06-01',
                'employment_type_id' => 1,
                'manager_id' => 2,
                'profile_pic_url' => 'applus-image2.png',
                'tin_number' => '987-654-321',
                'sss_number' => '98-7654321-0',
                'pagibig_number' => '4321-8765-2109',
                'philhealth_number' => '98-765432109-8',
                'bank_number' => '0987654321',
            ],
            [
                'first_name' => 'Carlos',
                'middle_name' => 'C.',
                'last_name' => 'Reyes',
                'suffix' => '',
                'gender' => 'male',
                'birthdate' => '1992-09-20',
                'civil_status' => 'single',
                'nationality' => 'Filipino',
                'region' => '070000000',
                'province' => '072200000',
                'city_or_municipality' => '072217000',
                'barangay' => '072217044',
                'street' => 'Ayala',
                'phone_number' => '01234567894',
                'emergency_contact1' => '01234567891',
                'emergency_contact2' => '01234567891',
                'email' => 'carlos.reyes@example.com',
                'job_position_id' => 3,
                'date_hired' => '2023-03-10',
                'employment_type_id' => 1,
                'manager_id' => 2,
                'profile_pic_url' => 'applus-image3.png',
                'tin_number' => '321-654-987',
                'sss_number' => '32-1654987-1',
                'pagibig_number' => '5678-1234-0987',
                'philhealth_number' => '32-165498701-3',
                'bank_number' => '1122334455',
            ],
        ]);

        User::insert([
            [
                'employee_id' => 2, // John
                'email' => 'employee1@example.com',
                'password' => Hash::make('employee_applus123'),
            ],
            [
                'employee_id' => 3, // Maria
                'email' => 'employee2@example.com',
                'password' => Hash::make('employee_applus123'),
            ],
            [
                'employee_id' => 4, // Carlos
                'email' => 'employee3@example.com',
                'password' => Hash::make('employee_applus123'),
            ],
        ]);
    }
}
