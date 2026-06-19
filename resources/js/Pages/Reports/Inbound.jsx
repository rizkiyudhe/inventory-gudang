import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, router } from "@inertiajs/react";
import { useState } from "react"; // <-- Sudah diperbaiki menjadi useState
import { DocumentTextIcon, TableCellsIcon } from "@heroicons/react/24/outline";

export default function Inbound({ transactions, filters }) {
    const [dates, setDates] = useState({
        start_date: filters?.start_date || "",
        end_date: filters?.end_date || "",
    });

    const handleFilter = (e) => {
        e.preventDefault();
        router.get(route("reports.inbound"), dates, { preserveState: true });
    };

    return (
        <AuthenticatedLayout>
            <Head title="Laporan Barang Masuk" />
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-xl font-bold text-gray-800">
                        Laporan Barang Masuk
                    </h2>
                    <div className="flex gap-3 w-full md:w-auto">
                        <a
                            href={route("reports.inbound.excel", dates)}
                            className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-green-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-green-700"
                        >
                            <TableCellsIcon className="w-5 h-5" /> Excel
                        </a>
                        <a
                            href={route("reports.inbound.pdf", dates)}
                            className="flex flex-1 md:flex-none items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700"
                        >
                            <DocumentTextIcon className="w-5 h-5" /> PDF
                        </a>
                    </div>
                </div>

                <form
                    onSubmit={handleFilter}
                    className="flex flex-wrap items-end gap-4 bg-gray-50 p-4 rounded-md mb-6 border border-gray-100"
                >
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Dari Tanggal
                        </label>
                        <input
                            type="date"
                            value={dates.start_date}
                            onChange={(e) =>
                                setDates({
                                    ...dates,
                                    start_date: e.target.value,
                                })
                            }
                            className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">
                            Sampai Tanggal
                        </label>
                        <input
                            type="date"
                            value={dates.end_date}
                            onChange={(e) =>
                                setDates({ ...dates, end_date: e.target.value })
                            }
                            className="border-gray-300 rounded-md text-sm focus:ring-indigo-500 focus:border-indigo-500"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-gray-800 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-gray-700 transition"
                    >
                        Filter
                    </button>
                </form>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase">
                                <th className="p-4 border-b">Tanggal</th>
                                <th className="p-4 border-b">No. Ref</th>
                                <th className="p-4 border-b">Barang</th>
                                <th className="p-4 border-b">Supplier</th>
                                <th className="p-4 border-b text-center">
                                    Jumlah
                                </th>
                                <th className="p-4 border-b">Staf</th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {transactions.data.length > 0 ? (
                                transactions.data.map((trx) => (
                                    <tr
                                        key={trx.id}
                                        className="hover:bg-gray-50 border-b transition"
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
                                        Tidak ada riwayat untuk periode ini.
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
