import { Head, Link } from '@inertiajs/react';
import { dashboard } from '@/routes';

type Stats = { total: number; pending: number; in_progress: number; completed: number };

export default function Dashboard({ stats }: { stats: Stats }) {
    const cards = [
        { label: 'Total Tasks', value: stats.total, href: '/tasks' },
        { label: 'Pending Tasks', value: stats.pending, href: '/tasks?status=pending' },
        { label: 'In Progress Tasks', value: stats.in_progress, href: '/tasks?status=in_progress' },
        { label: 'Completed Tasks', value: stats.completed, href: '/tasks?status=completed' },
    ];

    return (
        <>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {cards.map((card) => (
                        <Link
                            key={card.label}
                            href={card.href}
                            className="rounded-xl border border-sidebar-border/70 p-6 dark:border-sidebar-border"
                        >
                            <div className="text-sm text-neutral-500">{card.label}</div>
                            <div className="mt-2 text-3xl font-semibold">{card.value}</div>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
}

Dashboard.layout = {
    breadcrumbs: [
        {
            title: 'Dashboard',
            href: dashboard(),
        },
    ],
};