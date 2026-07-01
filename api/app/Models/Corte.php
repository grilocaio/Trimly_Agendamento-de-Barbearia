<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Corte extends Model
{
    protected $table = 'cortes';
    protected $primaryKey = 'idCortes';
    public $timestamps = false;

    protected $fillable = [
        'descCorte',
        'valor',
        'barbeariaId'
    ];

    public function agendamentos()
    {
        return $this->hasMany(Agenda::class, 'idCortes', 'idCortes');
    }
}
