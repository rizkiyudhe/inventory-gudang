import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import {
    DocumentTextIcon,
    TableCellsIcon,
    FunnelIcon,
} from "@heroicons/react/24/outline";

export default function Index({ items, categories, filters }) {
    // Fungsi untuk menangani perubahan filter kategori
    const handleFilterChange = (e) => {
        const value = e.target.value;

        router.get(
            route("reports.index"),
            { category_id: value },
            { preserveState: true, replace: true },
        );
    };

    return (
        <AuthenticatedLayout>
            <Head title="Laporan & Posisi Stok" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Laporan Posisi Stok
                    </h2>

                    {/* Tombol Export */}
                    <div className="flex gap-3 w-full md:w-auto">
                        <a
                            href={route("reports.export.excel", {
                                category_id: filters.category_id,
                            })}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition shadow-sm"
                        >
                            <TableCellsIcon className="w-5 h-5" />
                            <span>Export Excel</span>
                        </a>
                        <a
                            href={route("reports.export.pdf", {
                                category_id: filters.category_id,
                            })}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md transition shadow-sm"
                        >
                            <DocumentTextIcon className="w-5 h-5" />
                            <span>Export PDF</span>
                        </a>
                    </div>
                </div>

                {/* Filter Bar */}
                <div className="bg-gray-50 p-4 rounded-md mb-6 border border-gray-100 flex items-center gap-4">
                    <FunnelIcon className="w-5 h-5 text-gray-500" />
                    <span className="text-sm font-semibold text-gray-700">
                        Filter:
                    </span>
                    <select
                        className="border-gray-300 rounded-md shadow-sm text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        value={filters.category_id || ""}
                        onChange={handleFilterChange}
                    >
                        <option value="">Semua Kategori</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>
                                {cat.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Tabel Laporan */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">SKU</th>
                                <th className="p-4 border-b">Nama Barang</th>
                                <th className="p-4 border-b">Kategori</th>
                                <th className="p-4 border-b text-center">
                                    Batas Minimum
                                </th>
                                <th className="p-4 border-b text-center">
                                    Stok Tersedia
                                </th>
                                <th className="p-4 border-b text-center">
                                    Status
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {items.data.length > 0 ? (
                                items.data.map((item) => {
                                    const isLowStock =
                                        item.current_stock <= item.min_stock;
                                    return (
                                        <tr
                                            key={item.id}
                                            className="hover:bg-gray-50 border-b"
                                        >
                                            <td className="p-4 font-mono">
                                                {item.sku}
                                            </td>
                                            <td className="p-4 font-semibold text-gray-800">
                                                {item.name}
                                            </td>
                                            <td className="p-4">
                                                {item.category?.name || "-"}
                                            </td>
                                            <td className="p-4 text-center">
                                                {item.min_stock}
                                            </td>
                                            <td
                                                className={`p-4 text-center font-bold ${isLowStock ? "text-red-600" : "text-indigo-600"}`}
                                            >
                                                {item.current_stock}
                                            </td>
                                            <td className="p-4 text-center">
                                                {isLowStock ? (
                                                    <span className="px-2 py-1 bg-red-100 text-red-700 text-xs font-bold rounded-full">
                                                        Butuh Restock
                                                    </span>
                                                ) : (
                                                    <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-bold rounded-full">
                                                        Aman
                                                    </span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Tidak ada data untuk filter tersebut.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
