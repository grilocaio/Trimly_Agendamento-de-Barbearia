<?php

namespace App\Http\Controllers;

use App\Models\Barbearia;
use App\Models\Endereco;
use Illuminate\Http\Request;

class BarbeariaAdminController extends Controller
{
    public function index()
    {
        $barbearias = Barbearia::with('endereco')->get();

        return view('barbearias.index', compact('barbearias'));
    }

    public function create()
    {
        return view('barbearias.create');
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

        Barbearia::create([
            'nome' => $request->nome,
            'endereco_id_endereco' => $endereco->id_endereco,
        ]);

        return redirect()->route('barbearias.index')->with('success', 'Barbearia cadastrada com sucesso!');
    }

    public function edit(Barbearia $barbearia)
    {
        return view('barbearias.edit', compact('barbearia'));
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

        $barbearia->update([
            'nome' => $request->nome,
        ]);

        $barbearia->endereco()->update([
            'CEP' => $request->cep,
            'num' => $request->num,
            'rua' => $request->rua,
            'bairro' => $request->bairro,
            'cidade' => $request->cidade,
            'estado' => $request->estado,
        ]);

        return redirect()->route('barbearias.index')->with('success', 'Barbearia atualizada com sucesso!');
    }

    public function destroy(Barbearia $barbearia)
    {
        if ($barbearia->endereco) {
            $barbearia->endereco()->delete();
        }

        $barbearia->delete();

        return redirect()->route('barbearias.index')->with('success', 'Barbearia removida com sucesso!');
    }
}
