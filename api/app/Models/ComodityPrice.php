<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class ComodityPrice extends Model
{
  protected $table = 'comodity_price';

  protected $guarded = ['id'];

  function comodityType()
  {
    return $this->belongsTo(ComodityType::class, 'comodity_type_id', 'id');
  }
}
