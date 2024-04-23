<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\AdminComodityResource;
use App\Models\Comodity;
use App\Models\Reciept;
use App\Models\WarehouseManager;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ComodityController extends Controller
{

    public function index(Request $request)
    {
        // dd(json_decode($request->sort));
        $filter = json_decode($request->filter);
        $supervisor_id = auth()->user()->id;
        $sort = json_decode($request->sort);
        // dd($supervisor_id);
        $warehouse = WarehouseManager::where('user_id', $supervisor_id)->get();

        if (sizeof($warehouse) == 0) {
            return response('', 404, ['Content-Range' => 0]);
        }

        $comodity = Comodity::where('warehouse_id', $warehouse[0]->warehouse_id)->with('warehouse')->orderBy($sort == null ? 'id' : $sort[0], $sort == null ? 'asc' : $sort[1]);

        if (!empty($filter->q)) {
            $comodity->with(['comodityType' => function ($query) use ($filter) {
                $query->where('name', 'LIKE', '%' . $filter->q . '%');
            }]);
            // dd($comodity);
        }

        return (AdminComodityResource::collection($comodity->get()))->response()->header(
            'Content-Range',
            $comodity->count()
        );
    }

    public function show(Comodity $comodity)
    {
        return new AdminComodityResource($comodity);
    }

    public function update(Comodity $comodity, Request $request)
    {
        $comodity->update([
            'amount' => $request->amount,
            'supervisor_id' => auth()->user()->id,
            'status' => $request->status,
            'price' => $request->price,
        ]);
        $reciept = Reciept::create([
            'comodity_id' => $comodity->id,
            'amount' => $comodity->amount,
            'storage_cost' => $comodity->amount * 150
        ]);
        return response()->json($comodity, 200);
    }

    public function delete(Comodity $comodity)
    {
        $comodity->delete();

        return response()->json(['message' => 'data dihapus'], 200);
    }


    public function count()
    {
        $supervisor_id = auth()->user()->id;
        $warehouse = WarehouseManager::where('user_id', $supervisor_id)->get();


        $comodity = Comodity::where('warehouse_id', $warehouse[0]->warehouse_id)->select('status', DB::raw('count(id) as total'))->groupBy('status')->get();

        return response()->json($comodity, 200);
    }
}
