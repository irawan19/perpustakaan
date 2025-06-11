import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm, usePage } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Megaphone } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { formatTanggal } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Anggota',
        href: '/anggota',
    },
];

interface Anggota {
    id: number,
    no: number,
    tanggal_lahir: Date,
    nama: string,
}

interface PageProps {
    anggotas: Anggota[],
    flash: {
        message?: string
    }
}

export default function Index() {
    const { anggotas, flash } = usePage().props as unknown as PageProps;

    const {processing, delete: destroy} = useForm();

    const handleHapus = (id: number, nama: string) => {
        if(confirm(`Apakah anda ingin menghapus ${nama} ?`)){
            destroy(`/anggota/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Anggota" />
            <div className="m-4">
                <Link href={route('createanggota')}><Button variant="outline">Tambah Anggota</Button></Link>
            </div>
            <div className="w-12/12 p-4 m-0 center-col">
                <Card>
                    <CardHeader>
                        {flash.message && (
                            <Alert variant="default">
                                <Megaphone />
                                <AlertTitle>Notifikasi!</AlertTitle>
                                <AlertDescription>
                                    {flash.message}
                                </AlertDescription>
                            </Alert>
                        )}
                    </CardHeader>
                    <CardContent>
                        {anggotas && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>No Anggota</TableHead>
                                        <TableHead>Tanggal Lahir</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Hapus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {anggotas.map((anggota: any, no: number) => (
                                        <TableRow key={anggota.id}>
                                            <TableCell>{no + 1}</TableCell>
                                            <TableCell>{anggota.no}</TableCell>
                                            <TableCell>{formatTanggal(anggota.tanggal_lahir)}</TableCell>
                                            <TableCell>{anggota.nama}</TableCell>
                                            <TableCell>
                                                <Link href={route('editanggota', anggota.id)}>
                                                    <Button variant="default">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button disabled={processing} variant="destructive" onClick={() => handleHapus(anggota.id, anggota.nama)}>Hapus</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )};
                    </CardContent>
                </Card>
            </div>
        </AppLayout >
    );
}