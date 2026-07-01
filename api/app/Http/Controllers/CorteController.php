<?php

namespace App\Http\Controllers;

use App\Models\Corte;
use Illuminate\Http\Request;

class CorteController extends Controller
{
    public function index(Request $request)
    {
        $cortes = Corte::query();

        if ($request->has('barbeariaId')) {
            $cortes->where(function ($query) use ($request) {
                $query->whereNull('barbeariaId')
                    ->orWhere('barbeariaId', $request->barbeariaId);
            });
        }

        return response()->json($cortes->get()->map(function ($corte) {
            return [
                'id' => $corte->idCortes,
                'descCorte' => $corte->descCorte,
                'valor' => (float) $corte->valor,
                'barbeariaId' => $corte->barbeariaId,
            ];
        }));
    }

    public function store(Request $request)
    {
        $request->validate([
            'descCorte' => 'required|string|max:100',
            'valor' => 'required|numeric|min:0.01',
            'barbeariaId' => 'nullable|integer',
        ]);

        $corte = Corte::create([
            'descCorte' => $request->descCorte,
            'valor' => $request->valor,
            'barbeariaId' => $request->barbeariaId,
        ]);

        return response()->json([
            'id' => $corte->idCortes,
            'descCorte' => $corte->descCorte,
            'valor' => (float) $corte->valor,
            'barbeariaId' => $corte->barbeariaId,
        ], 201);
    }
}
