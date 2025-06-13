import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ChevronLeft, ChevronRight, Megaphone, Search } from 'lucide-react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { formatTanggal } from '@/lib/utils';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Input } from '@/components/ui/input';
import { useState } from 'react';

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
    created_at: Date,
    updated_at: Date,
    name: string,
}

interface PageProps {
    anggotas: {
        data: Anggota[],
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        from: number;
        to: number;
    },
    cari: string,
    flash: {
        message?: string
    }
}

export default function Index({ anggotas, cari, flash }: PageProps) {
    const [pencarian, setPencarian] = useState(cari);
    const { processing, delete: destroy } = useForm();

    const handlePencarian = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('indexanggota'), {
            cari: pencarian,
        });
    };

    const handleHapus = (id: number, nama: string) => {
        if (confirm(`Apakah anda ingin menghapus anggota ${nama} ?`)) {
            destroy(`/anggota/${id}`);
        }
    }
    
    const handlePageChange = (page: number) => {
         router.get(route('indexanggota'), {
            page,
            cari: pencarian,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Anggota" />
            <div className="m-4 ms-auto">
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
                        <form onSubmit={handlePencarian}>
                            <div className="flex w-full max-w-sm items-center gap-2 mb-5">
                                <Input
                                    type="text"
                                    name="cari"
                                    placeholder="Cari sesuatu..."
                                    onChange={(e) => setPencarian(e.target.value)}
                                    value={pencarian}
                                />
                            </div>
                        </form>
                        {anggotas && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>No Anggota</TableHead>
                                        <TableHead>Tanggal Lahir</TableHead>
                                        <TableHead>Nama</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Diperbarui</TableHead>
                                        <TableHead>Diperbarui Oleh</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Hapus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {anggotas.data.map((anggota: any, no: number) => (
                                        <TableRow key={anggota.id}>
                                            <TableCell>{no + 1}</TableCell>
                                            <TableCell>{anggota.no}</TableCell>
                                            <TableCell>{formatTanggal(anggota.tanggal_lahir)}</TableCell>
                                            <TableCell>{anggota.nama}</TableCell>
                                            <TableCell>{formatTanggal(anggota.created_at)}</TableCell>
                                            <TableCell>{formatTanggal(anggota.updated_at)}</TableCell>
                                            <TableCell>{anggota.user.name}</TableCell>
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
                        )}
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center justify-between px-2 ms-auto">
                            <div className="text-sm text-muted-foreground">
                                Menampilkan {anggotas.from} sampai {anggotas.to} dari {anggotas.total} hasil
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(anggotas.current_page - 1)}
                                    disabled={anggotas.current_page === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: anggotas.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button key={page}
                                            variant={page === anggotas.current_page ? "default" : "outline"}
                                            size="icon"
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </Button>))}
                                </div>
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(anggotas.current_page + 1)}
                                    disabled={anggotas.current_page === anggotas.last_page}
                                >
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardFooter>
                </Card>
            </div>
        </AppLayout >
    );
}