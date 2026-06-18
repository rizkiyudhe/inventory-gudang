<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Supplier extends Model
{
    protected $fillable = ['name', 'contact', 'address'];

    // Relasi: Satu supplier memiliki banyak riwayat barang masuk
    public function inboundTransactions()
    {
        return $this->hasMany(InboundTransaction::class);
    }
}
