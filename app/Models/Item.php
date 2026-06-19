<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Item extends Model
{
    use SoftDeletes; // Wajib dipanggil untuk mengaktifkan Soft Delete

    protected $fillable = ['sku', 'name', 'category_id', 'min_stock', 'current_stock', 'price'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }

    public function inboundTransactions()
    {
        return $this->hasMany(InboundTransaction::class);
    }

    public function outboundTransactions()
    {
        return $this->hasMany(OutboundTransaction::class);
    }
}
