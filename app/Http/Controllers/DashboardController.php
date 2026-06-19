<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\InboundTransaction;
use App\Models\OutboundTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;

class DashboardController extends Controller
{
    public function index()
    {
        $currentMonth = Carbon::now()->month;
        $currentYear = Carbon::now()->year;

        // 1. Metrik Ringkasan
        $totalItems = Item::count();
        $inboundThisMonth = InboundTransaction::whereMonth('date', $currentMonth)->whereYear('date', $currentYear)->sum('quantity');
        $outboundThisMonth = OutboundTransaction::whereMonth('date', $currentMonth)->whereYear('date', $currentYear)->sum('quantity');

        // 2. Peringatan Stok Menipis
        $lowStockItems = Item::whereColumn('current_stock', '<=', 'min_stock')->with('category')->limit(5)->get();

        // 3. Aktivitas Terakhir
        $recentInbounds = InboundTransaction::with('item', 'user')->latest()->limit(5)->get();
        $recentOutbounds = OutboundTransaction::with('item', 'user')->latest()->limit(5)->get();

        // 4. DATA GRAFIK (CHART) 7 HARI TERAKHIR
        $chartData = collect();
        $inboundData = InboundTransaction::where('date', '>=', Carbon::now()->subDays(6)->format('Y-m-d'))
            ->select('date', DB::raw('SUM(quantity) as total'))->groupBy('date')->pluck('total', 'date');

        $outboundData = OutboundTransaction::where('date', '>=', Carbon::now()->subDays(6)->format('Y-m-d'))
            ->select('date', DB::raw('SUM(quantity) as total'))->groupBy('date')->pluck('total', 'date');

        for ($i = 6; $i >= 0; $i--) {
            $dateObj = Carbon::now()->subDays($i);
            $dateString = $dateObj->format('Y-m-d');

            $chartData->push([
                'day' => strtoupper($dateObj->translatedFormat('D')), // Nama hari: SEN, SEL, dll.
                'in' => (int) ($inboundData[$dateString] ?? 0),
                'out' => (int) ($outboundData[$dateString] ?? 0),
            ]);
        }

        return Inertia::render('Dashboard', [
            'metrics' => [
                'total_items' => $totalItems,
                'inbound_month' => (int) $inboundThisMonth,
                'outbound_month' => (int) $outboundThisMonth,
            ],
            'low_stock_items' => $lowStockItems,
            'recent_inbounds' => $recentInbounds,
            'recent_outbounds' => $recentOutbounds,
            'chart_data' => $chartData,
        ]);
    }
}
