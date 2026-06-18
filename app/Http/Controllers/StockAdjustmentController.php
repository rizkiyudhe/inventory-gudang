<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\StockAdjustment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class StockAdjustmentController extends Controller
{
    // MENAMPILKAN RIWAYAT STOCK OPNAME
    public function index()
    {
        $adjustments = StockAdjustment::with(['item', 'user'])->latest()->paginate(10);

        return Inertia::render('StockAdjustment/Index', [
            'adjustments' => $adjustments
        ]);
    }

    // MENAMPILKAN FORM STOCK OPNAME
    public function create()
    {
        return Inertia::render('StockAdjustment/Create', [
            'items' => Item::all()
        ]);
    }

    // MENYIMPAN PENYESUAIAN STOK
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'new_stock' => 'required|integer|min:0',
            'reason' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        DB::transaction(function () use ($validated) {
            // 1. Kunci data barang
            $item = Item::lockForUpdate()->findOrFail($validated['item_id']);

            // 2. Simpan riwayat penyesuaian (catat stok lama dari sistem)
            StockAdjustment::create([
                'item_id' => $item->id,
                'user_id' => auth()->id(),
                'old_stock' => $item->current_stock, // Ambil stok sistem saat ini
                'new_stock' => $validated['new_stock'], // Stok fisik aktual
                'reason' => $validated['reason'],
                'date' => $validated['date'],
            ]);

            // 3. Timpa stok barang dengan stok fisik yang baru
            $item->update(['current_stock' => $validated['new_stock']]);
        });

        return redirect()->route('stock-adjustments.index');
    }
}
