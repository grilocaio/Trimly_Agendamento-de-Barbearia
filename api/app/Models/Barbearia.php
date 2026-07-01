<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Barbearia extends Model
{
    protected $table = 'Barbearia';
    protected $primaryKey = 'id_Barbearia';
    public $timestamps = false;

    protected $fillable = [
        'nome',
        'endereco_id_endereco',
    ];

    public function endereco()
    {
        return $this->belongsTo(Endereco::class, 'endereco_id_endereco', 'id_endereco');
    }

    public function barbeiros()
    {
        return $this->hasMany(User::class, 'Barbearia_id_Barbearia', 'id_Barbearia');
    }

    public function agendamentos()
    {
        return $this->hasMany(Agenda::class, 'Barbearia_id_Barbearia', 'id_Barbearia');
    }
}
