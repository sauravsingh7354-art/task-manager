import { Head, Link, router } from '@inertiajs/react';
import { useState } from 'react';
import { PRIORITIES, STATUSES, type Task } from '@/lib/tasks';

type Filters = { search?: string; status?: string; priority?: string };

const inputClass =
    'rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700';

const statusStyle: Record<string, string> = {
    pending:
        'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/40 dark:text-yellow-200',
    in_progress:
        'bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-200',
    completed:
        'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-200',
};

const label = (list: { value: string; label: string }[], value: string) =>
    list.find((i) => i.value === value)?.label ?? value;

export default function TasksIndex({
    tasks,
    filters,
}: {
    tasks: Task[];
    filters: Filters;
}) {
    const [search, setSearch] = useState(filters.search ?? '');

    // Send the current filters to Laravel; it returns the filtered tasks as props.
    const apply = (override: Filters) => {
        const next: Filters = {
            search,
            status: filters.status,
            priority: filters.priority,
            ...override,
        };
        const query = Object.fromEntries(
            Object.entries(next).filter(([, v]) => v),
        );
        router.get('/tasks', query, { preserveState: true, replace: true });
    };

    const remove = (task: Task) => {
        if (confirm(`Delete "${task.title}"?`)) {
            router.delete(`/tasks/${task.id}`);
        }
    };

    return (
        <>
            <Head title="Tasks" />
            <div className="flex flex-col gap-4 p-4">
                <div className="flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Tasks</h1>
                    <Link
                        href="/tasks/create"
                        className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white dark:bg-white dark:text-neutral-900"
                    >
                        New task
                    </Link>
                </div>

                <form
                    className="flex flex-wrap gap-2"
                    onSubmit={(e) => {
                        e.preventDefault();
                        apply({});
                    }}
                >
                    <input
                        className={inputClass}
                        placeholder="Search by title"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    <select
                        className={inputClass}
                        value={filters.status ?? ''}
                        onChange={(e) => apply({ status: e.target.value })}
                    >
                        <option value="">All statuses</option>
                        {STATUSES.map((s) => (
                            <option key={s.value} value={s.value}>
                                {s.label}
                            </option>
                        ))}
                    </select>
                    <select
                        className={inputClass}
                        value={filters.priority ?? ''}
                        onChange={(e) => apply({ priority: e.target.value })}
                    >
                        <option value="">All priorities</option>
                        {PRIORITIES.map((p) => (
                            <option key={p.value} value={p.value}>
                                {p.label}
                            </option>
                        ))}
                    </select>
                    <button
                        type="submit"
                        className="rounded-md border px-4 py-2 text-sm"
                    >
                        Search
                    </button>
                </form>

                <div className="overflow-x-auto rounded-xl border border-sidebar-border/70 dark:border-sidebar-border">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b text-xs text-neutral-500 uppercase">
                            <tr>
                                <th className="p-3">Title</th>
                                <th className="p-3">Status</th>
                                <th className="p-3">Priority</th>
                                <th className="p-3">Due</th>
                                <th className="p-3">Created</th>
                                <th className="p-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {tasks.length === 0 && (
                                <tr>
                                    <td
                                        colSpan={6}
                                        className="p-6 text-center text-neutral-500"
                                    >
                                        No tasks found.
                                    </td>
                                </tr>
                            )}
                            {tasks.map((task) => (
                                <tr
                                    key={task.id}
                                    className="border-b last:border-0"
                                >
                                    <td className="p-3">
                                        <div className="font-medium">
                                            {task.title}
                                        </div>
                                        {task.description && (
                                            <div className="text-xs text-neutral-500">
                                                {task.description}
                                            </div>
                                        )}
                                    </td>
                                    <td className="p-3">
                                        <span
                                            className={`rounded-full px-2 py-1 text-xs ${statusStyle[task.status]}`}
                                        >
                                            {label(STATUSES, task.status)}
                                        </span>
                                    </td>
                                    <td className="p-3">
                                        {label(PRIORITIES, task.priority)}
                                    </td>
                                    <td className="p-3">
                                        {task.due_date
                                            ? task.due_date.slice(0, 10)
                                            : '-'}
                                    </td>
                                    <td className="p-3">
                                        {new Date(
                                            task.created_at,
                                        ).toLocaleDateString()}
                                    </td>
                                    <td className="flex justify-end gap-3 p-3">
                                        {task.status !== 'completed' && (
                                            <button
                                                className="text-green-600"
                                                onClick={() =>
                                                    router.patch(
                                                        `/tasks/${task.id}/complete`,
                                                    )
                                                }
                                            >
                                                Complete
                                            </button>
                                        )}
                                        <Link
                                            href={`/tasks/${task.id}/edit`}
                                            className="text-blue-600"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            className="text-red-600"
                                            onClick={() => remove(task)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
}

TasksIndex.layout = {
    breadcrumbs: [{ title: 'Tasks', href: '/tasks' }],
};
