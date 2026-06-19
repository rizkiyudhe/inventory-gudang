import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, useForm, Link } from "@inertiajs/react";
import { useState } from "react";
import {
    PlusIcon,
    MinusIcon,
    TrashIcon,
    ShoppingCartIcon,
} from "@heroicons/react/24/outline";

export default function Create({ items, errors }) {
    const [cart, setCart] = useState([]);
    const [search, setSearch] = useState("");

    const { data, setData, post, processing } = useForm({
        destination: "",
        cart: [],
    });

    // Format Rupiah
    const formatRp = (angka) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);

    // Filter Pencarian Katalog
    const filteredItems = items.filter(
        (item) =>
            item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.sku.toLowerCase().includes(search.toLowerCase()),
    );

    // Logika Keranjang
    const addToCart = (item) => {
        const existing = cart.find((c) => c.id === item.id);
        if (existing) {
            if (existing.qty < item.current_stock) {
                setCart(
                    cart.map((c) =>
                        c.id === item.id ? { ...c, qty: c.qty + 1 } : c,
                    ),
                );
            } else {
                alert("Stok tidak mencukupi!");
            }
        } else {
            setCart([...cart, { ...item, qty: 1 }]);
        }
    };

    const updateQty = (id, newQty, maxStock) => {
        if (newQty < 1) return;
        if (newQty > maxStock) return alert("Melebihi stok gudang!");
        setCart(cart.map((c) => (c.id === id ? { ...c, qty: newQty } : c)));
    };

    const removeFromCart = (id) => setCart(cart.filter((c) => c.id !== id));

    const totalAmount = cart.reduce(
        (sum, item) => sum + item.price * item.qty,
        0,
    );

    const handleCheckout = (e) => {
        e.preventDefault();
        if (cart.length === 0) return alert("Keranjang masih kosong!");

        // Simpan data keranjang ke dalam form Inertia lalu kirim
        data.cart = cart.map((c) => ({ id: c.id, qty: c.qty }));
        post(route("outbound.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Transaksi Keluar / POS" />

            <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-100px)]">
                {/* KIRI: KATALOG BARANG */}
                <div className="flex-1 bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-gray-100">
                        <input
                            type="text"
                            placeholder="Cari SKU atau Nama Produk..."
                            className="w-full border-gray-300 rounded-md focus:ring-indigo-500"
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="p-4 overflow-y-auto grid grid-cols-2 md:grid-cols-3 gap-4">
                        {filteredItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => addToCart(item)}
                                className="text-left border border-gray-200 p-3 rounded-lg hover:border-indigo-500 hover:shadow-md transition bg-gray-50 flex flex-col justify-between h-32"
                            >
                                <div>
                                    <p className="text-xs text-indigo-600 font-bold font-mono">
                                        {item.sku}
                                    </p>
                                    <p className="text-sm font-bold text-gray-800 line-clamp-2 leading-tight">
                                        {item.name}
                                    </p>
                                </div>
                                <div>
                                    <p className="text-xs text-gray-500 mb-1">
                                        Stok: {item.current_stock}
                                    </p>
                                    <p className="text-sm font-black text-gray-900">
                                        {formatRp(item.price)}
                                    </p>
                                </div>
                            </button>
                        ))}
                    </div>
                </div>

                {/* KANAN: KERANJANG / KASIR */}
                <div className="w-full lg:w-[400px] bg-white rounded-lg shadow-sm border border-gray-200 flex flex-col h-full">
                    <div className="p-4 bg-gray-900 text-white rounded-t-lg flex items-center justify-between">
                        <h3 className="font-bold flex items-center gap-2">
                            <ShoppingCartIcon className="w-5 h-5" /> Detail
                            Transaksi
                        </h3>
                        <span className="bg-gray-700 text-xs px-2 py-1 rounded">
                            {cart.length} Item
                        </span>
                    </div>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {cart.length === 0 ? (
                            <div className="text-center text-gray-400 mt-10 text-sm">
                                Keranjang masih kosong
                            </div>
                        ) : (
                            cart.map((c) => (
                                <div
                                    key={c.id}
                                    className="bg-white p-3 rounded border border-gray-200 shadow-sm flex flex-col gap-2"
                                >
                                    <div className="flex justify-between items-start">
                                        <p className="text-sm font-bold text-gray-800 leading-tight pr-4">
                                            {c.name}
                                        </p>
                                        <button
                                            onClick={() => removeFromCart(c.id)}
                                            className="text-red-500 hover:text-red-700"
                                        >
                                            <TrashIcon className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex items-center gap-2 bg-gray-100 rounded p-1 border border-gray-200">
                                            <button
                                                onClick={() =>
                                                    updateQty(
                                                        c.id,
                                                        c.qty - 1,
                                                        c.current_stock,
                                                    )
                                                }
                                                className="bg-white p-1 rounded shadow-sm hover:bg-gray-200"
                                            >
                                                <MinusIcon className="w-3 h-3" />
                                            </button>
                                            <span className="text-sm font-bold w-6 text-center">
                                                {c.qty}
                                            </span>
                                            <button
                                                onClick={() =>
                                                    updateQty(
                                                        c.id,
                                                        c.qty + 1,
                                                        c.current_stock,
                                                    )
                                                }
                                                className="bg-white p-1 rounded shadow-sm hover:bg-gray-200"
                                            >
                                                <PlusIcon className="w-3 h-3" />
                                            </button>
                                        </div>
                                        <p className="font-bold text-gray-900 text-sm">
                                            {formatRp(c.price * c.qty)}
                                        </p>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>

                    <form
                        onSubmit={handleCheckout}
                        className="p-4 border-t border-gray-200 bg-white rounded-b-lg"
                    >
                        {errors.error && (
                            <p className="text-red-500 text-xs mb-2 text-center bg-red-50 p-2 rounded">
                                {errors.error}
                            </p>
                        )}

                        <div className="mb-4">
                            <label className="block text-xs font-bold text-gray-700 mb-1">
                                Nama Pembeli / Tujuan
                            </label>
                            <input
                                type="text"
                                required
                                value={data.destination}
                                onChange={(e) =>
                                    setData("destination", e.target.value)
                                }
                                className="w-full border-gray-300 rounded text-sm focus:ring-indigo-500"
                                placeholder="Masukkan nama..."
                            />
                        </div>

                        <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-100">
                            <span className="text-gray-500 font-bold">
                                Total Tagihan
                            </span>
                            <span className="text-2xl font-black text-indigo-700">
                                {formatRp(totalAmount)}
                            </span>
                        </div>

                        <button
                            type="submit"
                            disabled={processing || cart.length === 0}
                            className={`w-full py-3 rounded-lg font-bold text-white transition ${cart.length === 0 ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700 shadow-lg"}`}
                        >
                            {processing
                                ? "Memproses..."
                                : "Proses & Cetak Invoice"}
                        </button>
                    </form>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
