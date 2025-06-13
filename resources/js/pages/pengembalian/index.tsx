import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, router } from '@inertiajs/react';
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
        title: 'Pengembalian',
        href: '/pengembalian',
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

interface Pengembalian {
    id: number,
    no: number,
    tanggal_pinjam: Date,
    tanggal_kembali: Date,
    anggota: Anggota[],
    buku: Buku[],
    judul: Date,
    created_at: Date,
    updated_at: Date,
    name: string,
}

interface PageProps {
    pengembalians: {
        data: Pengembalian[],
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

export default function Index({ pengembalians, cari, flash }: PageProps) {
    const [pencarian, setPencarian] = useState(cari);

    const handlePencarian = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('indexpengembalian'), {
            cari: pencarian,
        });
    };
    
    const handlePageChange = (page: number) => {
         router.get(route('indexpengembalian'), {
            page,
            cari: pencarian,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Pengembalian" />
            <div className="m-4 ms-auto">
                <Link href={route('createpengembalian')}><Button variant="outline">Tambah Pengembalian</Button></Link>
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
                        {pengembalians && (
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>No</TableHead>
                                        <TableHead>Tanggal Pinjam</TableHead>
                                        <TableHead>Tanggal Kembali</TableHead>
                                        <TableHead>No Anggota</TableHead>
                                        <TableHead>Nama Anggota</TableHead>
                                        <TableHead>Judul</TableHead>
                                        <TableHead>Penerbit</TableHead>
                                        <TableHead>Dimensi</TableHead>
                                        <TableHead>Dibuat</TableHead>
                                        <TableHead>Diperbarui</TableHead>
                                        <TableHead>Diperbarui Oleh</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {pengembalians.data.map((pengembalian: any, no: number) => (
                                        <TableRow key={pengembalian.id}>
                                            <TableCell>{no + 1}</TableCell>
                                            <TableCell>{formatTanggal(pengembalian.tanggal_pinjam)}</TableCell>
                                            <TableCell>{formatTanggal(pengembalian.tanggal_kembali)}</TableCell>
                                            <TableCell>{pengembalian.anggota.no}</TableCell>
                                            <TableCell>{pengembalian.anggota.nama}</TableCell>
                                            <TableCell>{pengembalian.buku.judul}</TableCell>
                                            <TableCell>{pengembalian.buku.penerbit}</TableCell>
                                            <TableCell>{pengembalian.buku.dimensi}</TableCell>
                                            <TableCell>{formatTanggal(pengembalian.created_at)}</TableCell>
                                            <TableCell>{formatTanggal(pengembalian.updated_at)}</TableCell>
                                            <TableCell>{pengembalian.user.name}</TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </CardContent>
                    <CardFooter>
                        <div className="flex items-center justify-between px-2 ms-auto">
                            <div className="text-sm text-muted-foreground">
                                Menampilkan {pengembalians.from} sampai {pengembalians.to} dari {pengembalians.total} hasil
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(pengembalians.current_page - 1)}
                                    disabled={pengembalians.current_page === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: pengembalians.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button key={page}
                                            variant={page === pengembalians.current_page ? "default" : "outline"}
                                            size="icon"
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </Button>))}
                                </div>
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(pengembalians.current_page + 1)}
                                    disabled={pengembalians.current_page === pengembalians.last_page}
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