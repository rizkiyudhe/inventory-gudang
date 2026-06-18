import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";
export default function Create({ categories }) {
    // Inisialisasi state form menggunakan Inertia
    const { data, setData, post, processing, errors } = useForm({
        sku: "",
        name: "",
        category_id: "",
        min_stock: 0,
        current_stock: 0,
    });

    // Fungsi saat tombol submit ditekan
    const submit = (e) => {
        e.preventDefault();
        post(route("items.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Barang Baru" />

            <div className="max-w-3xl mx-auto bg-white p-6 md:p-8 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("items.index")}
                        className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-full transition"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Tambah Barang Baru
                    </h2>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    {/* Input SKU */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            SKU Barang
                        </label>
                        <input
                            type="text"
                            value={data.sku}
                            onChange={(e) => setData("sku", e.target.value)}
                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            placeholder="Contoh: ELK-001"
                        />
                        {errors.sku && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.sku}
                            </p>
                        )}
                    </div>

                    {/* Input Nama Barang */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Barang
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            placeholder="Contoh: Laptop Asus VivoBook"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    {/* Dropdown Kategori */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Kategori
                        </label>
                        <select
                            value={data.category_id}
                            onChange={(e) =>
                                setData("category_id", e.target.value)
                            }
                            className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                        >
                            <option value="" disabled>
                                -- Pilih Kategori --
                            </option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.category_id}
                            </p>
                        )}
                    </div>

                    {/* Input Stok (Grid 2 Kolom) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stok Awal Saat Ini
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.current_stock}
                                onChange={(e) =>
                                    setData("current_stock", e.target.value)
                                }
                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            />
                            {errors.current_stock && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.current_stock}
                                </p>
                            )}
                        </div>

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
                                className="w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            />
                            {errors.min_stock && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.min_stock}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Sistem akan memberi peringatan jika stok di
                                bawah angka ini.
                            </p>
                        </div>
                    </div>

                    {/* Tombol Simpan */}
                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ${processing && "opacity-50 cursor-not-allowed"}`}
                        >
                            <CheckIcon className="w-5 h-5" />
                            {processing ? "Menyimpan..." : "Simpan Barang"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
