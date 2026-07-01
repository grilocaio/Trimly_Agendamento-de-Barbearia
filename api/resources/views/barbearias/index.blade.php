<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Barbearias</title>
    <style>
        body { font-family: Arial, sans-serif; background: #f5f5f5; padding: 24px; }
        .card { background: white; padding: 16px; border-radius: 10px; margin-bottom: 12px; box-shadow: 0 8px 24px rgba(0,0,0,.05); }
        .actions a, .actions form { display: inline-block; margin-right: 8px; }
        .btn { padding: 8px 12px; border-radius: 8px; text-decoration: none; color: white; background: #b91c1c; }
        .btn-edit { background: #2563eb; }
        .btn-delete { background: #dc2626; border: none; cursor: pointer; }
        .success { background: #dcfce7; color: #166534; padding: 10px; border-radius: 8px; margin-bottom: 12px; }
    </style>
</head>
<body>
    <h2>Barbearias cadastradas</h2>

    @if(session('success'))
        <div class="success">{{ session('success') }}</div>
    @endif

    <p><a class="btn" href="{{ route('barbearias.create') }}">+ Nova Barbearia</a></p>

    @foreach($barbearias as $barbearia)
        <div class="card">
            <strong>{{ $barbearia->nome }}</strong><br>
            {{ $barbearia->endereco->rua ?? '' }}, {{ $barbearia->endereco->num ?? '' }}<br>
            {{ $barbearia->endereco->bairro ?? '' }} - {{ $barbearia->endereco->cidade ?? '' }}/{{ $barbearia->endereco->estado ?? '' }}
            <div class="actions" style="margin-top: 10px;">
                <a class="btn btn-edit" href="{{ route('barbearias.edit', $barbearia->id_Barbearia) }}">Editar</a>
                <form method="POST" action="{{ route('barbearias.destroy', $barbearia->id_Barbearia) }}" style="display:inline;">
                    @csrf
                    @method('DELETE')
                    <button class="btn btn-delete" type="submit">Excluir</button>
                </form>
            </div>
        </div>
    @endforeach
</body>
</html>
