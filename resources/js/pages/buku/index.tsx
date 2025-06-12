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
        title: 'Buku',
        href: '/buku',
    },
];

interface Buku {
    id: number,
    judul: string,
    penerbit: string,
    dimensi: string,
    stok: number,
    created_at: Date,
    updated_at: Date,
    name: string,
}

interface PageProps {
    bukus: Buku[],
    flash: {
        message?: string
    }
}

export default function Index() {
    const { bukus, flash } = usePage().props as unknown as PageProps;

    const {processing, delete: destroy} = useForm();

    const handleHapus = (id: number, nama: string) => {
        if(confirm(`Apakah anda ingin menghapus buku ${nama} ?`)){
            destroy(`/buku/${id}`);
        }
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buku" />
            <div className="m-4">
                <Link href={route('createbuku')}><Button variant="outline">Tambah Buku</Button></Link>
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
                        {bukus && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Dimensi</TableHead>
                                        <TableHead>Penerbit</TableHead>
                                        <TableHead>Stok</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Diperbarui</TableHead>
                                        <TableHead>Diperbarui Oleh</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Hapus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {bukus.map((buku: any, no: number) => (
                                        <TableRow key={buku.id}>
                                            <TableCell>{no + 1}</TableCell>
                                            <TableCell>{buku.judul}</TableCell>
                                            <TableCell>{buku.dimensi}</TableCell>
                                            <TableCell>{buku.penerbit}</TableCell>
                                            <TableCell>{buku.stok}</TableCell>
                                            <TableCell>{formatTanggal(buku.created_at)}</TableCell>
                                            <TableCell>{formatTanggal(buku.updated_at)}</TableCell>
                                            <TableCell>{buku.user.name}</TableCell>
                                            <TableCell>
                                                <Link href={route('editbuku', buku.id)}>
                                                    <Button variant="default">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button disabled={processing} variant="destructive" onClick={() => handleHapus(buku.id, buku.judul)}>Hapus</Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                </Card>
            </div>
        </AppLayout >
    );
}