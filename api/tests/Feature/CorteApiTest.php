<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class CorteApiTest extends TestCase
{
    use RefreshDatabase;

    public function test_can_create_a_corte_via_api(): void
    {
        $this->artisan('migrate');

        $response = $this->postJson('/api/cortes', [
            'descCorte' => 'Corte teste',
            'valor' => 45.50,
            'barbeariaId' => 1,
        ]);

        $response->assertStatus(201)
            ->assertJsonPath('descCorte', 'Corte teste')
            ->assertJsonPath('valor', 45.5);
    }
}
