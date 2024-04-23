<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory;

    protected $guarded = ['id'];

    public function buyyer()
    {
        return $this->belongsTo(User::class, 'buyyer_id', 'id');
    }

    public function comodity()
    {
        return $this->belongsTo(Comodity::class, 'comodity_id', 'id');
    }
}
