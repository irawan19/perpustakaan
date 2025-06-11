<?php

namespace App\Http\Controllers\Buku;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Buku;

class BukuController extends Controller
{
    public function index() {
        $bukus = Buku::all();
        return Inertia::render('buku/index', compact('bukus'));
    }

    public function create() {
        return Inertia::render('buku/create', []);
    }

    public function store(Request $request) {
        $request->validate([
            'no'                => 'required|unique:bukus',
            'tanggal_lahir'     => 'required',
            'nama'              => 'required'
        ]);

        Buku::create($request->all());
        return redirect()->route('indexbuku')->with('message', 'Buku berhasil ditambahkan.');
    }

    public function edit($id) {
        $buku = Buku::find($id);
        return inertia::render('buku/edit', compact('buku'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'no'                => 'required|unique:bukus,no,'.$id.',id',
            'tanggal_lahir'     => 'required',
            'nama'              => 'required'
        ]);

        
        Buku::find($id)->update([
            'no'            => $request->no,
            'tanggal_lahir' => $request->tanggal_lahir,
            'nama'          => $request->nama,
        ]);
        return redirect()->route('indexbuku')->with('message', 'Buku berhasil diperbarui.');
    }

    public function destroy($id) {
        Buku::find($id)->delete();
        return redirect()->route('indexbuku')->with('message', 'Buku berhasil dihapus.');
    }
}
