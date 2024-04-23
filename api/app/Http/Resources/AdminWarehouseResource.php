<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AdminWarehouseResource extends JsonResource
{
  public function toArray($request): array
  {
    JsonResource::withoutWrapping();

    return [
      'id' => $this->id,
      'region' => $this->region->name,
      'address' => $this->address,
      'capacity' => $this->capacity,
      'comodity' => ComodityResource::collection($this->whenLoaded('comodity')),
      'manager' => WarehouseManagerResource::collection($this->whenLoaded('manager'))
    ];
  }
}
