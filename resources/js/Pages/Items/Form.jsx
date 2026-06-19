import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Form({ item, categories }) {
    const isEdit = !!item;

    const { data, setData, post, put, processing, errors } = useForm({
        sku: item?.sku || "",
        name: item?.name || "",
        category_id: item?.category_id || "",
        min_stock: item?.min_stock || 0,
        current_stock: item?.current_stock || 0, // Hanya dipakai saat Create
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) put(route("items.update", item.id));
        else post(route("items.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Edit Produk" : "Tambah Produk"} />
            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("items.index")}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEdit ? "Edit Data Produk" : "Registrasi Produk Baru"}
                    </h2>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                SKU (Kode Barang)
                            </label>
                            <input
                                type="text"
                                value={data.sku}
                                onChange={(e) => setData("sku", e.target.value)}
                                className="w-full border-gray-300 focus:ring-indigo-500 rounded-md font-mono uppercase"
                                placeholder="Contoh: ELK-001"
                            />
                            {errors.sku && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.sku}
                                </p>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Nama Produk
                            </label>
                            <input
                                type="text"
                                value={data.name}
                                onChange={(e) =>
                                    setData("name", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 rounded-md"
                            />
                            {errors.name && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.name}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full border-gray-300 focus:ring-indigo-500 rounded-md"
                        >
                            <option value="" disabled>
                                -- Pilih Kategori --
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.id}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Harga Jual (Rp)
                        </label>
                        <input
                            type="number"
                            value={data.price || ""}
                            onChange={(e) => setData("price", e.target.value)}
                            className="w-full border-gray-300 focus:ring-indigo-500 rounded-md shadow-sm"
                        />
                        {errors.price && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.price}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4 bg-gray-50 rounded-md border border-gray-100">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Batas Stok Minimum
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.min_stock}
                                onChange={(e) =>
                                    setData("min_stock", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 rounded-md"
                            />
                            <span className="text-xs text-gray-500">
                                Peringatan muncul jika stok di bawah angka ini.
                            </span>
                            {errors.min_stock && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.min_stock}
                                </p>
                            )}
                        </div>

                        {/* Stok awal hanya bisa diinput saat membuat barang baru. Jika edit, stok dimatikan. */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stok Awal Fisik
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.current_stock}
                                onChange={(e) =>
                                    setData("current_stock", e.target.value)
                                }
                                disabled={isEdit}
                                className={`w-full border-gray-300 rounded-md ${isEdit ? "bg-gray-200 cursor-not-allowed" : "focus:ring-indigo-500"}`}
                            />
                            {isEdit && (
                                <span className="text-xs text-red-500">
                                    Stok hanya bisa diubah melalui fitur Stock
                                    Opname.
                                </span>
                            )}
                            {errors.current_stock && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.current_stock}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white font-semibold rounded-md shadow-sm hover:bg-gray-800 transition"
                        >
                            <CheckIcon className="w-5 h-5" />{" "}
                            {isEdit ? "Simpan Perubahan" : "Daftarkan Produk"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
