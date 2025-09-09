<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <title>FLOOD RISK MAPPING SYSTEM:</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="title" content="Monitoring and Evaluation System">
    @vite('resources/css/app.css')

</head>
<body clas>
    <div class="flex flex-col h-screen">

        @include('layouts.topbar')

        <div class="flex flex-12">
            @include('layouts.sidebar')

            <main class="flex-6">
                @yield('content')
            </main>
        </div>


    @stack('scripts')

</body>
</html>
