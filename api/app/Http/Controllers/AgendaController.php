<?php

namespace App\Http\Controllers;

use App\Models\Agenda;
use Illuminate\Http\Request;

class AgendaController extends Controller
{
    /**
     * GET /api/agendamentos
     *
     * Lista agendamentos. Se o usuário for Cliente, retorna apenas os dele.
     * Se for Barbeiro, retorna os agendamentos dele como barbeiro.
     * Se for Admin, retorna todos.
     */
    public function index(Request $request)
    {
        $user = $request->user();
        $user->load('cargo');
        $cargo = $user->cargo->Cargos;

        $query = Agenda::with(['cliente', 'barbeiro', 'corte', 'barbearia', 'horario']);

        if ($cargo === 'Cliente') {
            $query->where('idUsuario_Cliente', $user->idUsuario);
        } elseif ($cargo === 'Barbeiro') {
            $query->where('idUsuario_Barbeiro', $user->idUsuario);
        }
        // Admin vê todos

        $agendamentos = $query->orderBy('Data_Corte', 'desc')->get();

        return response()->json($agendamentos->map(function ($a) {
            return [
                'id'         => $a->idAgenda,
                'cliente'    => $a->cliente->Nome_Usuario ?? null,
                'barbeiro'   => $a->barbeiro->Nome_Usuario ?? null,
                'corte'      => $a->corte->descCorte ?? null,
                'valor'      => $a->corte->valor ?? null,
                'barbearia'  => $a->barbearia->nome ?? null,
                'data'       => $a->Data_Corte,
                'horario'    => $a->horario->Horario ?? null,
                'status'     => $a->Status,
            ];
        }));
    }

    /**
     * POST /api/agendamentos
     *
     * Cria um novo agendamento.
     */
    public function store(Request $request)
    {
        $request->validate([
            'idUsuario_Barbeiro'            => 'required|integer|exists:Usuario,idUsuario',
            'idCortes'                      => 'required|integer|exists:Cortes,idCortes',
            'Barbearia_id_Barbearia'        => 'required|integer',
            'Barbearia_endereco_id_endereco' => 'required|integer',
            'Data_Corte'                    => 'required|date',
            'idHorario'                     => 'required|integer|exists:Horario_Funcionamento,idHorario',
        ]);

        $user = $request->user();

        $agenda = Agenda::create([
            'idUsuario_Cliente'              => $user->idUsuario,
            'idUsuario_Barbeiro'             => $request->idUsuario_Barbeiro,
            'idCortes'                       => $request->idCortes,
            'Barbearia_id_Barbearia'         => $request->Barbearia_id_Barbearia,
            'Barbearia_endereco_id_endereco'  => $request->Barbearia_endereco_id_endereco,
            'Data_Corte'                     => $request->Data_Corte,
            'idHorario'                      => $request->idHorario,
            'Status'                         => 'Agendado',
        ]);

        $agenda->load(['cliente', 'barbeiro', 'corte', 'barbearia', 'horario']);

        return response()->json([
            'message'     => 'Agendamento criado com sucesso!',
            'agendamento' => [
                'id'        => $agenda->idAgenda,
                'cliente'   => $agenda->cliente->Nome_Usuario,
                'barbeiro'  => $agenda->barbeiro->Nome_Usuario,
                'corte'     => $agenda->corte->descCorte,
                'valor'     => $agenda->corte->valor,
                'barbearia' => $agenda->barbearia->nome,
                'data'      => $agenda->Data_Corte,
                'horario'   => $agenda->horario->Horario,
                'status'    => $agenda->Status,
            ],
        ], 201);
    }

    /**
     * GET /api/agendamentos/{id}
     *
     * Exibe um agendamento específico.
     */
    public function show(Request $request, $id)
    {
        $agenda = Agenda::with(['cliente', 'barbeiro', 'corte', 'barbearia', 'horario'])
            ->findOrFail($id);

        return response()->json([
            'id'        => $agenda->idAgenda,
            'cliente'   => $agenda->cliente->Nome_Usuario,
            'barbeiro'  => $agenda->barbeiro->Nome_Usuario,
            'corte'     => $agenda->corte->descCorte,
            'valor'     => $agenda->corte->valor,
            'barbearia' => $agenda->barbearia->nome,
            'data'      => $agenda->Data_Corte,
            'horario'   => $agenda->horario->Horario,
            'status'    => $agenda->Status,
        ]);
    }

    /**
     * PUT /api/agendamentos/{id}
     *
     * Atualiza o status de um agendamento (ex: Cancelado, Concluído).
     */
    public function update(Request $request, $id)
    {
        $request->validate([
            'Status' => 'required|string|in:Agendado,Concluído,Cancelado',
        ]);

        $agenda = Agenda::findOrFail($id);
        $agenda->update(['Status' => $request->Status]);

        return response()->json([
            'message' => 'Agendamento atualizado com sucesso!',
            'status'  => $agenda->Status,
        ]);
    }

    /**
     * DELETE /api/agendamentos/{id}
     *
     * Remove um agendamento.
     */
    public function destroy(Request $request, $id)
    {
        $agenda = Agenda::findOrFail($id);
        $agenda->delete();

        return response()->json([
            'message' => 'Agendamento removido com sucesso!',
        ]);
    }
}
