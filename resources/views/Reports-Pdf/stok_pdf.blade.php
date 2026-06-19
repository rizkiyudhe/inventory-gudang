<!DOCTYPE html>
<html>
<head>
    <title>Laporan Posisi Stok Gudang</title>
    <style>
        body { font-family: Arial, sans-serif; font-size: 12px; color: #333; }
        .header { text-align: center; margin-bottom: 20px; border-bottom: 2px solid #333; padding-bottom: 10px; }
        .header h2 { margin: 0; padding: 0; font-size: 18px; }
        .date { font-size: 10px; color: #666; margin-top: 5px; }
        table { width: 100%; border-collapse: collapse; margin-top: 15px; }
        th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
        th { background-color: #f3f4f6; font-weight: bold; text-transform: uppercase; font-size: 11px;}
        .text-center { text-align: center; }
        .text-red { color: #dc2626; font-weight: bold; }
        .badge-red { background-color: #fee2e2; color: #991b1b; padding: 3px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
        .badge-green { background-color: #dcfce3; color: #166534; padding: 3px 6px; border-radius: 4px; font-size: 10px; font-weight: bold; }
    </style>
</head>
<body>
    <div class="header">
        <h2>LAPORAN POSISI STOK GUDANG</h2>
        <div class="date">Dicetak pada: {{ \Carbon\Carbon::now()->translatedFormat('d F Y - H:i') }} WIB</div>
    </div>

    <table>
        <thead>
            <tr>
                <th>SKU</th>
                <th>Nama Barang</th>
                <th>Kategori</th>
                <th class="text-center">Batas Min</th>
                <th class="text-center">Stok Saat Ini</th>
                <th class="text-center">Status</th>
            </tr>
        </thead>
        <tbody>
            @forelse($items as $item)
                @php $isLowStock = $item->current_stock <= $item->min_stock; @endphp
                <tr>
                    <td style="font-family: monospace;">{{ $item->sku }}</td>
                    <td><strong>{{ $item->name }}</strong></td>
                    <td>{{ $item->category ? $item->category->name : '-' }}</td>
                    <td class="text-center">{{ $item->min_stock }}</td>
                    <td class="text-center @if($isLowStock) text-red @endif">
                        {{ $item->current_stock }}
                    </td>
                    <td class="text-center">
                        @if($isLowStock)
                            <span class="badge-red">RESTOCK</span>
                        @else
                            <span class="badge-green">AMAN</span>
                        @endif
                    </td>
                </tr>
            @empty
                <tr>
                    <td colspan="6" class="text-center" style="padding: 20px; color: #666;">
                        Tidak ada data stok barang yang sesuai dengan filter.
                    </td>
                </tr>
            @endforelse
        </tbody>
    </table>
</body>
</html>