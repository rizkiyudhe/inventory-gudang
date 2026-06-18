import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function Index({ items }) {
    return (
        <AuthenticatedLayout>
            <Head title="Data Master Barang" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Data Master Barang
                    </h2>
                    <Link
                        href={route("items.create")}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Tambah Barang
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">SKU</th>
                                <th className="p-4 border-b">Nama Barang</th>
                                <th className="p-4 border-b">Kategori</th>
                                <th className="p-4 border-b text-center">
                                    Stok Minimal
                                </th>
                                <th className="p-4 border-b text-center">
                                    Stok Saat Ini
                                </th>
                                <th className="p-4 border-b text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {items.data.length > 0 ? (
                                items.data.map((item) => (
                                    <tr
                                        key={item.id}
                                        className="hover:bg-gray-50 transition border-b"
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
                                        <td className="p-4 text-center font-bold text-indigo-600">
                                            {item.current_stock}
                                        </td>
                                        <td className="p-4 flex justify-center gap-3">
                                            {/* Tombol Edit */}
                                            <Link
                                                href={route(
                                                    "items.edit",
                                                    item.id,
                                                )}
                                                className="text-blue-600 hover:text-blue-800 transition"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </Link>

                                            {/* Tombol Hapus */}
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "Yakin ingin menghapus barang ini?",
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                "items.destroy",
                                                                item.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-800 transition"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Belum ada data barang.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Tempat Paginasi nantinya di sini */}
            </div>
        </AuthenticatedLayout>
    );
}
