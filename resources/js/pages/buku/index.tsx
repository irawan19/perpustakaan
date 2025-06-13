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
        title: 'Buku',
        href: '/buku',
    },
];

interface Buku {
    id: number,
    judul: string,
    dimensi: string,
    penerbit: string,
    stok: number,
    created_at: Date,
    updated_at: Date,
    name: string,
}

interface PageProps {
    bukus: {
        data: Buku[],
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

export default function Index({ bukus, cari, flash }: PageProps) {
    const [pencarian, setPencarian] = useState(cari);
    const { processing, delete: destroy } = useForm();

    const handlePencarian = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        router.get(route('indexbuku'), {
            cari: pencarian,
        });
    };

    const handleHapus = (id: number, nama: string) => {
        if (confirm(`Apakah anda ingin menghapus buku ${nama} ?`)) {
            destroy(`/buku/${id}`);
        }
    }
    
    const handlePageChange = (page: number) => {
         router.get(route('indexbuku'), {
            page,
            cari: pencarian,
        });
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Buku" />
            <div className="m-4 ms-auto">
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
                                    {bukus.data.map((buku: any, no: number) => (
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
                    <CardFooter>
                        <div className="flex items-center justify-between px-2 ms-auto">
                            <div className="text-sm text-muted-foreground">
                                Menampilkan {bukus.from} sampai {bukus.to} dari {bukus.total} hasil
                            </div>
                            <div className="flex items-center space-x-2">
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(bukus.current_page - 1)}
                                    disabled={bukus.current_page === 1}
                                >
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <div className="flex items-center space-x-1">
                                    {Array.from({ length: bukus.last_page }, (_, i) => i + 1).map((page) => (
                                        <Button key={page}
                                            variant={page === bukus.current_page ? "default" : "outline"}
                                            size="icon"
                                            onClick={() => handlePageChange(page)}
                                        >
                                            {page}
                                        </Button>))}
                                </div>
                                <Button variant="outline"
                                    size="icon"
                                    onClick={() => handlePageChange(bukus.current_page + 1)}
                                    disabled={bukus.current_page === bukus.last_page}
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