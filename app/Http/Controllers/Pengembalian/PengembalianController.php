<?php

namespace App\Http\Controllers\Pengembalian;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Anggota;
use App\Models\Buku;
use App\Models\Transaksi;
use Auth;

class PengembalianController extends Controller
{
    public function index() {
        $query = Transaksi::with(['anggota', 'buku', 'user'])->WhereNotNull('tanggal_kembali')->orderBy('tanggal_kembali', 'desc');

        if (request()->has('cari')) {
            $cari = request('cari');
            $query->where(function($q) use ($cari) {
                $q->where('no', 'like', "%{$cari}%")
                  ->orWhere('nama', 'like', "%{$cari}%");
            });
        }

        $pengembalians = $query->paginate(10);

        return Inertia::render('pengembalian/index', [
            'pengembalians'  => $pengembalians,
            'cari'      => request('cari', '')
        ]);
    }

    public function create() {
        $anggotas   = Anggota::orderBy('no')->get();
        $bukus      = Buku::orderBy('judul')->get();
        return Inertia::render('pengembalian/create', [
            'anggotas'  => $anggotas,
            'bukus'     => $bukus,
        ]);
    }

    public function store(Request $request) {
        $cek = Transaksi::where('anggotas_id',$request->anggotas_id)
                        ->where('bukus_id', $request->bukus_id)
                        ->whereNull('tanggal_kembali')
                        ->count();
        if($cek != 0) {
            $request->validate([
                'tanggal_kembali'       => 'required',
                'anggotas_id'           => 'required',
                'bukus_id'              => 'required',
            ]);

            Transaksi::where('anggotas_id',$request->anggotas_id)->where('bukus_id',$request->bukus_id)->update([
                'users_id'              => Auth::user()->id,
                'tanggal_kembali'       => $request->tanggal_kembali,
            ]);

            $ambil_buku = Buku::find($request->bukus_id);

            Buku::find($request->bukus_id)->update([
                'stok' => $ambil_buku->stok + 1,
            ]);
            return redirect()->route('indexpengembalian')->with('message', 'Pengembalian berhasil ditambahkan.');
        } else {
            return redirect()->back()->with('message', 'Tidak ada daftar anggota dan buku yang dipinjam.')->withInput($request->all());
        }
    }
}
