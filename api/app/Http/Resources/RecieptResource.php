<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class RecieptResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        // $current_price = $this->comodity->comodityType->price->last();
        return [
            'id' => $this->reciept->id,
            'comodity' => $this->comodityType->name,
            'amount' => $this->reciept->amount,
            'price' => $this->whenLoaded('comodity') ? $this->price : null,
            'storage_cost' => $this->reciept->storage_cost,
        ];
    }
}
