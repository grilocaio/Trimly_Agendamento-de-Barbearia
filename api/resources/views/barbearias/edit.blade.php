<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Editar Barbearia</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 30px; }
        form { background: white; max-width: 500px; margin: auto; padding: 24px; border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.08); }
        input, button { width: 100%; padding: 10px; margin-top: 8px; margin-bottom: 12px; }
        button { background: #b91c1c; color: white; border: none; cursor: pointer; }
    </style>
</head>
<body>
    <form method="POST" action="{{ route('barbearias.update', $barbearia->id_Barbearia) }}">
        @csrf
        @method('PUT')

        <h2>Editar Barbearia</h2>

        <label>Nome da Barbearia</label>
        <input type="text" name="nome" value="{{ old('nome', $barbearia->nome) }}" required>

        <label>CEP</label>
        <input type="text" name="cep" value="{{ old('cep', $barbearia->endereco->CEP ?? '') }}" required>

        <label>Número</label>
        <input type="text" name="num" value="{{ old('num', $barbearia->endereco->num ?? '') }}" required>

        <label>Rua</label>
        <input type="text" name="rua" value="{{ old('rua', $barbearia->endereco->rua ?? '') }}" required>

        <label>Bairro</label>
        <input type="text" name="bairro" value="{{ old('bairro', $barbearia->endereco->bairro ?? '') }}" required>

        <label>Cidade</label>
        <input type="text" name="cidade" value="{{ old('cidade', $barbearia->endereco->cidade ?? '') }}" required>

        <label>Estado</label>
        <input type="text" name="estado" maxlength="2" value="{{ old('estado', $barbearia->endereco->estado ?? '') }}" required>

        <button type="submit">Atualizar Barbearia</button>
    </form>
</body>
</html>
