<?php

use App\Http\Controllers\BarbeariaAdminController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/barbearias', [BarbeariaAdminController::class, 'index'])->name('barbearias.index');
Route::get('/barbearias/criar', [BarbeariaAdminController::class, 'create'])->name('barbearias.create');
Route::post('/barbearias', [BarbeariaAdminController::class, 'store'])->name('barbearias.store');
Route::get('/barbearias/{barbearia}/editar', [BarbeariaAdminController::class, 'edit'])->name('barbearias.edit');
Route::put('/barbearias/{barbearia}', [BarbeariaAdminController::class, 'update'])->name('barbearias.update');
Route::delete('/barbearias/{barbearia}', [BarbeariaAdminController::class, 'destroy'])->name('barbearias.destroy');
