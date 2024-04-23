<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComodityPriceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        JsonResource::withoutWrapping();

        $name = new ComodityTypeResource($this->whenLoaded('comodityType'));

        return [
            'id' => $this->id,
            'name' => $name->name,
            'price' => $this->price,
            'created_at' => date_format($this->created_at, 'Y-m-d')
        ];
    }
}
