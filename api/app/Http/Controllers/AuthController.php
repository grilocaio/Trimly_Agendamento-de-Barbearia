<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Cargo;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\ValidationException;

class AuthController extends Controller
{
    /**
     * POST /api/login
     *
     * Recebe email e senha, valida e retorna um token Sanctum.
     * O front-end deve armazenar esse token e enviá-lo nos headers:
     *   Authorization: Bearer <token>
     */
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'senha' => 'required|string',
        ]);

        $user = User::where('email', $request->email)->first();

        if (! $user || $request->senha !== $user->senha) {
            throw ValidationException::withMessages([
                'email' => ['As credenciais informadas estão incorretas.'],
            ]);
        }

        $user->load('cargo');

        $token = $user->createToken(
            $request->device_name ?? 'api'
        )->plainTextToken;

        return response()->json([
            'message' => 'Login realizado com sucesso!',
            'token'   => $token,
            'user'    => [
                'id'          => $user->idUsuario,
                'nome'        => $user->Nome_Usuario,
                'email'       => $user->email,
                'telefone'    => $user->telefone,
                'cargo'       => $user->cargo->Cargos ?? null,
                'barbeariaId' => $user->Barbearia_id_Barbearia,
            ],
        ]);
    }

    public function register(Request $request)
    {
        $request->validate([
            'nome'     => 'required|string|max:100',
            'email'    => 'required|email|unique:Usuario,email',
            'senha'    => 'required|string|min:6',
            'telefone' => 'nullable|string|max:20',
        ]);

        $user = User::create([
            'Nome_Usuario' => $request->nome,
            'email'        => $request->email,
            'senha'        => $request->senha,
            'telefone'     => $request->telefone,
            'ID_Cargo'     => 1,
        ]);

        $user->load('cargo');

        $token = $user->createToken('api')->plainTextToken;

        return response()->json([
            'message' => 'Cadastro realizado com sucesso!',
            'token'   => $token,
            'user'    => [
                'id'          => $user->idUsuario,
                'nome'        => $user->Nome_Usuario,
                'email'       => $user->email,
                'telefone'    => $user->telefone,
                'cargo'       => $user->cargo->Cargos ?? null,
                'barbeariaId' => $user->Barbearia_id_Barbearia,
            ],
        ], 201);
    }

    public function index(Request $request)
    {
        $query = User::with('cargo');

        if ($request->filled('email')) {
            $query->where('email', $request->email);
        }

        $usuarios = $query->get();

        return response()->json($usuarios->map(function ($user) {
            return [
                'id' => $user->idUsuario,
                'nome' => $user->Nome_Usuario,
                'email' => $user->email,
                'senha' => $user->senha,
                'telefone' => $user->telefone,
                'cargo' => $user->cargo->Cargos ?? null,
                'barbeariaId' => $user->Barbearia_id_Barbearia,
            ];
        }));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'email' => 'required|email|unique:Usuario,email',
            'senha' => 'required|string|min:6',
            'telefone' => 'nullable|string|max:20',
            'cargo' => 'nullable|string',
            'barbeariaId' => 'nullable|integer',
        ]);

        $cargo = $request->cargo ?? 'Cliente';
        $cargoId = match ($cargo) {
            'Administrador' => 3,
            'Barbeiro' => 2,
            default => 1,
        };

        $user = User::create([
            'Nome_Usuario' => $request->nome,
            'email' => $request->email,
            'senha' => $request->senha,
            'telefone' => $request->telefone,
            'ID_Cargo' => $cargoId,
            'Barbearia_id_Barbearia' => $request->barbeariaId,
        ]);

        return response()->json([
            'id' => $user->idUsuario,
            'nome' => $user->Nome_Usuario,
            'email' => $user->email,
            'senha' => $user->senha,
            'telefone' => $user->telefone,
            'cargo' => $cargo,
            'barbeariaId' => $user->Barbearia_id_Barbearia,
        ], 201);
    }

    public function show($id)
    {
        $user = User::with('cargo')->findOrFail($id);

        return response()->json([
            'id' => $user->idUsuario,
            'nome' => $user->Nome_Usuario,
            'email' => $user->email,
            'senha' => $user->senha,
            'telefone' => $user->telefone,
            'cargo' => $user->cargo->Cargos ?? null,
            'barbeariaId' => $user->Barbearia_id_Barbearia,
        ]);
    }

    public function update(Request $request, $id)
    {
        $user = User::findOrFail($id);
        $user->update([
            'Nome_Usuario' => $request->nome ?? $user->Nome_Usuario,
            'email' => $request->email ?? $user->email,
            'senha' => $request->senha ?? $user->senha,
            'telefone' => $request->telefone ?? $user->telefone,
            'Barbearia_id_Barbearia' => $request->barbeariaId ?? $user->Barbearia_id_Barbearia,
        ]);

        return response()->json([
            'id' => $user->idUsuario,
            'nome' => $user->Nome_Usuario,
            'email' => $user->email,
            'senha' => $user->senha,
            'telefone' => $user->telefone,
            'cargo' => $user->cargo->Cargos ?? null,
            'barbeariaId' => $user->Barbearia_id_Barbearia,
        ]);
    }

    public function destroy($id)
    {
        $user = User::findOrFail($id);
        $user->delete();

        return response()->json(['message' => 'Usuário removido com sucesso!']);
    }

    /**
     * POST /api/logout
     *
     * Revoga o token atual do usuário autenticado.
     */
    public function logout(Request $request)
    {
        // Revoga o token que foi usado para autenticar esta requisição
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Logout realizado com sucesso!',
        ]);
    }

    /**
     * GET /api/me
     *
     * Retorna os dados do usuário autenticado.
     */
    public function me(Request $request)
    {
        $user = $request->user();
        $user->load('cargo');

        return response()->json([
            'id'       => $user->idUsuario,
            'nome'     => $user->Nome_Usuario,
            'email'    => $user->email,
            'telefone' => $user->telefone,
            'cargo'    => $user->cargo->Cargos ?? null,
        ]);
    }
}
