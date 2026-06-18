<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\OutboundTransaction;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;

class OutboundController extends Controller
{
    // MENAMPILKAN RIWAYAT BARANG KELUAR
    public function index()
    {
        $transactions = OutboundTransaction::with(['item', 'user'])->latest()->paginate(10);

        return Inertia::render('Outbound/Index', [
            'transactions' => $transactions
        ]);
    }

    // MENAMPILKAN FORM BARANG KELUAR
    public function create()
    {
        // Hanya kirim data barang yang stoknya lebih dari 0
        $items = Item::where('current_stock', '>', 0)->get();

        return Inertia::render('Outbound/Create', [
            'items' => $items,
        ]);
    }

    // MENYIMPAN TRANSAKSI & MENGURANGI STOK
    public function store(Request $request)
    {
        $validated = $request->validate([
            'item_id' => 'required|exists:items,id',
            'quantity' => 'required|integer|min:1',
            'destination' => 'required|string|max:255',
            'date' => 'required|date',
            'notes' => 'nullable|string',
        ]);

        DB::transaction(function () use ($validated) {
            // 1. Kunci baris data (Pessimistic Locking)
            $item = Item::lockForUpdate()->findOrFail($validated['item_id']);

            // 2. Validasi Ketat: Cek ketersediaan stok
            if ($item->current_stock < $validated['quantity']) {
                throw ValidationException::withMessages([
                    'quantity' => 'Stok tidak mencukupi! Sisa stok saat ini hanya: ' . $item->current_stock
                ]);
            }

            // 3. Kurangi stok
            $item->decrement('current_stock', $validated['quantity']);

            // 4. Catat riwayat barang keluar
            OutboundTransaction::create([
                'item_id' => $validated['item_id'],
                'user_id' => auth()->id(), // ID Staf yang memproses
                'quantity' => $validated['quantity'],
                'destination' => $validated['destination'],
                'date' => $validated['date'],
                'notes' => $validated['notes'],
            ]);
        });

        return redirect()->route('outbound.index');
    }
}
