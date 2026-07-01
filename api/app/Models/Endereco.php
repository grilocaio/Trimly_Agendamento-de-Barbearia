<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Endereco extends Model
{
    protected $table = 'endereco';
    protected $primaryKey = 'id_endereco';
    public $timestamps = false;

    protected $fillable = [
        'CEP',
        'num',
        'rua',
        'bairro',
        'cidade',
        'estado',
    ];

    public function barbearias()
    {
        return $this->hasMany(Barbearia::class, 'endereco_id_endereco', 'id_endereco');
    }
}
