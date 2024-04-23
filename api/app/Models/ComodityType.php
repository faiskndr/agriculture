<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class ComodityType extends Model
{
  protected $table = 'comodity_type';

  public function price()
  {
    return $this->hasMany(ComodityPrice::class, 'comodity_type_id', 'id');
  }
}
