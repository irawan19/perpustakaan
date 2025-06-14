<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\Anggota;
use Auth;

class AnggotaController extends Controller
{
    public function index() {
        $query = Anggota::with('user')->orderBy('no');

        if (request()->has('cari')) {
            $cari = request('cari');
            $query->where(function($q) use ($cari) {
                $q->where('no', 'like', "%{$cari}%")
                  ->orWhere('nama', 'like', "%{$cari}%");
            });
        }

        $anggotas = $query->paginate(10);

        return Inertia::render('anggota/index', [
            'anggotas'  => $anggotas,
            'cari'      => request('cari', '')
        ]);
    }

    public function create() {
        return Inertia::render('anggota/create', []);
    }

    public function store(Request $request) {
        $request->validate([
            'no'                => 'required|unique:anggotas',
            'tanggal_lahir'     => 'required',
            'nama'              => 'required'
        ]);

        Anggota::create([
            'users_id'      => Auth::user()->id,
            'no'            => $request->no,
            'tanggal_lahir' => $request->tanggal_lahir,
            'nama'          => $request->nama,
        ]);
        return redirect()->route('indexanggota')->with('message', 'Anggota berhasil ditambahkan.');
    }

    public function edit($id) {
        $anggota = Anggota::find($id);
        return inertia::render('anggota/edit', compact('anggota'));
    }

    public function update(Request $request, $id) {
        $request->validate([
            'no'                => 'required|unique:anggotas,no,'.$id.',id',
            'tanggal_lahir'     => 'required',
            'nama'              => 'required'
        ]);

        Anggota::find($id)->update([
            'users_id'      => Auth::user()->id,
            'no'            => $request->no,
            'tanggal_lahir' => date('Y-m-d', strtotime($request->tanggal_lahir)),
            'nama'          => $request->nama,
        ]);
        return redirect()->route('indexanggota')->with('message', 'Anggota berhasil diperbarui.');
    }

    public function destroy($id) {
        Anggota::find($id)->delete();
        return redirect()->route('indexanggota')->with('message', 'Anggota berhasil dihapus.');
    }
}
