<?php

namespace Tests\Feature;

use Tests\TestCase;

class AuthControllerTest extends TestCase
{
    public function test_index_usuarios_filtra_por_email_quando_parametro_eh_enviado(): void
    {
        $response = $this->getJson('/api/usuarios?email=kawan2@gmail.com');

        $response->assertOk();
        $response->assertExactJson([]);
    }
}
