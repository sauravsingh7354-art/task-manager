<?php

use App\Http\Controllers\DashboardController;
use App\Http\Controllers\TaskController;
use Illuminate\Support\Facades\Route;

Route::inertia('/', 'welcome')->name('home');

Route::middleware(['auth'])->group(function () {
    Route::get('dashboard', DashboardController::class)->name('dashboard');

    Route::resource('tasks', TaskController::class)->except(['show']);
    Route::patch('tasks/{task}/complete', [TaskController::class, 'complete'])
        ->name('tasks.complete');
});

require __DIR__.'/settings.php';
