<?php

namespace App\Http\Controllers;

use App\Http\Resources\ComodityCheckoutResource;
use App\Models\Comodity;
use Illuminate\Http\Request;
use App\Http\Resources\ComodityResource;
use App\Http\Resources\ComodityTransactionResource;
use App\Models\ComodityType;
use App\Models\Transaction;
use App\Models\Warehouse;

class ComodityController extends Controller
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
    $id = auth()->user()->id;
    $comodity = Comodity::with('comodityType', 'warehouse', 'supervisor')->where([['status','!=','pending'],['status','!=','sold']])->where('user_id', $id)->get();
    return ComodityResource::collection($comodity);
  }


  public function show(Comodity $comodity)
  {
    return new ComodityCheckoutResource($comodity);
  }


  public function count()
  {
    $id = auth()->user()->id;
    $comodity = Comodity::where('user_id', $id)->get();
    $buy = Transaction::where('buyyer_id', $id)->get();
    $req = $comodity->count();
    $accepted = $comodity->where('status', 'store')->count();
    $sale = $comodity->where('status', 'available')->count();
    $countReciept = 0;
    $countTransactions = 0;
    $countBuy = 0;
    $income = 0;

    foreach ($buy as $b) {
      $countBuy += 1;
    }

    foreach ($comodity as $transaction) {
      // dd($transaction->transactions);
      foreach ($transaction->transactions as $val) {
        if ($val->comodity_id == $transaction->id) {
          $countTransactions += 1;
          $income += $val->total;
        }
      }
    }

    foreach ($comodity as $reciept) {
      // dd($reciept);
      if ($reciept->reciept != null) {
        $countReciept += 1;
        if ($reciept->amount == 0) {
          $income -= $reciept->reciept->storage_cost;
        }
      }
    }
    $data = [
      'request' => $req,
      'accepted' => $accepted,
      'sale' => $sale,
      'reciept' => $countReciept,
      'transactions' => $countTransactions,
      'income' => $income,
      'buy' => $countBuy
    ];
    return response()->json($data, 200);
  }

  public function store(Request $request)
  {
    // dd($request->json()->all());
    // $this->validate($request, [
    //   'amount' => 'required',
    //   'type_id' => 'required|exists:App\Models\ComodityType,id',
    //   'warehouse_id' => 'required|exists:App\Models\Warehouse,id'
    // ]);

    if (!Comodity::create([
      'amount' => $request->json('amount'),
      'user_id' => auth()->user()->id,
      'type_id' => $request->json('category'),
      'warehouse_id' => $request->json('selectWarehouse'),
    ])) {
      return response()->json([
        'message' => 'failed to request'
      ], 405);
    }
    return response()->json([
      'user' => auth()->user(),
      'comodity' => $request->all()
    ], 201);
  }


  public function update(Comodity $comodity, Request $request)
  {
    if (!$comodity) {
      return response()->json(['message' => 'no record found'], 404);
    }
    $comodity->update([
      'status' => $request->json('status')
    ]);
    return response()->json($comodity, 200);
  }


  public function list()
  {
    $category = ComodityType::all();

    return response()->json($category, 200);
  }

  public function transactions()
  {
    $id = auth()->user()->id;
    $transaction = Comodity::where('user_id', $id)->where('status', 'sold')->with('transactions')->get();
    // dd($transaction);
    return ['children'=>ComodityTransactionResource::collection($transaction)];
  }

  public function listComodity() {
    $id = auth()->user()->id;
    $comodity = Comodity::with('warehouse','comodityType')->where('user_id',$id)->get();
    return ['data'=> $comodity];
  }

}
