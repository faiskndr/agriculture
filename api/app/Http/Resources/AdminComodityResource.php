<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminComodityResource extends JsonResource
{
  public function toArray($request): array
  {
    $current_price = $this->comodityType->price->last();
    JsonResource::withoutWrapping();
    return [
      'id' => $this->id,
      'name' => $this->comodityType->name,
      'amount' => $this->amount,
      'status' => $this->status,
      'price' => $current_price->price,
      'supervisor' => new SupervisorResource($this->whenLoaded('supervisor')),
      'warehouse' => new WarehouseResource($this->whenLoaded('warehouse')),
      'created_at' => date_format($this->created_at, "Y-m-d"),
      'updated_at' => date_format($this->updated_at, "Y-m-d")
    ];
  }
}
