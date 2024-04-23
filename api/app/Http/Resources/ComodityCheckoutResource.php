<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComodityCheckoutResource extends JsonResource
{
  public function toArray($request): array
  {
    $price = $this->whenLoaded('price') == true ? $this->comodityType->price->last() : null;
    return [
      'comodity' => [
        'id' => $this->id,
        'name' => $this->comodityType->name,
        'amount' => $this->amount,
        'seller' => $this->seller->username,
        'current_price' => $this->whenLoaded('price') == true ? $price->price : null,
        // 'supervisor' => new SupervisorResource($this->whenLoaded('supervisor')),
        'store_at' => date_format($this->updated_at, "Y-m-d")
      ]
    ];
  }
}
