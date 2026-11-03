<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $counts = $request->user()->tasks()
            ->selectRaw('status, count(*) as total')
            ->groupBy('status')
            ->pluck('total', 'status');

        return Inertia::render('dashboard', [
            'stats' => [
                'total' => (int) $counts->sum(),
                'pending' => (int) $counts->get('pending', 0),
                'in_progress' => (int) $counts->get('in_progress', 0),
                'completed' => (int) $counts->get('completed', 0),
            ],
        ]);
    }
}
