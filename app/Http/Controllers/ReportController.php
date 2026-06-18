<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Exports\ItemsExport;
use Maatwebsite\Excel\Facades\Excel;
use Barryvdh\DomPDF\Facade\Pdf;

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

        return Inertia::render('Reports/Index', [
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

        $pdf = Pdf::loadView('reports.pdf', compact('items'));

        return $pdf->download('Laporan_Stok_' . date('Y-m-d') . '.pdf');
    }
}
