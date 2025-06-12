<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\User;

class Transaksi extends Model
{
    use HasFactory;

    protected $table = 'transaksis';
    protected $primary_key = 'id';
    protected $fillable = ['users_id', 'anggotas_id', 'bukus_id', 'tanggal_pinjam', 'tanggal_kembali'];

    public function user() {
        return $this->belongsTo(User::class, 'users_id');
    }
}
