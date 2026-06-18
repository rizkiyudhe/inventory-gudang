<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ItemController;
use App\Http\Controllers\InboundController;
use App\Http\Controllers\OutboundController;
use App\Http\Controllers\StockAdjustmentController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ReportController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
});

// Rute khusus admin
Route::middleware(['auth', 'role:admin'])->group(function () {
    //item
    Route::get('/items', [ItemController::class, 'index'])->name('items.index');
    Route::get('/items/create', [ItemController::class, 'create'])->name('items.create');
    Route::post('/items', [ItemController::class, 'store'])->name('items.store');
    Route::get('/items/{item}/edit', [ItemController::class, 'edit'])->name('items.edit');
    Route::put('/items/{item}', [ItemController::class, 'update'])->name('items.update');
    Route::delete('/items/{item}', [ItemController::class, 'destroy'])->name('items.destroy');

    // Rute Manajemen Staf
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
    Route::post('/users', [UserController::class, 'store'])->name('users.store');
    Route::patch('/users/{user}/toggle-active', [UserController::class, 'toggleActive'])->name('users.toggle-active');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');

    // Rute Laporan
    Route::get('/reports', [ReportController::class, 'index'])->name('reports.index');
    Route::get('/reports/export/excel', [ReportController::class, 'exportExcel'])->name('reports.export.excel');
    Route::get('/reports/export/pdf', [ReportController::class, 'exportPdf'])->name('reports.export.pdf');
});

Route::middleware('auth')->group(function () {
    // Rute Barang Masuk
    Route::get('/inbound', [InboundController::class, 'index'])->name('inbound.index');
    Route::get('/inbound/create', [InboundController::class, 'create'])->name('inbound.create');
    Route::post('/inbound', [InboundController::class, 'store'])->name('inbound.store');

    // Rute Barang Keluar
    Route::get('/outbound', [OutboundController::class, 'index'])->name('outbound.index');
    Route::get('/outbound/create', [OutboundController::class, 'create'])->name('outbound.create');
    Route::post('/outbound', [OutboundController::class, 'store'])->name('outbound.store');

    // Rute Stock Opname
    Route::get('/stock-adjustments', [StockAdjustmentController::class, 'index'])->name('stock-adjustments.index');
    Route::get('/stock-adjustments/create', [StockAdjustmentController::class, 'create'])->name('stock-adjustments.create');
    Route::post('/stock-adjustments', [StockAdjustmentController::class, 'store'])->name('stock-adjustments.store');

    //peofile
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
