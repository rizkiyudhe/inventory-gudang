<?php

namespace App\Http\Controllers;

use App\Models\Item;
use App\Models\Category; // WAJIB DITAMBAHKAN
use Illuminate\Http\Request;
use Inertia\Inertia;

class ItemController extends Controller
{
    public function index()
    {
        $items = Item::with('category')->latest()->paginate(10);
        return Inertia::render('Items/Index', [
            'items' => $items
        ]);
    }

    public function create()
    {
        $categories = Category::all();

        return Inertia::render('Items/Create', [
            'categories' => $categories
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'sku' => 'required|string|unique:items,sku|max:255',
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'min_stock' => 'required|integer|min:0',
            'current_stock' => 'required|integer|min:0',
        ]);

        Item::create($validated);

        return redirect()->route('items.index');
    }

    // MENAMPILKAN FORM EDIT
    public function edit(Item $item)
    {
        $categories = Category::all();

        return Inertia::render('Items/Edit', [
            'item' => $item,
            'categories' => $categories
        ]);
    }

    // MENYIMPAN PERUBAHAN KE DATABASE
    public function update(Request $request, Item $item)
    {
        $validated = $request->validate([
            // Pengecualian unik SKU agar tidak error saat menyimpan SKU yang sama untuk barang ini
            'sku' => 'required|string|max:255|unique:items,sku,' . $item->id,
            'name' => 'required|string|max:255',
            'category_id' => 'required|exists:categories,id',
            'min_stock' => 'required|integer|min:0',
            'current_stock' => 'required|integer|min:0',
        ]);

        $item->update($validated);

        return redirect()->route('items.index');
    }

    // MENGHAPUS BARANG 
    public function destroy(Item $item)
    {
        $item->delete();
        return redirect()->back();
    }
}
