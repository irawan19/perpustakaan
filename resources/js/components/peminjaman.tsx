'use client';

import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from 'recharts';

interface Props {
    data: { minggu: string; jumlah: number }[];
}

export default function PeminjamanChart({ data }: Props) {
    return (
        <div className="p-4 w-full h-full">
            <h2 className="text-lg font-semibold mb-4">Rekap Peminjaman per Minggu</h2>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="minggu" />
                    <YAxis allowDecimals={false} />
                    <Tooltip />
                    <Line type="monotone" dataKey="jumlah" stroke="#6366f1" strokeWidth={2} />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
}