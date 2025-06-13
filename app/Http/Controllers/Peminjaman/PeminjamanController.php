<?php

namespace App\Http\Controllers\Peminjaman;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Anggota;
use App\Models\Buku;
use App\Models\Transaksi;
use Auth;

class PeminjamanController extends Controller
{
    public function index() {
        $query = Transaksi::with(['anggota', 'buku', 'user'])->whereNull('tanggal_kembali')->orderBy('tanggal_pinjam', 'desc');

        if (request()->has('cari')) {
            $cari = request('cari');
            $query->where(function($q) use ($cari) {
                $q->where('no', 'like', "%{$cari}%")
                  ->orWhere('nama', 'like', "%{$cari}%");
            });
        }

        $peminjamans = $query->paginate(10);

        return Inertia::render('peminjaman/index', [
            'peminjamans'  => $peminjamans,
            'cari'      => request('cari', '')
        ]);
    }

    public function create() {
        $anggotas = Anggota::orderBy('no')->get();
        $bukus = Buku::where('stok','>',0)->orderBy('judul')->get();
        return Inertia::render('peminjaman/create', [
            'anggotas'  => $anggotas,
            'bukus'     => $bukus,
        ]);
    }

    public function store(Request $request) {
        $request->validate([
            'tanggal_pinjam'    => 'required',
            'anggotas_id'       => 'required',
            'bukus_id'          => 'required',
        ]);

        Transaksi::create([
            'users_id'          => Auth::user()->id,
            'tanggal_pinjam'    => $request->tanggal_pinjam,
            'anggotas_id'       => $request->anggotas_id,
            'bukus_id'          => $request->bukus_id,
        ]);

        $ambil_buku = Buku::find($request->bukus_id);

        Buku::find($request->bukus_id)->update([
            'stok' => $ambil_buku->stok - 1,
        ]);
        return redirect()->route('indexpeminjaman')->with('message', 'Peminjaman berhasil ditambahkan.');
    }

    public function edit($id) {
        $peminjamans    = Transaksi::find($id);
        $anggotas       = Anggota::orderBy('no')->get();
        $bukus          = Buku::orderBy('judul')->get();
        return inertia::render('peminjaman/edit', [
            'peminjamans'    => $peminjamans,
            'anggotas'      => $anggotas,
            'bukus'         => $bukus,
        ]);
    }

    public function update(Request $request, $id) {
        $request->validate([
            'tanggal_pinjam'    => 'required',
            'anggotas_id'       => 'required',
            'bukus_id'          => 'required',
        ]);

        $ambil_transaksi_lama   = Transaksi::find($id);
        $ambil_buku_lama        = Buku::find($ambil_transaksi_lama->bukus_id);
        Buku::find($ambil_buku_lama->id)->update([
            'stok'  => $ambil_buku_lama->stok + 1
        ]);

        $ambil_buku_baru        = Buku::find($request->bukus_id);
        Buku::find($ambil_buku_baru->id)->update([
            'stok'  => $ambil_buku_baru->stok - 1
        ]);

        Transaksi::find($id)->update([
            'users_id'          => Auth::user()->id,
            'tanggal_pinjam'    => $request->tanggal_pinjam,
            'anggotas_id'       => $request->anggotas_id,
            'bukus_id'          => $request->bukus_id,
        ]);

        return redirect()->route('indexpeminjaman')->with('message', 'Peminjaman berhasil diperbarui.');
    }

    public function destroy($id) {
        $ambil_transaksi   = Transaksi::find($id);
        $ambil_buku        = Buku::find($ambil_transaksi->bukus_id);
        Buku::find($ambil_buku->id)->update([
            'stok'  => $ambil_buku->stok + 1
        ]);
        Transaksi::find($id)->delete();
        return redirect()->route('indexpeminjaman')->with('message', 'Peminjaman berhasil dihapus.');
    }
}
