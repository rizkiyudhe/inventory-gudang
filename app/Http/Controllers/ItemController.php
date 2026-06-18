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
}
