<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Transaksi;

class DashboardController extends Controller
{
    public function index() {
        $data = Transaksi::selectRaw("DATE_FORMAT(tanggal_pinjam, '%x-%v') as minggu, COUNT(*) as jumlah")
            ->groupBy('minggu')
            ->orderBy('minggu')
            ->get();

        $rekap = $data->map(function ($item) {
            return [
                'minggu' => 'Minggu ' . substr($item->minggu, -2),
                'jumlah' => $item->jumlah,
            ];
        });

        return Inertia::render('dashboard', [
            'rekapPeminjaman' => $rekap,
        ]);
    }
}
