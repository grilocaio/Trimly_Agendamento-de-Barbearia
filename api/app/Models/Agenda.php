<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Agenda extends Model
{
    protected $table = 'Agenda';
    protected $primaryKey = 'idAgenda';
    public $timestamps = false;

    protected $fillable = [
        'idUsuario_Cliente',
        'idUsuario_Barbeiro',
        'idCortes',
        'Barbearia_id_Barbearia',
        'Barbearia_endereco_id_endereco',
        'Data_Corte',
        'idHorario',
        'Status',
    ];

    // ── Relacionamentos ──

    public function cliente()
    {
        return $this->belongsTo(User::class, 'idUsuario_Cliente', 'idUsuario');
    }

    public function barbeiro()
    {
        return $this->belongsTo(User::class, 'idUsuario_Barbeiro', 'idUsuario');
    }

    public function corte()
    {
        return $this->belongsTo(Corte::class, 'idCortes', 'idCortes');
    }

    public function barbearia()
    {
        return $this->belongsTo(Barbearia::class, 'Barbearia_id_Barbearia', 'id_Barbearia');
    }

    public function horario()
    {
        return $this->belongsTo(HorarioFuncionamento::class, 'idHorario', 'idHorario');
    }
}
