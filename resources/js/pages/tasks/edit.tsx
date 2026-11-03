import { Head } from '@inertiajs/react';
import TaskForm from '@/components/task-form';
import type { Task } from '@/lib/tasks';

export default function EditTask({ task }: { task: Task }) {
    return (
        <>
            <Head title="Edit task" />
            <div className="p-4">
                <h1 className="mb-4 text-xl font-semibold">Edit task</h1>
                <TaskForm task={task} />
            </div>
        </>
    );
}

EditTask.layout = {
    breadcrumbs: [
        { title: 'Tasks', href: '/tasks' },
        { title: 'Edit', href: '#' },
    ],
};
