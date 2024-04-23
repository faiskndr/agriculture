<?php

namespace App\Http\Controllers;

use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;

class AuthController extends Controller
{
  // public function __construct()
  // {
  //   $this->middleware('auth:api', ['except' => ['login']]);
  // }

  public function index()
  {
    $user = User::with('role')->find(auth()->user()->id);
    return new UserResource($user);
  }


  public function login(Request $request)
  {
    // dd($request->json('username'));
    if (!$token = Auth::attempt(['username' => $request->json('username'), 'password' => $request->json('password')])) {
      return response()->json(['message' => 'invalid credentials'], 401);
    }
    return $this->jsonResponse($token);
  }

  public function logout()
  {
    Auth::logout();
    return response()->json(['message' => 'Successfully logged out']);
  }

  protected function jsonResponse($token)
  {
    return response()->json([
      'access_token' => $token,
      'token_type' => 'bearer',
      'user' => auth()->user(),
      'expires_in' => Auth::factory()->getTTL() * 60 * 24,
    ]);
  }
}
