<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Invoice extends Model
{
    protected $fillable = ['invoice_number', 'destination', 'total_amount', 'date', 'user_id'];

    public function outboundTransactions()
    {
        return $this->hasMany(OutboundTransaction::class);
    }
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
