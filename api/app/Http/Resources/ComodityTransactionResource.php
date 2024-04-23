<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ComodityTransactionResource extends JsonResource
{
    // public static $wrap = 'childern';
    
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->comodityType->name,
            'children' => $this->transactions
        ];
    }
}
