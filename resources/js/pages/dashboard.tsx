import { PlaceholderPattern } from '@/components/ui/placeholder-pattern';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import PeminjamanChart from '@/components/peminjaman';

interface Props {
    rekapPeminjaman: { minggu: string; jumlah: number }[];
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: '/dashboard' },
];

export default function Dashboard({ rekapPeminjaman }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="w-12/12 p-4 m-0 center-col">
                <div className="relative min-h-[100vh] flex-1 overflow-hidden rounded-xl border border-sidebar-border/70 md:min-h-min dark:border-sidebar-border">
                    <PeminjamanChart data={rekapPeminjaman} />
                </div>
            </div>
        </AppLayout>
    );
}