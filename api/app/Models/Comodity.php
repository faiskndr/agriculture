<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class Comodity extends Model
{
  protected $table = 'comodity';
  protected $guarded = ['id'];

  public function seller()
  {
    return $this->belongsTo(User::class, 'user_id', 'id');
  }

  public function comodityType()
  {
    return $this->belongsTo(ComodityType::class, 'type_id', 'id');
  }

  public function warehouse()
  {
    return $this->belongsTo(Warehouse::class, 'warehouse_id', 'id');
  }

  public function supervisor()
  {
    return $this->belongsTo(User::class, 'supervisor_id', 'id');
  }

  public function reciept()
  {
    return $this->hasOne(Reciept::class, 'comodity_id', 'id');
  }

  public function transactions()
  {
    return $this->hasMany(Transaction::class, 'comodity_id', 'id');
  }
}
