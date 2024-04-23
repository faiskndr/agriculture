<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseCountResource extends JsonResource
{
  public function toArray($request): array
  {


    $amount = 0;

    if (isset($this->comodityCount)) {
      $uses = ComodityResource::collection($this->whenLoaded('comodityCount'));
      // dd($uses);
      foreach ($uses as $use) {
        if ($use->status == 'store' || $use->status == 'available') {
          $amount += $use->amount / 1000;
        }
      }
    }

    // dd($this->capacity);

    return [
      'id' => $this->id,
      'region' => $this->region->name,
      'address' => $this->address,
      'available' => $this->capacity - $amount,
      'comodity' => ComodityResource::collection($this->whenLoaded('comodity'))
    ];
  }
}
