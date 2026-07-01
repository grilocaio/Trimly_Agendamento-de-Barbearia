<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('Cargo', function (Blueprint $table) {
            $table->increments('ID_Cargo');
            $table->string('Cargos', 45)->unique();
        });

        Schema::create('Horario_Funcionamento', function (Blueprint $table) {
            $table->increments('idHorario');
            $table->time('Horario')->unique();
        });

        Schema::create('endereco', function (Blueprint $table) {
            $table->increments('id_endereco');
            $table->string('CEP', 11);
            $table->integer('num');
            $table->string('rua', 45);
            $table->string('bairro', 45);
            $table->string('cidade', 45);
            $table->string('estado', 45);
        });

        Schema::create('Barbearia', function (Blueprint $table) {
            $table->increments('id_Barbearia');
            $table->string('nome', 100);
            $table->unsignedInteger('endereco_id_endereco');
            $table->foreign('endereco_id_endereco')->references('id_endereco')->on('endereco')->onUpdate('cascade')->name('barbearia_endereco_fk');
        });

        Schema::create('Usuario', function (Blueprint $table) {
            $table->increments('idUsuario');
            $table->string('Nome_Usuario', 100);
            $table->string('email', 100)->unique();
            $table->string('senha', 255);
            $table->string('telefone', 20)->nullable();
            $table->unsignedInteger('ID_Cargo');
            $table->unsignedInteger('Barbearia_id_Barbearia')->nullable();
            $table->unsignedInteger('Barbearia_endereco_id_endereco')->nullable();
            $table->unsignedInteger('id_barbearia_admin')->nullable();
            $table->unsignedInteger('id_endereco_barbearia_admin')->nullable();

            $table->foreign('ID_Cargo')->references('ID_Cargo')->on('Cargo')->onUpdate('cascade')->name('usuario_cargo_fk');
            $table->foreign('Barbearia_id_Barbearia')->references('id_Barbearia')->on('Barbearia')->nullOnDelete()->onUpdate('cascade')->name('usuario_barbearia_fk');
            $table->foreign('Barbearia_endereco_id_endereco')->references('id_endereco')->on('endereco')->nullOnDelete()->onUpdate('cascade')->name('usuario_barbearia_endereco_fk');
            $table->foreign('id_barbearia_admin')->references('id_Barbearia')->on('Barbearia')->nullOnDelete()->onUpdate('cascade')->name('usuario_admin_barbearia_fk');
            $table->foreign('id_endereco_barbearia_admin')->references('id_endereco')->on('endereco')->nullOnDelete()->onUpdate('cascade')->name('usuario_admin_endereco_fk');
        });

        Schema::create('Cortes', function (Blueprint $table) {
            $table->increments('idCortes');
            $table->string('descCorte', 100);
            $table->double('valor');
        });

        Schema::create('Agenda', function (Blueprint $table) {
            $table->increments('idAgenda');
            $table->unsignedInteger('idUsuario_Cliente');
            $table->unsignedInteger('idUsuario_Barbeiro');
            $table->unsignedInteger('idCortes');
            $table->unsignedInteger('Barbearia_id_Barbearia');
            $table->unsignedInteger('Barbearia_endereco_id_endereco');
            $table->date('Data_Corte');
            $table->unsignedInteger('idHorario');
            $table->string('Status', 45)->default('Agendado');

            $table->unique(['idUsuario_Barbeiro', 'Data_Corte', 'idHorario'], 'uq_agenda_barbeiro_horario');
            $table->index('Status', 'idx_agenda_status');
            $table->index('Data_Corte', 'idx_agenda_data');

            $table->foreign('idUsuario_Cliente')->references('idUsuario')->on('Usuario')->cascadeOnDelete()->onUpdate('cascade')->name('agenda_cliente_fk');
            $table->foreign('idUsuario_Barbeiro')->references('idUsuario')->on('Usuario')->restrictOnDelete()->onUpdate('cascade')->name('agenda_barbeiro_fk');
            $table->foreign('idCortes')->references('idCortes')->on('Cortes')->restrictOnDelete()->onUpdate('cascade')->name('agenda_corte_fk');
            $table->foreign(['Barbearia_id_Barbearia', 'Barbearia_endereco_id_endereco'])->references(['id_Barbearia', 'endereco_id_endereco'])->on('Barbearia')->restrictOnDelete()->onUpdate('cascade')->name('agenda_barbearia_fk');
            $table->foreign('idHorario')->references('idHorario')->on('Horario_Funcionamento')->restrictOnDelete()->onUpdate('cascade')->name('agenda_horario_fk');
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('Agenda');
        Schema::dropIfExists('Cortes');
        Schema::dropIfExists('Usuario');
        Schema::dropIfExists('Barbearia');
        Schema::dropIfExists('endereco');
        Schema::dropIfExists('Horario_Funcionamento');
        Schema::dropIfExists('Cargo');
    }
};
