import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link, useForm } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CircleAlert } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Buku',
        href: '/buku/create',
    },
];

export default function Tambah() {
    const { data, setData, post, processing, errors } = useForm({
        judul: "",
        penerbit: "",
        dimensi: "",
        stok: 0,
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(route('storebuku'));
    }

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Buku" />
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
                                <Label htmlFor='judul'>Judul</Label>
                                <Input
                                    type="text"
                                    autoFocus
                                    placeholder="Masukkan Judul..."
                                    value={data.judul}
                                    onChange={(e) => setData('judul', e.target.value)}
                                >
                                </Input>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='penerbit'>Penerbit</Label>
                                <Input
                                    type="text"
                                    placeholder="Masukkan Penerbit..."
                                    value={data.penerbit}
                                    onChange={(e) => setData('penerbit', e.target.value)}
                                >
                                </Input>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='dimensi'>Dimensi</Label>
                                <Textarea
                                    placeholder="Masukkan Dimensi..."
                                    value={data.dimensi}
                                    onChange={(e) => setData('dimensi', e.target.value)}
                                />
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='stok'>Stok</Label>
                                <Input
                                    type="number"
                                    placeholder="Masukkan stok..."
                                    value={data.stok}
                                    onChange={(e) => setData('stok', Number(e.target.value))}
                                >
                                </Input>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="ms-auto">
                                <Button type="submit" disabled={processing} variant="default" className='mr-2'>Simpan</Button>
                                <Link href={route('indexbuku')}>
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