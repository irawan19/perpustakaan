<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\Buku\BukuController as Buku;
use App\Http\Controllers\Anggota\AnggotaController as Anggota;

Route::get('/', function () {
    return Inertia::render('welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');

    Route::group(['prefix' => 'anggota'], function() {
        Route::get('/', [Anggota::class, 'index'])->name('indexanggota');
        Route::get('/create', [Anggota::class, 'create'])->name('createanggota');
        Route::post('/', [Anggota::class, 'store'])->name('storeanggota');
        Route::get('/{id}/edit', [Anggota::class, 'edit'])->name('editanggota');
        Route::put('/{id}/edit', [Anggota::class, 'update'])->name('updateanggota');
        Route::delete('/{id}', [Anggota::class, 'destroy'])->name('destroyanggota');
    });

    Route::group(['prefix' => 'buku'], function() {
        Route::get('/', [Buku::class, 'index'])->name('indexbuku');
        Route::get('/create', [Buku::class, 'create'])->name('createbuku');
        Route::post('/', [Buku::class, 'store'])->name('storebuku');
        Route::get('/{id}/edit', [Buku::class, 'edit'])->name('editbuku');
        Route::put('/{id}/edit', [Buku::class, 'update'])->name('updatebuku');
        Route::delete('/{id}', [Buku::class, 'destroy'])->name('destroybuku');
    });

    Route::group(['prefix' => 'peminjaman'], function() {
        Route::get('/', [Peminjaman::class, 'index'])->name('indexpeminjaman');
        Route::get('/create', [Peminjaman::class, 'create'])->name('createpeminjaman');
        Route::post('/', [Peminjaman::class, 'store'])->name('storepeminjaman');
        Route::get('/{id}/edit', [Peminjaman::class, 'edit'])->name('editpeminjaman');
        Route::put('/{id}/edit', [Peminjaman::class, 'update'])->name('updatepeminjaman');
        Route::delete('/{id}', [Peminjaman::class, 'destroy'])->name('destroypeminjaman');
    });
    
    Route::group(['prefix' => 'pengembalian'], function() {
        Route::get('/', [Pengembalian::class, 'index'])->name('indexpengembalian');
        Route::get('/create', [Pengembalian::class, 'create'])->name('createpengembalian');
        Route::post('/', [Pengembalian::class, 'store'])->name('storepengembalian');
        Route::get('/{id}/edit', [Pengembalian::class, 'edit'])->name('editpengembalian');
        Route::put('/{id}/edit', [Pengembalian::class, 'update'])->name('updatepengembalian');
        Route::delete('/{id}', [Pengembalian::class, 'destroy'])->name('destroypengembalian');
    });
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
