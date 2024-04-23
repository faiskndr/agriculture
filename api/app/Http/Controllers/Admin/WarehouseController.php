<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminWarehouseCountResource;
use App\Http\Resources\AdminWarehouseResource;
use App\Models\Region;
use App\Models\User;
use App\Models\Warehouse;
use App\Models\WarehouseManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

use function PHPUnit\Framework\isNull;

class WarehouseController extends Controller
{
    public function index()
    {
        $warehouse = Warehouse::with('comodityCount')->get();
        return AdminWarehouseCountResource::collection($warehouse)->response()->header('Content-Range', $warehouse->count());
    }

    public function store(Request $request)
    {
        // dd($request->json());
        $request->validate([
            'capacity' => 'required',
            'region_id' => 'required',
            'address' => 'required'
        ]);

        $warehouse = Warehouse::create([
            'capacity' => $request->capacity,
            'region_id' => $request->region_id,
            'address' => $request->address,
            'status' => 0,
        ]);

        if (!$warehouse) {
            return response()->json(['message' => 'Gudang gagal ditambahkan'], 400);
        }

        return response()->json([
            'message' => 'Gudang berhasil ditambahkan',
            'data' => new AdminWarehouseResource($warehouse)
        ]);
    }


    public function update(Warehouse $warehouse, Request $request)
    {
        $manager = $request->json('manager');

        $warehouse->update([
            'address' => $request->json('address'),
            'capacity' => $request->json('capacity')
        ]);

        $user = User::where('username', $manager[0]['user']['username'])->first();
        // dd($user);

        if(isNull($user)){
            User::create([
                'username' => $manager[0]['user']['username'],
                'password' => Hash::make('password'),
                'role_id' => 2,
            ]);
           WarehouseManager::create([
            'user_id'  => User::get()->last()->id,
            'warehouse_id' => $warehouse->id
           ]);
        }
        return response()->json([
            'data' => $warehouse
        ]);
    }

    public function show($id)
    {
        $warehouse = Warehouse::with(['comodity', 'manager'])->find($id);
        return new AdminWarehouseResource($warehouse);
    }


    public function remove(Warehouse $warehouse) {
        $warehouse->delete();

        return response()->json([
            'message'=>'berhasil hapus'
        ]);
    }

    public function region()
    {
        $region = Region::all();

        return response()->json($region, 200);
    }
}
