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
        title: 'Peminjaman',
        href: '/peminjaman',
    },
];

interface Anggota {
    no: number, 
    nama: string,
}

interface Buku {
    judul: string,
    penerbit: string,
    dimensi: string,
}

interface Peminjaman {
    id: number,
    no: number,
    tanggal_pinjam: Date,
    anggota: Anggota[],
    buku: Buku[],
    judul: Date,
    created_at: Date,
    updated_at: Date,
    name: string,
}

interface PageProps {
    peminjamans: {
        data: Peminjaman[],
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

export default function Index({ peminjamans, cari, flash }: PageProps) {
    const [pencarian, setPencarian] = useState(cari);
    const { processing, delete: destroy } = useForm();

    const handlePencarian = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('indexpeminjaman'), {
            cari: pencarian,
        });
    };

    const handleHapus = (id: number, nama: string, judul: string) => {
        if (confirm(`Apakah anda ingin menghapus peminjaman ${nama} dengan judul ${judul} ?`)) {
            destroy(`/peminjaman/${id}`);
        }
    }
    
    const handlePageChange = (page: number) => {
         router.get(route('indexpeminjaman'), {
            page,
            cari: pencarian,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Peminjaman" />
            <div className="m-4 ms-auto">
                <Link href={route('createpeminjaman')}><Button variant="outline">Tambah Peminjaman</Button></Link>
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
                        {peminjamans && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Tanggal Pinjam</TableHead>
                                        <TableHead>No Anggota</TableHead>
                                        <TableHead>Nama Anggota</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Penerbit</TableHead>
                                        <TableHead>Dimensi</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Diperbarui</TableHead>
                                        <TableHead>Diperbarui Oleh</TableHead>
                                        <TableHead>Edit</TableHead>
                                        <TableHead>Hapus</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {peminjamans.data.map((peminjaman: any, no: number) => (
                                        <TableRow key={peminjaman.id}>
                                            <TableCell>{no + 1}</TableCell>
                                            <TableCell>{formatTanggal(peminjaman.tanggal_pinjam)}</TableCell>
                                            <TableCell>{peminjaman.anggota.no}</TableCell>
                                            <TableCell>{peminjaman.anggota.nama}</TableCell>
                                            <TableCell>{peminjaman.buku.judul}</TableCell>
                                            <TableCell>{peminjaman.buku.penerbit}</TableCell>
                                            <TableCell>{peminjaman.buku.dimensi}</TableCell>
                                            <TableCell>{formatTanggal(peminjaman.created_at)}</TableCell>
                                            <TableCell>{formatTanggal(peminjaman.updated_at)}</TableCell>
                                            <TableCell>{peminjaman.user.name}</TableCell>
                                            <TableCell>
                                                <Link href={route('editpeminjaman', peminjaman.id)}>
                                                    <Button variant="default">
                                                        Edit
                                                    </Button>
                                                </Link>
                                            </TableCell>
                                            <TableCell>
                                                <Button disabled={processing} variant="destructive" onClick={() => handleHapus(peminjaman.id, peminjaman.anggota.nama, peminjaman.buku.judul)}>Hapus</Button>
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
                                Menampilkan {peminjamans.from} sampai {peminjamans.to} dari {peminjamans.total} hasil
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(peminjamans.current_page - 1)}
                                    disabled={peminjamans.current_page === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: peminjamans.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button key={page}
                                            variant={page === peminjamans.current_page ? "default" : "outline"}
                                            size="icon"
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </Button>))}
                                </div>
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(peminjamans.current_page + 1)}
                                    disabled={peminjamans.current_page === peminjamans.last_page}
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