<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class RegisterController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
    //
  }

  public function register(Request $request)
  {
    $this->validate($request, [
      'username' => 'required|unique:App\Models\User',
      'password' => 'required',
      'role_id' => 'required'
    ]);


    if (!User::create([
      'username' => $request->username,
      'password' => Hash::make($request->password),
      'role_id' => $request->role_id
    ])) {
      return response()->json([
        'errors' => [
          'failed'
        ]
      ]);
    }

    return response()->json([
      'data' => $request->all()
    ], 201);
  }
}
