<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\ItemsExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;
use App\Exports\InboundExport;
use App\Exports\OutboundExport;
use App\Models\InboundTransaction;
use App\Models\OutboundTransaction;

class ReportController extends Controller
{
    public function index(Request $request)
    {
        $query = Item::with('category');
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        $items = $query->latest()->paginate(15)->withQueryString();
        $categories = Category::all();

        return Inertia::render('Reports/Stok', [
            'items' => $items,
            'categories' => $categories,
            'filters' => $request->only(['category_id'])
        ]);
    }

    // METHOD EXPORT EXCEL
    public function exportExcel(Request $request)
    {
        $fileName = 'Laporan_Stok_' . date('Y-m-d') . '.xlsx';
        return Excel::download(new ItemsExport($request->category_id), $fileName);
    }

    // METHOD EXPORT PDF
    public function exportPdf(Request $request)
    {
        $query = Item::with('category');
        if ($request->filled('category_id')) {
            $query->where('category_id', $request->category_id);
        }
        $items = $query->get(); // Ambil semua data tanpa paginasi untuk dicetak

        $pdf = Pdf::loadView('Reports-Pdf.stok_pdf', compact('items'));

        return $pdf->download('Laporan_Stok_' . date('Y-m-d') . '.pdf');
    }

    // LAPORAN BARANG MASUK
    public function inbound(Request $request)
    {
        $query = InboundTransaction::with(['item', 'supplier', 'user']);
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }
        return Inertia::render('Reports/Inbound', [
            'transactions' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['start_date', 'end_date'])
        ]);
    }

    public function exportInboundExcel(Request $request)
    {
        return Excel::download(new InboundExport($request->start_date, $request->end_date), 'Laporan_Barang_Masuk.xlsx');
    }

    public function exportInboundPdf(Request $request)
    {
        $transactions = InboundTransaction::with(['item', 'supplier', 'user'])
            ->when($request->filled('start_date'), fn($q) => $q->whereBetween('date', [$request->start_date, $request->end_date]))
            ->get();
        $pdf = Pdf::loadView('Reports-Pdf.inbound_pdf', [
            'transactions' => $transactions,
            'startDate' => $request->start_date,
            'endDate' => $request->end_date
        ]);
        return $pdf->download('Laporan_Barang_Masuk.pdf');
    }

    // LAPORAN BARANG KELUAR
    public function outbound(Request $request)
    {
        $query = OutboundTransaction::with(['item', 'user']);
        if ($request->filled('start_date') && $request->filled('end_date')) {
            $query->whereBetween('date', [$request->start_date, $request->end_date]);
        }
        return Inertia::render('Reports/Outbound', [
            'transactions' => $query->latest()->paginate(15)->withQueryString(),
            'filters' => $request->only(['start_date', 'end_date'])
        ]);
    }

    public function exportOutboundExcel(Request $request)
    {
        return Excel::download(new OutboundExport($request->start_date, $request->end_date), 'Laporan_Barang_Keluar.xlsx');
    }

    public function exportOutboundPdf(Request $request)
    {
        $transactions = OutboundTransaction::with(['item', 'user'])
            ->when($request->filled('start_date'), fn($q) => $q->whereBetween('date', [$request->start_date, $request->end_date]))
            ->get();
        $pdf = Pdf::loadView('Reports-Pdf.outbound_pdf', [
            'transactions' => $transactions,
            'startDate' => $request->start_date,
            'endDate' => $request->end_date
        ]);
        return $pdf->download('Laporan_Barang_Keluar.pdf');
    }
}
