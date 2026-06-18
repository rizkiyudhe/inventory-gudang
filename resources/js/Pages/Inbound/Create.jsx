import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Create({ items, suppliers }) {
    const { data, setData, post, processing, errors } = useForm({
        item_id: "",
        supplier_id: "",
        quantity: "",
        reference_number: "",
        date: new Date().toISOString().split("T")[0], // Set default ke hari ini
        notes: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("inbound.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Catat Barang Masuk" />

            <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("inbound.index")}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Catat Barang Masuk
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
                                className="w-full border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
                            >
                                <option value="" disabled>
                                    -- Pilih Barang --
                                </option>
                                {items.map((item) => (
                                    <option key={item.id} value={item.id}>
                                        {item.sku} - {item.name}
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
                                Jumlah Masuk
                            </label>
                            <input
                                type="number"
                                min="1"
                                value={data.quantity}
                                onChange={(e) =>
                                    setData("quantity", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
                            />
                            {errors.quantity && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.quantity}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Tanggal Transaksi
                            </label>
                            <input
                                type="date"
                                value={data.date}
                                onChange={(e) =>
                                    setData("date", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
                            />
                            {errors.date && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.date}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Supplier (Opsional)
                            </label>
                            <select
                                value={data.supplier_id}
                                onChange={(e) =>
                                    setData("supplier_id", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
                            >
                                <option value="">-- Tanpa Supplier --</option>
                                {suppliers.map((supplier) => (
                                    <option
                                        key={supplier.id}
                                        value={supplier.id}
                                    >
                                        {supplier.name}
                                    </option>
                                ))}
                            </select>
                            {errors.supplier_id && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.supplier_id}
                                </p>
                            )}
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            No. Referensi / PO (Opsional)
                        </label>
                        <input
                            type="text"
                            value={data.reference_number}
                            onChange={(e) =>
                                setData("reference_number", e.target.value)
                            }
                            className="w-full border-gray-300 focus:ring-green-500 focus:border-green-500 rounded-md shadow-sm"
                            placeholder="Contoh: PO-2026-06-001"
                        />
                        {errors.reference_number && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.reference_number}
                            </p>
                        )}
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`flex items-center gap-2 px-6 py-2.5 bg-green-600 text-white font-semibold rounded-md shadow-sm hover:bg-green-700 transition ${processing && "opacity-50"}`}
                        >
                            <CheckIcon className="w-5 h-5" />
                            {processing
                                ? "Menyimpan..."
                                : "Proses Barang Masuk"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
