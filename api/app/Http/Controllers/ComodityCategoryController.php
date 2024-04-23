<?php

namespace App\Http\Controllers;

use App\Models\ComodityType;

class ComodityCategoryController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function index()
  {
    $category = ComodityType::select('id', 'name')->get();
    return response()->json($category, 200);
  }

  //
}
