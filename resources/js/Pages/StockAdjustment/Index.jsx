import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Index({ adjustments }) {
    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Stock Opname" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Riwayat Stock Opname
                    </h2>
                    <Link
                        href={route("stock-adjustments.create")}
                        className="flex items-center gap-2 bg-yellow-600 hover:bg-yellow-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Lakukan Penyesuaian
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">Tanggal</th>
                                <th className="p-4 border-b">Barang</th>
                                <th className="p-4 border-b text-center">
                                    Stok Sistem
                                </th>
                                <th className="p-4 border-b text-center">
                                    Stok Fisik (Baru)
                                </th>
                                <th className="p-4 border-b text-center">
                                    Selisih
                                </th>
                                <th className="p-4 border-b">Alasan</th>
                                <th className="p-4 border-b">Staf</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {adjustments.data.length > 0 ? (
                                adjustments.data.map((adj) => {
                                    const selisih =
                                        adj.new_stock - adj.old_stock;
                                    return (
                                        <tr
                                            key={adj.id}
                                            className="hover:bg-gray-50 border-b"
                                        >
                                            <td className="p-4">{adj.date}</td>
                                            <td className="p-4 font-semibold text-gray-800">
                                                {adj.item?.name}
                                            </td>
                                            <td className="p-4 text-center">
                                                {adj.old_stock}
                                            </td>
                                            <td className="p-4 text-center font-bold">
                                                {adj.new_stock}
                                            </td>
                                            <td
                                                className={`p-4 text-center font-bold ${selisih > 0 ? "text-green-600" : selisih < 0 ? "text-red-600" : "text-gray-500"}`}
                                            >
                                                {selisih > 0
                                                    ? `+${selisih}`
                                                    : selisih}
                                            </td>
                                            <td className="p-4">
                                                {adj.reason}
                                            </td>
                                            <td className="p-4">
                                                {adj.user?.name}
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Belum ada riwayat stock opname.
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
