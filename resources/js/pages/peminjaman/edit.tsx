import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, ChevronDownIcon } from 'lucide-react';
import { Calendar } from "@/components/ui/calendar"
import { formatTanggal } from '@/lib/utils';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Peminjaman',
        href: '/peminjaman/edit',
    },
];

interface Anggota {
    id: number;
    nama: string;
}

interface Buku {
    id: number;
    judul: string;
}

interface Peminjaman {
    id: number,
    tanggal_pinjam: Date,
    anggotas_id: string,
    bukus_id: string,
}

interface Props {
    peminjamans: Peminjaman;
    anggotas: Anggota[];
    bukus: Buku[];
}

export default function Edit({peminjamans, anggotas, bukus}: Props) {
    const [open, setOpen] = useState(false);
    const toYmd = (date: Date) =>
    `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
    const { data, setData, put, processing, errors, transform } = useForm({
        bukus_id: peminjamans.bukus_id.toString(),
        anggotas_id: peminjamans.anggotas_id.toString(),
        tanggal_pinjam: peminjamans.tanggal_pinjam,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
         transform((data) => ({
            ...data,
            tanggal_pinjam: toYmd(data.tanggal_pinjam),
        }));
        put(route('updatepeminjaman', peminjamans.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Peminjaman" />
            <div className="w-6/12 p-4 m-0 center-col">
                <form onSubmit={handleSubmit}>
                    <Card>
                        <CardHeader>
                            {Object.keys(errors).length > 0 && (
                                <Alert variant="destructive">
                                    <CircleAlert />
                                    <AlertTitle>Kesalahan!</AlertTitle>
                                    <AlertDescription>
                                        <ul>
                                            {Object.entries(errors).map(([index, pesan]) => (
                                                <li key={index}>{pesan as string}</li>
                                            ))}
                                        </ul>
                                    </AlertDescription>
                                </Alert>
                            )}
                        </CardHeader>
                        <CardContent>
                            <div className="gap-1.5">
                                <Label htmlFor='anggotas_id'>Anggota</Label>
                                <Select
                                    value={data.anggotas_id}
                                    onValueChange={(value) => setData('anggotas_id', value)}
                                >
                                    <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                        <SelectValue placeholder="Silahkan pilih anggota" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {anggotas.map((anggota) => (
                                            <SelectItem key={anggota.id} value={anggota.id.toString()}>
                                                {anggota.nama}
                                            </SelectItem>))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='bukus_id'>Buku</Label>
                                <Select value={data.bukus_id}
                                    onValueChange={(value) => setData('bukus_id', value)}
                                >
                                    <SelectTrigger className="focus:ring-2 focus:ring-primary">
                                        <SelectValue placeholder="Silahkan pilih buku" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {bukus.map((buku) => (
                                            <SelectItem
                                                key={buku.id}
                                                value={buku.id.toString()}
                                            >
                                                {buku.judul}
                                            </SelectItem>))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='tanggal_pinjam'>Tanggal Pinjam</Label>
                                <br />
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="date"
                                            className="w-full justify-between font-normal"
                                        >
                                            {data.tanggal_pinjam ? formatTanggal(data.tanggal_pinjam) : "Pilih Tanggal"}
                                            <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={data.tanggal_pinjam}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                                if (date) {
                                                    setData('tanggal_pinjam', date)
                                                    setOpen(false)
                                                }
                                            }}
                                        />
                                    </PopoverContent>
                                </Popover>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="ms-auto">
                                <Button type="submit" disabled={processing} variant="default" className='mr-2'>Perbarui</Button>
                                <Link href={route('indexpeminjaman')}>
                                    <Button variant='destructive'>Batal</Button>
                                </Link>
                            </div>
                        </CardFooter>
                    </Card>
                </form>
            </div>
        </AppLayout >
    );
}