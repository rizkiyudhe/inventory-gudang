import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";

export default function Stock({ items }) {
    return (
        <AuthenticatedLayout>
            <Head title="Data Stok Gudang" />
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Data Stok Aktual
                    </h2>
                    <Link
                        href={route("stock-adjustments.create")}
                        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition text-sm"
                    >
                        <ArrowPathIcon className="w-4 h-4" /> Penyesuaian Stok
                        (Opname)
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">SKU / Produk</th>
                                <th className="p-4 border-b">Kategori</th>
                                <th className="p-4 border-b text-center">
                                    Batas Minimum
                                </th>
                                <th className="p-4 border-b text-center">
                                    Stok Saat Ini
                                </th>
                                <th className="p-4 border-b text-center">
                                    Status Gudang
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {items.data.map((item) => {
                                const isCritical =
                                    item.current_stock <= item.min_stock;
                                return (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 border-b"
                                    >
                                        <td className="p-4">
                                            <div className="font-mono font-bold text-gray-800">
                                                {item.sku}
                                            </div>
                                            <div className="text-xs text-gray-500">
                                                {item.name}
                                            </div>
                                        </td>
                                        <td className="p-4">
                                            {item.category?.name || "-"}
                                        </td>
                                        <td className="p-4 text-center">
                                            {item.min_stock}
                                        </td>
                                        <td
                                            className={`p-4 text-center text-lg font-black ${isCritical ? "text-red-600" : "text-green-600"}`}
                                        >
                                            {item.current_stock}
                                        </td>
                                        <td className="p-4 text-center">
                                            {isCritical ? (
                                                <span className="px-3 py-1 bg-red-100 text-red-700 text-xs font-bold uppercase rounded-md border border-red-200">
                                                    Kritis / Restock
                                                </span>
                                            ) : (
                                                <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-bold uppercase rounded-md border border-green-200">
                                                    Aman
                                                </span>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
