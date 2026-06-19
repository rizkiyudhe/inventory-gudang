<?php

namespace App\Exports;

use App\Models\InboundTransaction;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class InboundExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize
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
        $query = InboundTransaction::with(['item', 'supplier', 'user']);

        if ($this->startDate && $this->endDate) {
            $query->whereBetween('date', [$this->startDate, $this->endDate]);
        }

        return $query;
    }

    public function headings(): array
    {
        return ['Tanggal', 'No. Ref / PO', 'Nama Barang', 'Supplier', 'Jumlah Masuk', 'Staf Pencatat'];
    }

    public function map($trx): array
    {
        return [
            $trx->date,
            $trx->reference_number ?? '-',
            $trx->item ? $trx->item->name : '-',
            $trx->supplier ? $trx->supplier->name : '-',
            '+' . $trx->quantity,
            $trx->user ? $trx->user->name : '-',
        ];
    }
}
