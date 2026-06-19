<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Invoice;
use App\Models\OutboundTransaction;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;
use Carbon\Carbon;

class OutboundController extends Controller
{
    public function index()
    {
        // Ubah index agar menampilkan daftar Invoices (Transaksi) bukan sekadar item tunggal
        $invoices = Invoice::with(['user', 'outboundTransactions.item'])->latest()->paginate(10);
        return Inertia::render('Outbound/Index', ['invoices' => $invoices]);
    }

    public function create()
    {
        // Kirim barang yang stoknya lebih dari 0 untuk dipilih di kasir
        $items = Item::where('current_stock', '>', 0)->with('category')->get();
        return Inertia::render('Outbound/Create', ['items' => $items]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'destination' => 'required|string|max:255',
            'cart' => 'required|array|min:1',
            'cart.*.id' => 'required|exists:items,id',
            'cart.*.qty' => 'required|integer|min:1',
        ]);

        DB::beginTransaction();
        try {
            // 1. Buat Header Invoice
            $invoiceNumber = 'INV-' . date('Ymd') . '-' . strtoupper(uniqid());
            $invoice = Invoice::create([
                'invoice_number' => $invoiceNumber,
                'destination' => $request->destination,
                'total_amount' => 0, // Akan dihitung ulang di bawah
                'date' => Carbon::now()->format('Y-m-d'),
                'user_id' => auth()->id(),
            ]);

            $grandTotal = 0;

            // 2. Looping Keranjang Belanja
            foreach ($request->cart as $cartItem) {
                $item = Item::findOrFail($cartItem['id']);

                // Cek Stok Aktual
                if ($item->current_stock < $cartItem['qty']) {
                    throw new \Exception("Stok {$item->name} tidak mencukupi.");
                }

                $subtotal = $item->price * $cartItem['qty'];
                $grandTotal += $subtotal;

                // Catat Detail Transaksi Keluar
                OutboundTransaction::create([
                    'invoice_id' => $invoice->id,
                    'item_id' => $item->id,
                    'user_id' => auth()->id(),
                    'date' => Carbon::now()->format('Y-m-d'),
                    'destination' => $request->destination,
                    'quantity' => $cartItem['qty'],
                    'price' => $item->price,
                    'total' => $subtotal,
                ]);

                // Kurangi Stok Utama
                $item->decrement('current_stock', $cartItem['qty']);
            }

            // Update Grand Total
            $invoice->update(['total_amount' => $grandTotal]);

            DB::commit();
            return redirect()->route('outbound.invoice', $invoice->id);
        } catch (\Exception $e) {
            DB::rollBack();
            return back()->withErrors(['error' => $e->getMessage()]);
        }
    }

    // HALAMAN CETAK INVOICE
    public function invoice(Invoice $invoice)
    {
        $invoice->load(['user', 'outboundTransactions.item']);
        return Inertia::render('Outbound/Invoice', ['invoice' => $invoice]);
    }
}
