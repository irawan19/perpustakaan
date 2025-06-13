import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert, ChevronDownIcon, Megaphone } from 'lucide-react';
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
        title: 'Tambah Pengembalian',
        href: '/pengembalian/create',
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

interface Props {
    anggotas: Anggota[];
    bukus: Buku[];
    flash: {
        message?: string
    }
}

export default function Tambah({ anggotas, bukus, flash }: Props) {
    const [open, setOpen] = useState(false);
    const toYmd = (date: Date) =>
        `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

    const { data, setData, post, processing, errors } = useForm({
        bukus_id: "",
        anggotas_id: "",
        tanggal_kembali: new Date(),
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formattedData = {
            ...data,
            tanggal_kembali: toYmd(data.tanggal_kembali),
        };
        post(route('storepengembalian', {
            data: formattedData
        }));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Pengembalian" />
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
                            <div className="gap-1.5">
                                <Label htmlFor='anggotas_id'>Anggota</Label>
                                <Select value={data.anggotas_id}
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
                                            <SelectItem key={buku.id} value={buku.id.toString()}>
                                                {buku.judul}
                                            </SelectItem>))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='tanggal_kembali'>Tanggal Kembali</Label>
                                <br />
                                <Popover open={open} onOpenChange={setOpen}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            id="date"
                                            className="w-full justify-between font-normal"
                                        >
                                            {data.tanggal_kembali ? formatTanggal(data.tanggal_kembali) : "Pilih Tanggal"}
                                            <ChevronDownIcon />
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                        <Calendar
                                            mode="single"
                                            selected={data.tanggal_kembali}
                                            captionLayout="dropdown"
                                            onSelect={(date) => {
                                                if (date) {
                                                    setData('tanggal_kembali', date)
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
                                <Button type="submit" disabled={processing} variant="default" className='mr-2'>Simpan</Button>
                                <Link href={route('indexpengembalian')}>
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