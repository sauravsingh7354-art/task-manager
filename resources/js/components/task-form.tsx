import { Link, useForm } from '@inertiajs/react';
import type { FormEvent, ReactNode } from 'react';
import { PRIORITIES, STATUSES, type Task } from '@/lib/tasks';

type FormData = {
    title: string;
    description: string;
    status: string;
    priority: string;
    due_date: string;
};

const inputClass =
    'w-full rounded-md border border-neutral-300 bg-transparent px-3 py-2 text-sm dark:border-neutral-700';

function Field({ label, error, children }: { label: string; error?: string; children: ReactNode }) {
    return (
        <div className="grid gap-1">
            <label className="text-sm font-medium">{label}</label>
            {children}
            {error && <p className="text-sm text-red-600">{error}</p>}
        </div>
    );
}

export default function TaskForm({ task }: { task?: Task }) {
    const form = useForm<FormData>({
        title: task?.title ?? '',
        description: task?.description ?? '',
        status: task?.status ?? 'pending',
        priority: task?.priority ?? 'medium',
        due_date: task?.due_date?.slice(0, 10) ?? '',
    });

    const submit = (e: FormEvent) => {
        e.preventDefault();
        if (task) {
            form.put(`/tasks/${task.id}`);
        } else {
            form.post('/tasks');
        }
    };

    return (
        <form onSubmit={submit} className="grid max-w-xl gap-4">
            <Field label="Title" error={form.errors.title}>
                <input
                    className={inputClass}
                    value={form.data.title}
                    onChange={(e) => form.setData('title', e.target.value)}
                />
            </Field>

            <Field label="Description" error={form.errors.description}>
                <textarea
                    rows={4}
                    className={inputClass}
                    value={form.data.description}
                    onChange={(e) => form.setData('description', e.target.value)}
                />
            </Field>

            <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Status" error={form.errors.status}>
                    <select
                        className={inputClass}
                        value={form.data.status}
                        onChange={(e) => form.setData('status', e.target.value)}
                    >
                        {STATUSES.map((s) => (
                            <option key={s.value} value={s.value}>{s.label}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Priority" error={form.errors.priority}>
                    <select
                        className={inputClass}
                        value={form.data.priority}
                        onChange={(e) => form.setData('priority', e.target.value)}
                    >
                        {PRIORITIES.map((p) => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>
                </Field>

                <Field label="Due date" error={form.errors.due_date}>
                    <input
                        type="date"
                        className={inputClass}
                        value={form.data.due_date}
                        onChange={(e) => form.setData('due_date', e.target.value)}
                    />
                </Field>
            </div>

            <div className="flex gap-2">
                <button
                    type="submit"
                    disabled={form.processing}
                    className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white disabled:opacity-50 dark:bg-white dark:text-neutral-900"
                >
                    {task ? 'Save changes' : 'Create task'}
                </button>
                <Link href="/tasks" className="rounded-md border px-4 py-2 text-sm">
                    Cancel
                </Link>
            </div>
        </form>
    );
}