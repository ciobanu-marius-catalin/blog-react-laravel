@extends('layouts.react-layout')
@section('content')
    <script>
        var backendData = {!!json_encode($backendData)!!};
    </script>
@endsection

