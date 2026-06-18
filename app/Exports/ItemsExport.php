<?php

namespace App\Exports;

use App\Models\Item;
use Maatwebsite\Excel\Concerns\FromQuery;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithMapping;
use Maatwebsite\Excel\Concerns\ShouldAutoSize;

class ItemsExport implements FromQuery, WithHeadings, WithMapping, ShouldAutoSize
{
    protected $categoryId;

    public function __construct($categoryId = null)
    {
        $this->categoryId = $categoryId;
    }

    public function query()
    {
        $query = Item::with('category');

        if ($this->categoryId) {
            $query->where('category_id', $this->categoryId);
        }

        return $query;
    }

    public function headings(): array
    {
        return [
            'SKU',
            'Nama Barang',
            'Kategori',
            'Batas Minimum',
            'Stok Tersedia',
            'Status'
        ];
    }

    public function map($item): array
    {
        return [
            $item->sku,
            $item->name,
            $item->category ? $item->category->name : '-',
            $item->min_stock,
            $item->current_stock,
            $item->current_stock <= $item->min_stock ? 'Butuh Restock' : 'Aman',
        ];
    }
}
