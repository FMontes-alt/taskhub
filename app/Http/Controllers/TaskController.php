<?php

namespace App\Http\Controllers;

use App\Models\Task;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TaskController extends Controller
{
    /**
     * Display all tasks on the welcome page.
     */
    public function index()
    {
        $tasks = Task::orderBy('created_at', 'desc')->get();

        return Inertia::render('Welcome', [
            'tasks' => $tasks,
        ]);
    }

    /**
     * Store a newly created task in the database.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
        ]);

        Task::create([
            'title' => $validated['title'],
            'description' => $validated['description'] ?? null,
            'is_completed' => false,
        ]);

        return back();
    }

    /**
     * Update the title of an existing task.
     */
    public function update(Request $request, Task $task)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
        ]);

        $task->update([
            'title' => $validated['title'],
        ]);

        return back();
    }

    /**
     * Toggle the completion status of a task.
     */
    public function toggle(Task $task)
    {
        $task->update([
            'is_completed' => !$task->is_completed,
        ]);

        return back();
    }

    /**
     * Remove a specific task from the database.
     */
    public function destroy(Task $task)
    {
        $task->delete();

        return back();
    }

    /**
     * Remove all completed tasks from the database.
     */
    public function clearCompleted()
    {
        Task::where('is_completed', true)->delete();

        return back();
    }
}
