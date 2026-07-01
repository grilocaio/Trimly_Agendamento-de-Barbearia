<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Cargo extends Model
{
    protected $table = 'Cargo';
    protected $primaryKey = 'ID_Cargo';
    public $timestamps = false;

    protected $fillable = ['Cargos'];

    public function usuarios()
    {
        return $this->hasMany(User::class, 'ID_Cargo', 'ID_Cargo');
    }
}
