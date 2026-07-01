<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class BarbeariaApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_update_and_delete_barbearia_via_api(): void
    {
        $response = $this->postJson('/api/barbearias', [
            'nome' => 'Barbearia Teste',
            'cep' => '12345-678',
            'num' => '100',
            'rua' => 'Rua Teste',
            'bairro' => 'Centro',
            'cidade' => 'Jacareí',
            'estado' => 'SP',
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('nome', 'Barbearia Teste');

        $id = $response->json('id');

        $this->assertDatabaseHas('Barbearia', [
            'id_Barbearia' => $id,
            'nome' => 'Barbearia Teste',
        ]);

        $updateResponse = $this->putJson('/api/barbearias/' . $id, [
            'nome' => 'Barbearia Atualizada',
            'cep' => '12345-678',
            'num' => '101',
            'rua' => 'Rua Atualizada',
            'bairro' => 'Centro',
            'cidade' => 'São José dos Campos',
            'estado' => 'SP',
        ]);

        $updateResponse->assertStatus(200)
            ->assertJsonPath('nome', 'Barbearia Atualizada');

        $deleteResponse = $this->deleteJson('/api/barbearias/' . $id);

        $deleteResponse->assertStatus(200);

        $this->assertDatabaseMissing('Barbearia', [
            'id_Barbearia' => $id,
        ]);
    }
}
