<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Supplier;
use App\Models\InboundTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class InboundController extends Controller
{
    // MENAMPILKAN RIWAYAT BARANG MASUK
    public function index()
    {
        // Ambil data transaksi beserta relasi nama barang, supplier, dan staf pencatat
        $transactions = InboundTransaction::with(['item', 'supplier', 'user'])->latest()->paginate(10);

        return Inertia::render('Inbound/Index', [
            'transactions' => $transactions
        ]);
    }

    // MENAMPILKAN FORM BARANG MASUK
    public function create()
    {
        return Inertia::render('Inbound/Create', [
            'items' => Item::all(),
            'suppliers' => Supplier::all(), // Pastikan kamu sudah punya data supplier di database
        ]);
    }

    // MENYIMPAN TRANSAKSI & MENAMBAH STOK
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'supplier_id' => 'nullable|exists:suppliers,id',
            'quantity' => 'required|integer|min:1',
            'reference_number' => 'nullable|string|max:255',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        // Gunakan DB Transaction untuk integritas data
        DB::transaction(function () use ($validated) {

            // 1. Catat riwayat transaksi masuk
            InboundTransaction::create([
                'item_id' => $validated['item_id'],
                'supplier_id' => $validated['supplier_id'],
                'user_id' => auth()->id(), // Otomatis mencatat ID staf yang sedang login
                'quantity' => $validated['quantity'],
                'reference_number' => $validated['reference_number'],
                'date' => $validated['date'],
                'notes' => $validated['notes'],
            ]);

            // 2. Kunci baris barang ini, lalu tambah stoknya (Pessimistic Locking)
            $item = Item::lockForUpdate()->find($validated['item_id']);
            $item->increment('current_stock', $validated['quantity']);
        });

        return redirect()->route('inbound.index');
    }
}
