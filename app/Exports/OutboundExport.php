<?php

namespace App\Exports;

use App\Models\OutboundTransaction;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class OutboundExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize
{
    protected $startDate;
    protected $endDate;

    public function __construct($startDate = null, $endDate = null)
    {
        $this->startDate = $startDate;
        $this->endDate = $endDate;
    }

    public function query()
    {
        $query = OutboundTransaction::with(['item', 'user']);

        if ($this->startDate && $this->endDate) {
            $query->whereBetween('date', [$this->startDate, $this->endDate]);
        }

        return $query;
    }

    public function headings(): array
    {
        return ['Tanggal', 'Nama Barang', 'Tujuan Pengiriman', 'Jumlah Keluar', 'Staf Pencatat'];
    }

    public function map($trx): array
    {
        return [
            $trx->date,
            $trx->item ? $trx->item->name : '-',
            $trx->destination,
            '-' . $trx->quantity,
            $trx->user ? $trx->user->name : '-',
        ];
    }
}
