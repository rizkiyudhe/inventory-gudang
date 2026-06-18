<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class InboundTransaction extends Model
{
    protected $fillable = ['item_id', 'supplier_id', 'user_id', 'quantity', 'reference_number', 'date', 'notes'];

    public function item()
    {
        return $this->belongsTo(Item::class);
    }
    public function supplier()
    {
        return $this->belongsTo(Supplier::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
