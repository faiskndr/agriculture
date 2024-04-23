<?php

namespace App\Http\Controllers;

use App\Http\Resources\WarehouseResource;
use App\Http\Resources\WarehouseCountResource;
use App\Models\Warehouse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class WarehouseController extends Controller
{
  /**
   * Create a new controller instance.
   *
   * @return void
   */
  public function __construct()
  {
  }

  public function index()
  {
    $warehouse = Warehouse::with('comodity')->get();
    return WarehouseCountResource::collection($warehouse);
  }

  public function countWarehouse()
  {
    $res = Warehouse::groupBy('region_id')->select('region_id', DB::raw('count(id) as total'))->get();
    return response()->json($res, 200);
  }

  public function show($id)
  {
    $data = Warehouse::with('comodityCount')->where('region_id', $id)->get();

    return WarehouseCountResource::collection($data);
  }

  public function store(Request $request)
  {
    Warehouse::create($request->all());
    return response()->json([
      'message' => 'success',
      'data' => $request->all()
    ]);
  }
}
