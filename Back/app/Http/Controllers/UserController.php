<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller{

    public function index(){
        $users = User::all();

        if ($users->isEmpty()) {
            return response()->json(['message' => 'No hay usuarios registrados.'], 404);
        }
        return response()->json($users, 200);
    }

    public function create(){
        return view('users.create');
    }

    public function store(Request $request)
    {
        // Validar los datos
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 400);
        }

        // Crear el usuario
        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Usuario creado exitosamente',
            'user' => $user
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $user = User::find($id);

        if ($user === null) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        return response()->json($user, 200);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::find($id);

        if ($user === null) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = $request->password;
        try {
            $user->save();
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }
        return response()->json(['message' => 'Usuario actualizado correctamente'], 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $user = User::find($id);

        if ($user === null) {
            return response()->json(['message' => 'Usuario no encontrado'], 404);
        }
        try {
            $user->delete();
        } catch (\Exception $e) {
            return response()->json(['message' => $e], 500);
        }
        return response()->json(['message' => 'Usuario eliminado correctamente'], 200);
    }
}
