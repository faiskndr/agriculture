<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\ComodityPriceResource;
use App\Models\ComodityPrice;
use Illuminate\Http\Request;

class ComodityPriceController extends Controller
{
    public function index()
    {
        $price = ComodityPrice::with('comodityType')->get();
        // dd($price);
        return ComodityPriceResource::collection($price)->response()->header('Content-Range', $price->count());
    }

    public function store(Request $request)
    {
        ComodityPrice::create([
            'comodity_type_id' => $request->comodity_type_id,
            'price' => $request->price,
        ]);

        return response()->json(['message' => 'data ditambahkan'], 201);
    }


    public function price($id)
    {
        $comodity = ComodityPrice::where('comodity_type_id', $id)->with('comodityType')->get();

        return ComodityPriceResource::collection($comodity);
    }
}
