<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Cadastrar Barbearia</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 30px; }
        form { background: white; max-width: 500px; margin: auto; padding: 24px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.08); }
        input, button { width: 100%; padding: 10px; margin-top: 8px; margin-bottom: 12px; }
        button { background: #b91c1c; color: white; border: none; cursor: pointer; }
        .success { background: #dcfce7; color: #166534; padding: 10px; border-radius: 8px; margin-bottom: 12px; }
    </style>
</head>
<body>
    <form method="POST" action="{{ route('barbearias.store') }}">
        @csrf

        @if(session('success'))
            <div class="success">{{ session('success') }}</div>
        @endif

        <h2>Cadastrar Barbearia</h2>

        <label>Nome da Barbearia</label>
        <input type="text" name="nome" required>

        <label>CEP</label>
        <input type="text" name="cep" required>

        <label>Número</label>
        <input type="text" name="num" required>

        <label>Rua</label>
        <input type="text" name="rua" required>

        <label>Bairro</label>
        <input type="text" name="bairro" required>

        <label>Cidade</label>
        <input type="text" name="cidade" required>

        <label>Estado</label>
        <input type="text" name="estado" maxlength="2" required>

        <button type="submit">Salvar Barbearia</button>
    </form>
</body>
</html>
