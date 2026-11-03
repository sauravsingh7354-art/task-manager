import { Head } from '@inertiajs/react';
import TaskForm from '@/components/task-form';

export default function CreateTask() {
    return (
        <>
            <Head title="New task" />
            <div className="p-4">
                <h1 className="mb-4 text-xl font-semibold">New task</h1>
                <TaskForm />
            </div>
        </>
    );
}

CreateTask.layout = {
    breadcrumbs: [
        { title: 'Tasks', href: '/tasks' },
        { title: 'New', href: '/tasks/create' },
    ],
};