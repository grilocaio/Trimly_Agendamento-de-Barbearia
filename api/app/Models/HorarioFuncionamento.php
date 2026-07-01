<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class HorarioFuncionamento extends Model
{
    protected $table = 'Horario_Funcionamento';
    protected $primaryKey = 'idHorario';
    public $timestamps = false;

    protected $fillable = ['Horario'];
}
