<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Buku extends Model
{
    use SoftDeletes;

    protected $table = 'bukus';
    protected $primary_key = 'id';
    protected $fillable = ['judul', 'penerbit', 'dimensi', 'stok'];
}
