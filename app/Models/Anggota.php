<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;

class Anggota extends Model
{
    use HasFactory;
    use SoftDeletes;

    protected $table = 'anggotas';
    protected $primary_key = 'id';
    protected $fillable = ['users_id', 'no', 'tanggal_lahir', 'nama'];

    public function user() {
        return $this->belongsTo(User::class, 'users_id');
    }
}
