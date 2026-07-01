<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TrimlySeeder extends Seeder
{
    public function run(): void
    {
        DB::table('Cargo')->insert([
            ['ID_Cargo' => 1, 'Cargos' => 'Cliente'],
            ['ID_Cargo' => 2, 'Cargos' => 'Barbeiro'],
            ['ID_Cargo' => 3, 'Cargos' => 'Administrador'],
        ]);

        DB::table('Horario_Funcionamento')->insert([
            ['Horario' => '08:00:00'], ['Horario' => '08:30:00'], ['Horario' => '09:00:00'], ['Horario' => '09:30:00'],
            ['Horario' => '10:00:00'], ['Horario' => '10:30:00'], ['Horario' => '11:00:00'], ['Horario' => '11:30:00'],
            ['Horario' => '13:00:00'], ['Horario' => '13:30:00'], ['Horario' => '14:00:00'], ['Horario' => '14:30:00'],
            ['Horario' => '15:00:00'], ['Horario' => '15:30:00'], ['Horario' => '16:00:00'], ['Horario' => '16:30:00'],
            ['Horario' => '17:00:00'], ['Horario' => '17:30:00'],
        ]);

        DB::table('endereco')->insert([
            ['id_endereco' => 1, 'CEP' => '12345-678', 'num' => 150, 'rua' => 'Av. Central', 'bairro' => 'Centro', 'cidade' => 'São José dos Campos', 'estado' => 'SP'],
            ['id_endereco' => 2, 'CEP' => '98765-432', 'num' => 84, 'rua' => 'Rua das Barbearias', 'bairro' => 'Vila Nova', 'cidade' => 'Jacareí', 'estado' => 'SP'],
        ]);

        DB::table('Barbearia')->insert([
            ['id_Barbearia' => 1, 'nome' => 'Trimly Premium - Centro', 'endereco_id_endereco' => 1],
            ['id_Barbearia' => 2, 'nome' => 'Trimly Express - Vila Nova', 'endereco_id_endereco' => 2],
        ]);

        DB::table('Usuario')->insert([
            ['idUsuario' => 1, 'Nome_Usuario' => 'Carlos Admin Geral', 'email' => 'admin.geral@trimly.com', 'senha' => 'admin123', 'telefone' => '12999999991', 'ID_Cargo' => 3, 'Barbearia_id_Barbearia' => null, 'Barbearia_endereco_id_endereco' => null, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 9, 'Nome_Usuario' => 'Marcos Admin Regional', 'email' => 'marcos.regional@trimly.com', 'senha' => 'marcos123', 'telefone' => '12999999999', 'ID_Cargo' => 3, 'Barbearia_id_Barbearia' => null, 'Barbearia_endereco_id_endereco' => null, 'id_barbearia_admin' => 2, 'id_endereco_barbearia_admin' => 2],
            ['idUsuario' => 2, 'Nome_Usuario' => 'Henrique Barbeiro', 'email' => 'henrique@trimly.com', 'senha' => 'barbeiro123', 'telefone' => '12999999992', 'ID_Cargo' => 2, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 3, 'Nome_Usuario' => 'Thales Barbeiro', 'email' => 'thales@trimly.com', 'senha' => 'barbeiro456', 'telefone' => '12999999993', 'ID_Cargo' => 2, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 10, 'Nome_Usuario' => 'Fábio Barbeiro Novaes', 'email' => 'fabio@trimly.com', 'senha' => 'barbeiro789', 'telefone' => '12988888881', 'ID_Cargo' => 2, 'Barbearia_id_Barbearia' => 2, 'Barbearia_endereco_id_endereco' => 2, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 11, 'Nome_Usuario' => 'Gabriel Barbeiro Lima', 'email' => 'gabriel@trimly.com', 'senha' => 'barbeiro012', 'telefone' => '12988888882', 'ID_Cargo' => 2, 'Barbearia_id_Barbearia' => 2, 'Barbearia_endereco_id_endereco' => 2, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 4, 'Nome_Usuario' => 'Kawan Cliente', 'email' => 'kawan@email.com', 'senha' => 'cliente123', 'telefone' => '12999999994', 'ID_Cargo' => 1, 'Barbearia_id_Barbearia' => null, 'Barbearia_endereco_id_endereco' => null, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 5, 'Nome_Usuario' => 'Jean Cliente', 'email' => 'jean@email.com', 'senha' => 'cliente456', 'telefone' => '12999999995', 'ID_Cargo' => 1, 'Barbearia_id_Barbearia' => null, 'Barbearia_endereco_id_endereco' => null, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 6, 'Nome_Usuario' => 'Lucas Oliveira', 'email' => 'lucas@email.com', 'senha' => 'cliente789', 'telefone' => '12999999996', 'ID_Cargo' => 1, 'Barbearia_id_Barbearia' => null, 'Barbearia_endereco_id_endereco' => null, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 7, 'Nome_Usuario' => 'Bruno Costa', 'email' => 'bruno@email.com', 'senha' => 'clienteabc', 'telefone' => '12999999997', 'ID_Cargo' => 1, 'Barbearia_id_Barbearia' => null, 'Barbearia_endereco_id_endereco' => null, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
            ['idUsuario' => 8, 'Nome_Usuario' => 'Felipe Almeida', 'email' => 'felipe@email.com', 'senha' => 'clientexyz', 'telefone' => '12999999998', 'ID_Cargo' => 1, 'Barbearia_id_Barbearia' => null, 'Barbearia_endereco_id_endereco' => null, 'id_barbearia_admin' => null, 'id_endereco_barbearia_admin' => null],
        ]);

        DB::table('Cortes')->insert([
            ['idCortes' => 1, 'descCorte' => 'Corte de Cabelo Degradê', 'valor' => 45.00],
            ['idCortes' => 2, 'descCorte' => 'Barba Completa com Toalha Quente', 'valor' => 35.00],
            ['idCortes' => 3, 'descCorte' => 'Combo: Cabelo e Barba', 'valor' => 70.00],
        ]);

        DB::table('Agenda')->insert([
            ['idUsuario_Cliente' => 4, 'idUsuario_Barbeiro' => 2, 'idCortes' => 1, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-15', 'idHorario' => 3, 'Status' => 'Agendado'],
            ['idUsuario_Cliente' => 5, 'idUsuario_Barbeiro' => 2, 'idCortes' => 2, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-15', 'idHorario' => 4, 'Status' => 'Agendado'],
            ['idUsuario_Cliente' => 4, 'idUsuario_Barbeiro' => 3, 'idCortes' => 3, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-15', 'idHorario' => 3, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 4, 'idUsuario_Barbeiro' => 2, 'idCortes' => 1, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-16', 'idHorario' => 5, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 6, 'idUsuario_Barbeiro' => 2, 'idCortes' => 2, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-16', 'idHorario' => 6, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 7, 'idUsuario_Barbeiro' => 2, 'idCortes' => 3, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-16', 'idHorario' => 7, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 5, 'idUsuario_Barbeiro' => 3, 'idCortes' => 1, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-16', 'idHorario' => 3, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 8, 'idUsuario_Barbeiro' => 3, 'idCortes' => 3, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-16', 'idHorario' => 4, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 4, 'idUsuario_Barbeiro' => 3, 'idCortes' => 2, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-16', 'idHorario' => 11, 'Status' => 'Agendado'],
            ['idUsuario_Cliente' => 7, 'idUsuario_Barbeiro' => 3, 'idCortes' => 1, 'Barbearia_id_Barbearia' => 1, 'Barbearia_endereco_id_endereco' => 1, 'Data_Corte' => '2026-06-17', 'idHorario' => 3, 'Status' => 'Cancelado'],
            ['idUsuario_Cliente' => 4, 'idUsuario_Barbeiro' => 10, 'idCortes' => 1, 'Barbearia_id_Barbearia' => 2, 'Barbearia_endereco_id_endereco' => 2, 'Data_Corte' => '2026-06-16', 'idHorario' => 3, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 5, 'idUsuario_Barbeiro' => 10, 'idCortes' => 1, 'Barbearia_id_Barbearia' => 2, 'Barbearia_endereco_id_endereco' => 2, 'Data_Corte' => '2026-06-16', 'idHorario' => 4, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 6, 'idUsuario_Barbeiro' => 11, 'idCortes' => 3, 'Barbearia_id_Barbearia' => 2, 'Barbearia_endereco_id_endereco' => 2, 'Data_Corte' => '2026-06-16', 'idHorario' => 5, 'Status' => 'Concluído'],
            ['idUsuario_Cliente' => 7, 'idUsuario_Barbeiro' => 11, 'idCortes' => 2, 'Barbearia_id_Barbearia' => 2, 'Barbearia_endereco_id_endereco' => 2, 'Data_Corte' => '2026-06-16', 'idHorario' => 6, 'Status' => 'Agendado'],
        ]);
    }
}
