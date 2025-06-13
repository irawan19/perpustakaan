<?php

namespace App\Http\Controllers\Buku;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Buku;
use Auth;

class BukuController extends Controller
{
    public function index() {
        $query = Buku::with('user')->orderBy('judul');

        if (request()->has('cari')) {
            $cari = request('cari');
            $query->where(function($q) use ($cari) {
                $q->where('no', 'like', "%{$cari}%")
                  ->orWhere('nama', 'like', "%{$cari}%");
            });
        }

        $bukus = $query->paginate(10);

        return Inertia::render('buku/index', [
            'bukus'  => $bukus,
            'cari'      => request('cari', '')
        ]);
    }

    public function create() {
        return Inertia::render('buku/create', []);
    }

    public function store(Request $request) {
        $request->validate([
            'judul'             => 'required',
            'penerbit'          => 'required',
            'dimensi'           => 'required',
            'stok'              => 'required|numeric|min:1',
        ]);

        Buku::create([
            'users_id'  => Auth::user()->id,
            'judul'     => $request->judul,
            'penerbit'  => $request->penerbit,
            'dimensi'   => $request->dimensi,
            'stok'      => $request->stok,
        ]);
        return redirect()->route('indexbuku')->with('message', 'Buku berhasil ditambahkan.');
    }

    public function edit($id) {
        $buku = Buku::find($id);
        return inertia::render('buku/edit', compact('buku'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'judul'             => 'required',
            'penerbit'          => 'required',
            'dimensi'           => 'required',
            'stok'              => 'required|numeric|min:1',
        ]);

        
        Buku::find($id)->update([
            'users_id'          => Auth::user()->id,
            'judul'             => $request->judul,
            'penerbit'          => $request->penerbit,
            'dimensi'           => $request->dimensi,
            'stok'              => $request->stok,
        ]);
        return redirect()->route('indexbuku')->with('message', 'Buku berhasil diperbarui.');
    }

    public function destroy($id) {
        Buku::find($id)->delete();
        return redirect()->route('indexbuku')->with('message', 'Buku berhasil dihapus.');
    }
}
