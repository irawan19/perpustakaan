<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Anggota extends Model
{
    use SoftDeletes;

    protected $table = 'anggotas';
    protected $primary_key = 'id';
    protected $fillable = ['no', 'tanggal_lahir', 'nama'];
}
