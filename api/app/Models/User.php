<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * A tabela associada ao model.
     * Aponta para a tabela "Usuario" já existente no banco mydb.
     */
    protected $table = 'Usuario';

    /**
     * A chave primária da tabela.
     */
    protected $primaryKey = 'idUsuario';

    /**
     * Indica que a tabela não possui colunas created_at/updated_at.
     */
    public $timestamps = false;

    /**
     * Os atributos que podem ser preenchidos em massa.
     */
    protected $fillable = [
        'Nome_Usuario',
        'email',
        'senha',
        'telefone',
        'ID_Cargo',
        'Barbearia_id_Barbearia',
        'Barbearia_endereco_id_endereco',
        'id_barbearia_admin',
        'id_endereco_barbearia_admin',
    ];

    /**
     * Os atributos que devem ser ocultados na serialização (JSON).
     */
    protected $hidden = [
        'senha',
    ];

    /**
     * Sobrescreve o método do Authenticatable para usar a coluna "senha"
     * em vez da coluna padrão "password".
     */
    public function getAuthPassword()
    {
        return $this->senha;
    }

    // ── Relacionamentos ──

    public function cargo()
    {
        return $this->belongsTo(Cargo::class, 'ID_Cargo', 'ID_Cargo');
    }

    public function agendamentosComoCliente()
    {
        return $this->hasMany(Agenda::class, 'idUsuario_Cliente', 'idUsuario');
    }

    public function agendamentosComoBarbeiro()
    {
        return $this->hasMany(Agenda::class, 'idUsuario_Barbeiro', 'idUsuario');
    }
}
