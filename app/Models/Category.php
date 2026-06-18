<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    protected $fillable = ['name', 'description'];

    // Relasi: Satu kategori memiliki banyak barang
    public function items()
    {
        return $this->hasMany(Item::class);
    }
}
