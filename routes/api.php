<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/todos', function () {
    return [
        [
            'text' => 'Go Buy Chips!',
            'completed' => false,
        ],
        [
            'text' => 'Play Games!',
            'completed' => true,
        ],
        [
            'text' => 'Sleep!',
            'completed' => false,
        ],
    ];
});

Route::post('/todos', function () {
    return response()->json(['status' => true]);
});

Route::patch('/todos/{id}', function () {
    return response()->json(['status' => true]);
});

Route::delete('/todos/{id}', function () {
    return response()->json(['status' => true]);
});