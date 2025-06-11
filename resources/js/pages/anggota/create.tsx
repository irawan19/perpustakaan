import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Button } from '@/components/ui/button';
import { Head, Link } from '@inertiajs/react';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Tambah Anggota',
        href: '/anggota/create',
    },
];

export default function Index() {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Tambah Anggota" />
            <div className="w-6/12 p-4 m-0 center-col">
                <form>
                    <Card>
                        <CardContent>
                            <div className="gap-1.5">
                                <Label htmlFor='no'>No Anggota</Label>
                                <Input type="number" autoFocus placeholder='Masukkan No Anggota...'></Input>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='nama'>Tanggal Lahir</Label>
                                <Input type="text" readOnly={true} placeholder='Masukkan Tanggal lahir...'></Input>
                            </div>
                            <div className="gap-1.5">
                                <Label htmlFor='nama'>Nama</Label>
                                <Input type="text" placeholder='Masukkan Nama...'></Input>
                            </div>
                        </CardContent>
                        <CardFooter>
                            <div className="ms-auto">
                                <Button variant="default" className='mr-2'>Simpan</Button>
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