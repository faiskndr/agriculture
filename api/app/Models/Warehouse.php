<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Lumen\Auth\Authorizable;

class Warehouse extends Model
{
  protected $table = 'warehouse';
  protected $guarded = ['id'];
  public $timestamps = false;

  public function region()
  {
    return $this->belongsTo(Region::class, 'region_id', 'id');
  }

  public function comodity()
  {
    return $this->hasMany(Comodity::class, 'warehouse_id', 'id');
  }

  public function comodityCount()
  {
    return $this->hasMany(Comodity::class, 'warehouse_id', 'id');
  }

  public function  manager()
  {
    return $this->hasMany(WarehouseManager::class, 'warehouse_id', 'id');
  }
}
