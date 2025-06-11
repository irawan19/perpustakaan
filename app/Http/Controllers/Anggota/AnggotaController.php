<?php

namespace App\Http\Controllers\Anggota;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AnggotaController extends Controller
{
    public function index() {
        return Inertia::render('anggota/index', []);
    }

    public function create() {
        return Inertia::render('anggota/create', []);
    }
}
