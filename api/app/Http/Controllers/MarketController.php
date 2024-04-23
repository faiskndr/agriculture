<?php

namespace App\Http\Controllers;

use App\Http\Resources\WarehouseResource;
use App\Http\Resources\WarehouseDetailResource;
use App\Models\Comodity;
use App\Models\Transaction;
use App\Models\Warehouse;
use Illuminate\Http\Request;

class MarketController extends Controller
{
    public function index()
    {
        $warehouse = Warehouse::with(['comodity' => function ($query) {
            $query->where('status', 'available');
        }, 'comodity.comodityType.price'])->get();

        return WarehouseResource::collection($warehouse);
    }

    public function show($id, Request $request)
    {
        // dd($request->q);

        $warehouse = Warehouse::where('id', $id)->with(['comodity' => function ($query) {
            $query->where('status', 'available');
        }, 'comodity.comodityType.price']);

        if ($request->q != "null") {
            $warehouse->with(['comodity.comodityType' => function ($query) use ($request) {
                $query->where('name', 'LIKE', '%' . $request->q . '%');
            }]);
            // dd($warehouse->get());
        }


        return WarehouseDetailResource::collection($warehouse->get());
    }

    public function checkout(Request $request)
    {
        $transaction = Transaction::create([
            'buyyer_id' => auth()->user()->id,
            'comodity_id' => $request->json('comodity_id'),
            'qty' => $request->json('qty'),
            'total' => $request->json('total'),
        ]);

        $comodity = Comodity::find($transaction->comodity_id);
        $comodity->amount -= $transaction->qty;
        if ($comodity->amount == 0) {
            $comodity->status = 'sold';
        }
        $comodity->save();

        return response()->json(['message' => 'Transaction success'], 200);
    }

    public function buyComodity() {
        $id = auth()->user()->id;
        $comodity = Transaction::where('buyyer_id',$id)->with(['buyyer','comodity.comodityType'])->get();

        return response()->json([
            'data'=>$comodity
        ]);
    }
}
