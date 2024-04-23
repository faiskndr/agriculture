<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminWarehouseCountResource extends JsonResource
{
  public function toArray($request): array
  {
    JsonResource::withoutWrapping();
    $amount = 0;

    if (isset($this->comodityCount)) {
      $uses = ComodityResource::collection($this->whenLoaded('comodityCount'));
      foreach ($uses as $use) {
        if ($use->status == 'store') {
          $amount += $use->amount / 1000;
        }
      }
    }

    return [
      'id' => $this->id,
      'region' => $this->region->name,
      'address' => $this->address,
      'available' => $this->capacity - $amount,
      'comodity' => ComodityResource::collection($this->whenLoaded('comodity'))
    ];
  }
}
