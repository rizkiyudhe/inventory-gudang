import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Index({ transactions }) {
    return (
        <AuthenticatedLayout>
            <Head title="Barang Masuk" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Riwayat Barang Masuk
                    </h2>
                    <Link
                        href={route("inbound.create")}
                        className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Catat Barang Masuk
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">Tanggal</th>
                                <th className="p-4 border-b">No. Ref / PO</th>
                                <th className="p-4 border-b">Barang</th>
                                <th className="p-4 border-b">Supplier</th>
                                <th className="p-4 border-b text-center">
                                    Jumlah
                                </th>
                                <th className="p-4 border-b">Staf Pencatat</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {transactions.data.length > 0 ? (
                                transactions.data.map((trx) => (
                                    <tr
                                        key={trx.id}
                                        className="hover:bg-gray-50 border-b"
                                    >
                                        <td className="p-4">{trx.date}</td>
                                        <td className="p-4 font-mono text-xs">
                                            {trx.reference_number || "-"}
                                        </td>
                                        <td className="p-4 font-semibold text-gray-800">
                                            {trx.item?.name}
                                        </td>
                                        <td className="p-4">
                                            {trx.supplier?.name || "-"}
                                        </td>
                                        <td className="p-4 text-center font-bold text-green-600">
                                            +{trx.quantity}
                                        </td>
                                        <td className="p-4">
                                            {trx.user?.name}
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="6"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Belum ada riwayat barang masuk.
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
