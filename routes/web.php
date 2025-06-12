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
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
