@extends('layouts.login')

<title>Login</title>

@section('content')

    <main class="p-4 bg-gray-500">
        <form action="{{ route('login') }}" method="POST">
        @csrf
        <div class="flex flex-col">
            <label for="email">Email:</label>
            <input type="email" name="email" id="email">
            <label for="password">Password:</label>
            <input type="password" name="password" id="password">
            <button type="submit">Login</button>
        </div>
        </form>
    </main>

@endsection
