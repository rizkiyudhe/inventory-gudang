import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Create({ items }) {
    const { data, setData, post, processing, errors } = useForm({
        item_id: "",
        new_stock: "",
        reason: "",
        date: new Date().toISOString().split("T")[0],
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("stock-adjustments.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Lakukan Stock Opname" />

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("stock-adjustments.index")}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Form Stock Opname
                    </h2>
                </div>

                <div className="mb-6 p-4 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 text-sm">
                    <strong>Peringatan:</strong> Fitur ini akan langsung menimpa
                    data stok di sistem. Pastikan Anda telah menghitung jumlah
                    fisik barang di gudang dengan teliti.
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Pilih Barang
                            </label>
                            <select
                                value={data.item_id}
                                onChange={(e) =>
                                    setData("item_id", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                            >
                                <option value="" disabled>
                                    -- Pilih Barang --
                                </option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.sku} - {item.name} (Sistem:{" "}
                                        {item.current_stock})
                                    </option>
                                ))}
                            </select>
                            {errors.item_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.item_id}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Stok Fisik Aktual (Baru)
                            </label>
                            <input
                                type="number"
                                min="0"
                                value={data.new_stock}
                                onChange={(e) =>
                                    setData("new_stock", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                                placeholder="Masukkan hasil hitung fisik"
                            />
                            {errors.new_stock && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.new_stock}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tanggal Opname
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Alasan Penyesuaian
                            </label>
                            <select
                                value={data.reason}
                                onChange={(e) =>
                                    setData("reason", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-yellow-500 focus:border-yellow-500 rounded-md shadow-sm"
                            >
                                <option value="" disabled>
                                    -- Pilih Alasan --
                                </option>
                                <option value="Barang Rusak">
                                    Barang Rusak / Kadaluarsa
                                </option>
                                <option value="Barang Hilang">
                                    Barang Hilang
                                </option>
                                <option value="Human Error Sistem">
                                    Salah Input (Human Error)
                                </option>
                                <option value="Lainnya">Lainnya...</option>
                            </select>
                            {errors.reason && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.reason}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`flex items-center gap-2 px-6 py-2.5 bg-yellow-600 text-white font-semibold rounded-md shadow-sm hover:bg-yellow-700 transition ${processing && "opacity-50 cursor-not-allowed"}`}
                        >
                            <CheckIcon className="w-5 h-5" />
                            {processing
                                ? "Memproses..."
                                : "Simpan Penyesuaian Stok"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
