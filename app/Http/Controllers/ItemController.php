<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    // 1. MASTER PRODUK (Hanya Identitas)
    public function index()
    {
        $items = Item::with('category')->latest()->paginate(10);
        return Inertia::render('Items/Index', ['items' => $items]);
    }

    // 2. DATA STOK (Hanya Kuantitas)
    public function stockIndex()
    {
        $items = Item::with('category')->latest()->paginate(10);
        return Inertia::render('Items/Stock', ['items' => $items]);
    }

    // FORM TAMBAH
    public function create()
    {
        return Inertia::render('Items/Form', [
            'categories' => Category::all()
        ]);
    }

    // SIMPAN DATA
    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:255|unique:items',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'min_stock' => 'required|integer|min:0',
            'current_stock' => 'required|integer|min:0', // Stok awal
        ]);

        Item::create($validated);
        return redirect()->route('items.index');
    }

    // FORM EDIT
    public function edit(Item $item)
    {
        return Inertia::render('Items/Form', [
            'item' => $item,
            'categories' => Category::all()
        ]);
    }

    // UPDATE DATA
    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            'sku' => 'required|string|max:255|unique:items,sku,' . $item->id,
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'min_stock' => 'required|integer|min:0',
            // current_stock tidak diupdate dari sini, harus lewat fitur Inbound/Outbound/Opname
        ]);

        $item->update($validated);
        return redirect()->route('items.index');
    }

    // HAPUS DATA
    public function destroy(Item $item)
    {
        $item->delete();
        return redirect()->back();
    }

    // HALAMAN CETAK BARCODE
    public function printBarcode(Item $item)
    {
        return Inertia::render('Items/PrintBarcode', [
            'item' => $item->load('category')
        ]);
    }
}
