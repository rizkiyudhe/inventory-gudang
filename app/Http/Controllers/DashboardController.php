<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\InboundTransaction;
use App\Models\OutboundTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;

class DashboardController extends Controller
{
    public function index()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // 1. Hitung Metrik Ringkasan
        $totalItems = Item::count();
        $inboundThisMonth = InboundTransaction::whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->sum('quantity');
        $outboundThisMonth = OutboundTransaction::whereMonth('date', $currentMonth)
            ->whereYear('date', $currentYear)
            ->sum('quantity');

        // 2. Ambil Peringatan Stok Menipis (current_stock <= min_stock)
        $lowStockItems = Item::whereColumn('current_stock', '<=', 'min_stock')
            ->with('category')
            ->limit(5)
            ->get();

        // 3. Ambil Aktivitas Terakhir (5 Transaksi Masuk & 5 Keluar Terbaru)
        $recentInbounds = InboundTransaction::with('item', 'user')->latest()->limit(5)->get();
        $recentOutbounds = OutboundTransaction::with('item', 'user')->latest()->limit(5)->get();

        return Inertia::render('Dashboard', [
            'metrics' => [
                'total_items' => $totalItems,
                'inbound_month' => (int) $inboundThisMonth,
                'outbound_month' => (int) $outboundThisMonth,
            ],
            'low_stock_items' => $lowStockItems,
            'recent_inbounds' => $recentInbounds,
            'recent_outbounds' => $recentOutbounds,
        ]);
    }
}
