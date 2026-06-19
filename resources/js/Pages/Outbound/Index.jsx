import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    ShoppingCartIcon,
    PrinterIcon,
    DocumentTextIcon,
} from "@heroicons/react/24/outline";

export default function Index({ invoices }) {
    // <--- Props diubah menjadi 'invoices'

    // Fungsi format Rupiah
    const formatRp = (angka) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);

    return (
        <AuthenticatedLayout>
            <Head title="Riwayat Transaksi Keluar" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Riwayat Transaksi (Barang Keluar)
                    </h2>
                    <Link
                        href={route("outbound.create")}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition shadow-sm font-bold"
                    >
                        <ShoppingCartIcon className="w-5 h-5" />
                        Kasir / Transaksi Baru
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">Tanggal</th>
                                <th className="p-4 border-b">No. Invoice</th>
                                <th className="p-4 border-b">
                                    Nama Pembeli / Tujuan
                                </th>
                                <th className="p-4 border-b text-center">
                                    Total Item
                                </th>
                                <th className="p-4 border-b text-right">
                                    Total Transaksi
                                </th>
                                <th className="p-4 border-b text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {/* Pastikan menggunakan invoices.data */}
                            {invoices?.data?.length > 0 ? (
                                invoices.data.map((inv) => {
                                    // Hitung total unit barang di dalam invoice ini
                                    const totalQty =
                                        inv.outbound_transactions?.reduce(
                                            (sum, trx) => sum + trx.quantity,
                                            0,
                                        ) || 0;

                                    return (
                                        <tr
                                            key={inv.id}
                                            className="hover:bg-gray-50 border-b"
                                        >
                                            <td className="p-4">{inv.date}</td>
                                            <td className="p-4 font-mono font-bold text-indigo-600">
                                                {inv.invoice_number}
                                            </td>
                                            <td className="p-4 font-semibold text-gray-800">
                                                {inv.destination}
                                            </td>
                                            <td className="p-4 text-center">
                                                <span className="bg-gray-200 text-gray-800 px-2 py-1 rounded text-xs font-bold">
                                                    {totalQty} Unit
                                                </span>
                                            </td>
                                            <td className="p-4 text-right font-black text-gray-900">
                                                {formatRp(inv.total_amount)}
                                            </td>
                                            <td className="p-4 flex justify-center gap-2">
                                                <Link
                                                    href={route(
                                                        "outbound.invoice",
                                                        inv.id,
                                                    )}
                                                    className="flex items-center gap-1 text-xs bg-indigo-50 text-indigo-700 border border-indigo-200 hover:bg-indigo-100 px-3 py-1.5 rounded font-bold transition"
                                                >
                                                    <DocumentTextIcon className="w-4 h-4" />{" "}
                                                    Lihat Struk
                                                </Link>
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
                                        Belum ada riwayat transaksi
                                        penjualan/barang keluar.
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Navigasi Paginasi (Sederhana) */}
                {invoices?.links && invoices.links.length > 3 && (
                    <div className="mt-6 flex justify-end">
                        <div className="flex gap-1">
                            {invoices.links.map((link, k) => (
                                <Link
                                    key={k}
                                    href={link.url || "#"}
                                    className={`px-3 py-1 text-sm border rounded ${link.active ? "bg-indigo-600 text-white border-indigo-600 font-bold" : "bg-white text-gray-500 border-gray-300 hover:bg-gray-50"} ${!link.url && "opacity-50 cursor-not-allowed"}`}
                                    dangerouslySetInnerHTML={{
                                        __html: link.label,
                                    }}
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
