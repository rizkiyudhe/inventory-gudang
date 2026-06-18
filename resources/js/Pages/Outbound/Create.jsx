import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Create({ items }) {
    const { data, setData, post, processing, errors } = useForm({
        item_id: "",
        quantity: "",
        destination: "",
        date: new Date().toISOString().split("T")[0],
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("outbound.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Catat Barang Keluar" />

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("outbound.index")}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Catat Barang Keluar
                    </h2>
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
                                className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-md shadow-sm"
                            >
                                <option value="" disabled>
                                    -- Pilih Barang Tersedia --
                                </option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.sku} - {item.name} (Stok:{" "}
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
                                Jumlah Dikeluarkan
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={data.quantity}
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-md shadow-sm"
                            />
                            {/* Di sini pesan error "Stok tidak mencukupi" akan muncul jika validasi gagal */}
                            {errors.quantity && (
                                <p className="text-red-500 text-sm mt-1 font-bold">
                                    {errors.quantity}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tujuan Pengiriman / Unit
                            </label>
                            <input
                                type="text"
                                value={data.destination}
                                onChange={(e) =>
                                    setData("destination", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-md shadow-sm"
                                placeholder="Contoh: Cabang Sudirman / Toko A"
                            />
                            {errors.destination && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.destination}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tanggal Keluar
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-md shadow-sm"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.date}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Catatan Tambahan (Opsional)
                        </label>
                        <textarea
                            value={data.notes}
                            onChange={(e) => setData("notes", e.target.value)}
                            className="w-full border-gray-300 focus:ring-red-500 focus:border-red-500 rounded-md shadow-sm"
                            rows="3"
                        ></textarea>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`flex items-center gap-2 px-6 py-2.5 bg-red-600 text-white font-semibold rounded-md shadow-sm hover:bg-red-700 transition ${processing && "opacity-50 cursor-not-allowed"}`}
                        >
                            <CheckIcon className="w-5 h-5" />
                            {processing ? "Memproses..." : "Keluarkan Barang"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
