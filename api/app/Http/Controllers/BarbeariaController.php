<?php

namespace App\Http\Controllers;

use App\Models\Barbearia;
use App\Models\Endereco;
use Illuminate\Http\Request;

class BarbeariaController extends Controller
{
    public function index()
    {
        $barbearias = Barbearia::with('endereco')->get();

        $imagensPorBarbearia = [
            'Mr Cutts' => '/barbearias/jacarei/mrcutts.jpeg',
            'MW Barber Studio' => '/barbearias/jacarei/mw barber studio.jpeg',
            'Visão Barbearia' => '/barbearias/jacarei/visão barbearia.jpeg',
            'Ocimar Hair Barbearia' => '/barbearias/sjc/ocimar hair.jpeg',
            'Kleber Rosa Barbearia' => '/barbearias/sjc/Kleber Rosa.jpeg',
            'Santta Madre Barbearia' => '/barbearias/sjc/santta madre.jpeg',
        ];

        return response()->json($barbearias->map(function ($barbearia) use ($imagensPorBarbearia) {
            $nome = trim($barbearia->nome ?? '');
            $endereco = $barbearia->endereco;
            $cidade = strtolower($endereco->cidade ?? '');
            $categoria = match (true) {
                str_contains(strtolower($nome), 'visão') => 'Visagismo',
                str_contains(strtolower($nome), 'mw') || str_contains(strtolower($nome), 'kleber') || str_contains(strtolower($nome), 'santta') => 'Moderno',
                default => 'Clássico',
            };

            $imagem = $imagensPorBarbearia[$nome] ?? null;
            if (! $imagem) {
                $imagem = $cidade === 'sjc'
                    ? '/barbearias/sjc/ocimar hair.jpeg'
                    : '/barbearias/jacarei/mrcutts.jpeg';
            }

            return [
                'id' => $barbearia->id_Barbearia,
                'nome' => $barbearia->nome,
                'cidade' => $cidade ?: null,
                'categoria' => $categoria,
                'cep' => $endereco->CEP ?? null,
                'num' => $endereco->num ?? null,
                'rua' => $endereco->rua ?? null,
                'bairro' => $endereco->bairro ?? null,
                'estado' => $endereco->estado ?? null,
                'imagem' => $imagem,
            ];
        }));
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'cep' => 'required|string|max:20',
            'num' => 'required|string|max:20',
            'rua' => 'required|string|max:100',
            'bairro' => 'required|string|max:100',
            'cidade' => 'required|string|max:100',
            'estado' => 'required|string|max:2',
        ]);

        $endereco = Endereco::create([
            'CEP' => $request->cep,
            'num' => $request->num,
            'rua' => $request->rua,
            'bairro' => $request->bairro,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
        ]);

        $barbearia = Barbearia::create([
            'nome' => $request->nome,
            'endereco_id_endereco' => $endereco->id_endereco,
        ]);

        return response()->json([
            'id' => $barbearia->id_Barbearia,
            'nome' => $barbearia->nome,
        ], 201);
    }

    public function update(Request $request, Barbearia $barbearia)
    {
        $request->validate([
            'nome' => 'required|string|max:100',
            'cep' => 'required|string|max:20',
            'num' => 'required|string|max:20',
            'rua' => 'required|string|max:100',
            'bairro' => 'required|string|max:100',
            'cidade' => 'required|string|max:100',
            'estado' => 'required|string|max:2',
        ]);

        $barbearia->update(['nome' => $request->nome]);
        $barbearia->endereco()->update([
            'CEP' => $request->cep,
            'num' => $request->num,
            'rua' => $request->rua,
            'bairro' => $request->bairro,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
        ]);

        return response()->json([
            'id' => $barbearia->id_Barbearia,
            'nome' => $barbearia->nome,
        ]);
    }

    public function destroy(Barbearia $barbearia)
    {
        if ($barbearia->endereco) {
            $barbearia->endereco()->delete();
        }

        $barbearia->delete();

        return response()->json(['message' => 'Barbearia removida com sucesso']);
    }
}
