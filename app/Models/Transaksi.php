<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;
use App\Models\Anggota;
use App\Models\Buku;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksis';
    protected $primary_key = 'id';
    protected $fillable = ['users_id', 'anggotas_id', 'bukus_id', 'tanggal_pinjam', 'tanggal_kembali'];

    public function user() {
        return $this->belongsTo(User::class, 'users_id');
    }

    public function anggota() {
        return $this->belongsTo(Anggota::class, 'anggotas_id');
    }

    public function buku() {
        return $this->belongsTo(Buku::class, 'bukus_id');
    }
}
