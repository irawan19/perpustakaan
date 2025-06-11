import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Anggota',
        href: '/anggota',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Anggota" />
            <div className="m-4">
                <Link href={route('createanggota')}><Button variant="outline">Tambah Anggota</Button></Link>
            </div>
        </AppLayout >
    );
}