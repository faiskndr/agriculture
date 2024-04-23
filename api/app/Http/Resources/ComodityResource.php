<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComodityResource extends JsonResource
{
  public function toArray($request): array
  {
    // dd($this->price);
    $price = $this->whenLoaded('price') == true ? $this->comodityType->price->last() : null;
    return [
      'comodity' => [
        'id' => $this->id,
        'user_id' => $this->user_id,
        'name' => $this->whenNotNull($this->comodityType->name),
        'amount' => $this->amount,
        'status' => $this->status,
        'price' => $this->whenNotNull($this->price),
        'current_price' => $this->whenLoaded('price') == true ? $price->price : null,
        'ratio' =>$this->price == 0?0 : round(($price->price - $this->price) / $this->price * 100, 2),
        'supervisor' => new SupervisorResource($this->whenLoaded('supervisor')),
        'warehouse' => new WarehouseResource($this->whenLoaded('warehouse')),
        'request_at' => date_format($this->created_at, "Y-m-d"),
        'store_at' => date_format($this->updated_at, "Y-m-d")
      ]
    ];
  }
}
