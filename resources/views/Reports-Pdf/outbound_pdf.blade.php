<!DOCTYPE html>
<html>

<head>
    <title>Laporan Barang Keluar</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            font-size: 11px;
            color: #333;
        }

        .header {
            text-align: center;
            margin-bottom: 20px;
            border-bottom: 2px solid #333;
            padding-bottom: 10px;
        }

        table {
            width: 100%;
            border-collapse: collapse;
        }

        th,
        td {
            border: 1px solid #ddd;
            padding: 6px;
            text-align: left;
        }

        th {
            background-color: #f3f4f6;
            text-transform: uppercase;
        }

        .text-center {
            text-align: center;
        }

        .text-red {
            color: #dc2626;
            font-weight: bold;
        }
    </style>
</head>

<body>
    <div class="header">
        <h2>LAPORAN MUTASI BARANG KELUAR</h2>
        <div>Periode: {{ $startDate ?? 'Semua' }} s/d {{ $endDate ?? 'Semua' }}</div>
    </div>
    <table>
        <thead>
            <tr>
                <th>Tanggal</th>
                <th>Barang</th>
                <th>Tujuan Pengiriman</th>
                <th class="text-center">Jumlah</th>
                <th>Staf</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($transactions as $trx)
                <tr>
                    <td>{{ $trx->date }}</td>
                    <td>{{ $trx->item?->name }}</td>
                    <td>{{ $trx->destination }}</td>
                    <td class="text-center text-red">-{{ $trx->quantity }}</td>
                    <td>{{ $trx->user?->name }}</td>
                </tr>
            @endforeach
        </tbody>
    </table>
</body>

</html>
