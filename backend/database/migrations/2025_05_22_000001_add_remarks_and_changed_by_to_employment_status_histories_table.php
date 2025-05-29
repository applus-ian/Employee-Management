<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::table('employment_status_histories', function (Blueprint $table) {
            $table->string('remarks')->nullable();
            $table->string('changed_by')->nullable();
            $table->unsignedBigInteger('changed_by_employee_id')->nullable()->after('changed_by');
            $table->foreign('changed_by_employee_id')->references('id')->on('employees')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('employment_status_histories', function (Blueprint $table) {
            $table->dropForeign(['changed_by_employee_id']);
            $table->dropColumn(['remarks', 'changed_by', 'changed_by_employee_id']);
        });
    }
};
