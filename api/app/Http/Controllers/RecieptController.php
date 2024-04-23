<?php

namespace App\Http\Controllers;

use App\Http\Resources\RecieptResource;
use App\Models\Comodity;
use App\Models\Reciept;
use Barryvdh\DomPDF\Facade\Pdf;

class RecieptController extends Controller
{
  public function index()
  {
    $id = auth()->user()->id;
    $reciept = Comodity::with('reciept')->where('user_id', $id)->get();
    // $reciept = Reciept::with(['comodity' => function ($query) use ($id) {
    //   $query->where('user_id', $id);
    // }])->get();
    // dd($reciept);
    return RecieptResource::collection($reciept);
  }

  public function printPdf($id) {
    $reciept = Reciept::with(['comodity.seller','comodity.comodityType'])->where('id',$id)->get();

    $pdf = PDF::loadview('reciept_pdf',['reciept'=>$reciept]);

    return $pdf->stream();
  }
}
