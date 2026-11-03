<?php

namespace App\Http\Controllers;

use App\Http\Requests\TaskRequest;
use App\Models\Task;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class TaskController extends Controller
{
    public function index(Request $request): Response
    {
        $filters = $request->only(['search', 'status', 'priority']);
        $user = $request->user();

        $tasks = Task::query()
            ->with('user:id,name')
            ->when(! $user->isAdmin(), fn ($q) => $q->where('user_id', $user->id))
            ->when($filters['search'] ?? null, fn ($q, $v) => $q->where('title', 'like', "%{$v}%"))
            ->when($filters['status'] ?? null, fn ($q, $v) => $q->where('status', $v))
            ->when($filters['priority'] ?? null, fn ($q, $v) => $q->where('priority', $v))
            ->latest()
            ->get();

        return Inertia::render('tasks/index', [
            'tasks' => $tasks,
            'filters' => $filters,
            'isAdmin' => $user->isAdmin(),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('tasks/create');
    }

    public function store(TaskRequest $request): RedirectResponse
    {
        $request->user()->tasks()->create($request->validated());

        return to_route('tasks.index');
    }

    public function edit(Task $task): Response
    {
        $this->ownedBy($task);

        return Inertia::render('tasks/edit', ['task' => $task]);
    }

    public function update(TaskRequest $request, Task $task): RedirectResponse
    {
        $this->ownedBy($task);
        $task->update($request->validated());

        return to_route('tasks.index');
    }

    public function destroy(Task $task): RedirectResponse
    {
        $this->ownedBy($task);
        $task->delete();

        return to_route('tasks.index');
    }

    public function complete(Task $task): RedirectResponse
    {
        $this->ownedBy($task);
        $task->update(['status' => 'completed']);

        return back();
    }

    private function ownedBy(Task $task): void
    {
        $user = Auth::user();

        abort_unless($user->isAdmin() || $task->user_id === $user->id, 403);
    }
}
