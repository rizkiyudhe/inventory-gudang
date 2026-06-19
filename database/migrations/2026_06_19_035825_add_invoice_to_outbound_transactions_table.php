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
        Schema::table('outbound_transactions', function (Blueprint $table) {
            $table->foreignId('invoice_id')->nullable()->constrained('invoices')->onDelete('cascade')->after('id');
            $table->decimal('price', 15, 2)->default(0)->after('quantity');
            $table->decimal('total', 15, 2)->default(0)->after('price');
            $table->string('destination')->nullable()->change(); // Buat nullable karena sudah ada di Invoices
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('outbound_transactions', function (Blueprint $table) {
            //
        });
    }
};
