<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AgendaController;
use App\Http\Controllers\BarbeariaController;
use App\Http\Controllers\CorteController;
use App\Http\Controllers\HorarioController;

/*
|--------------------------------------------------------------------------
| Rotas da API — Trimly
|--------------------------------------------------------------------------
|
| Rotas públicas (sem autenticação):
|   POST /api/login
|   POST /api/register
|
| Rotas protegidas (requerem token Sanctum no header Authorization):
|   POST   /api/logout
|   GET    /api/me
|   GET    /api/agendamentos
|   POST   /api/agendamentos
|   GET    /api/agendamentos/{id}
|   PUT    /api/agendamentos/{id}
|   DELETE /api/agendamentos/{id}
|
*/

// ── Rotas Públicas ──
Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/usuarios', [AuthController::class, 'index']);
Route::post('/usuarios', [AuthController::class, 'store']);
Route::get('/usuarios/{id}', [AuthController::class, 'show']);
Route::put('/usuarios/{id}', [AuthController::class, 'update']);
Route::delete('/usuarios/{id}', [AuthController::class, 'destroy']);
Route::get('/barbearias', [BarbeariaController::class, 'index']);
Route::post('/barbearias', [BarbeariaController::class, 'store']);
Route::put('/barbearias/{barbearia}', [BarbeariaController::class, 'update']);
Route::delete('/barbearias/{barbearia}', [BarbeariaController::class, 'destroy']);
Route::get('/cortes', [CorteController::class, 'index']);
Route::post('/cortes', [CorteController::class, 'store']);
Route::get('/horarios', [HorarioController::class, 'index']);

// ── Rotas Protegidas (precisam do token) ──
Route::middleware('auth:sanctum')->group(function () {
    // Autenticação
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'me']);

    // Agendamentos (CRUD)
    Route::get('/agendamentos', [AgendaController::class, 'index']);
    Route::post('/agendamentos', [AgendaController::class, 'store']);
    Route::get('/agendamentos/{id}', [AgendaController::class, 'show']);
    Route::put('/agendamentos/{id}', [AgendaController::class, 'update']);
    Route::delete('/agendamentos/{id}', [AgendaController::class, 'destroy']);
});
