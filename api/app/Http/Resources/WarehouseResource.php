<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class WarehouseResource extends JsonResource
{
  public function toArray($request): array
  {
    // dd($this->whenLoaded('comodity'));

    return [
      'id' => $this->id,
      'region' => $this->region->name,
      'address' => $this->address,
      'comodity' => ComodityResource::collection($this->whenLoaded('comodity'))
    ];
  }
}
