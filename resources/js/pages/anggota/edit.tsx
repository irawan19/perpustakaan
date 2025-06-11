import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
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

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Edit Anggota',
        href: '/anggota/edit',
    },
];

interface Anggota{
    id:number,
    no:number,
    tanggal_lahir: Date,
    nama: string,
}

interface Props {
    anggota: Anggota;
}

export default function Edit({anggota} : Props) {
    const [open, setOpen] = useState(false)
    const { data, setData, put, processing, errors } = useForm({
        no: anggota.no,
        tanggal_lahir: anggota.tanggal_lahir,
        nama: anggota.nama,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(route('updateanggota', anggota.id));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Edit Anggota" />
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
                            <div className="flex flex-wrap -mx-2">
                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <div className="gap-1.5">
                                        <Label htmlFor='no'>No Anggota</Label>
                                        <Input
                                            type="number"
                                            autoFocus
                                            placeholder="Masukkan No Anggota..."
                                            value={data.no}
                                            onChange={(e) => setData('no', Number(e.target.value))}
                                        >
                                        </Input>
                                    </div>
                                </div>

                                <div className="w-full md:w-1/2 px-2 mb-4">
                                    <div className="gap-1.5">
                                        <Label htmlFor='nama'>Tanggal Lahir</Label>
                                        <br />
                                        <Popover open={open} onOpenChange={setOpen}>
                                            <PopoverTrigger asChild>
                                                <Button
                                                    variant="outline"
                                                    id="date"
                                                    className="w-full justify-between font-normal"
                                                >
                                                    {data.tanggal_lahir ? formatTanggal(data.tanggal_lahir) : "Pilih Tanggal"}
                                                    <ChevronDownIcon />
                                                </Button>
                                            </PopoverTrigger>
                                            <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                                <Calendar
                                                    mode="single"
                                                    selected={data.tanggal_lahir}
                                                    captionLayout="dropdown"
                                                    disabled={(date) =>
                                                        date > new Date() || date < new Date("1900-01-01")
                                                    }
                                                    onSelect={(date) => {
                                                        if (date) {
                                                            setData('tanggal_lahir', date)
                                                            setOpen(false)
                                                        }
                                                    }}
                                                />
                                            </PopoverContent>
                                        </Popover>
                                    </div>
                                </div>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='nama'>Nama</Label>
                                <Input
                                    type="text"
                                    placeholder="Masukkan Nama..."
                                    value={data.nama}
                                    onChange={(e) => setData('nama', e.target.value)}
                                >
                                </Input>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="ms-auto">
                                <Button type="submit" disabled={processing} variant="default" className='mr-2'>Simpan</Button>
                                <Link href={route('indexanggota')}>
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