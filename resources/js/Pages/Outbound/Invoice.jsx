import { Head, Link } from "@inertiajs/react";
import { useEffect } from "react";
import { PrinterIcon, ArrowLeftIcon } from "@heroicons/react/24/outline";

export default function Invoice({ invoice }) {
    const formatRp = (angka) =>
        new Intl.NumberFormat("id-ID", {
            style: "currency",
            currency: "IDR",
            minimumFractionDigits: 0,
        }).format(angka);

    return (
        <div className="min-h-screen bg-gray-100 py-10 print:bg-white print:py-0">
            <Head title={`Invoice ${invoice.invoice_number}`} />

            {/* Aksi Non-Print */}
            <div className="max-w-2xl mx-auto mb-6 flex justify-between items-center print:hidden">
                <Link
                    href={route("outbound.index")}
                    className="flex items-center gap-2 text-gray-600 hover:text-gray-900 font-medium bg-white px-4 py-2 rounded-full shadow-sm"
                >
                    <ArrowLeftIcon className="w-4 h-4" /> Kembali
                </Link>
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2 rounded-full font-bold shadow-md hover:bg-indigo-700 transition"
                >
                    <PrinterIcon className="w-5 h-5" /> Cetak Invoice
                </button>
            </div>

            {/* Kertas Invoice (A4 Standard) */}
            <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl shadow-xl print:shadow-none print:w-full print:max-w-none print:p-4">
                {/* Header Kop */}
                <div className="flex justify-between items-start border-b-2 border-gray-800 pb-6 mb-6">
                    <div>
                        <h1 className="text-3xl font-black text-gray-900 tracking-tighter uppercase">
                            INVOICE
                        </h1>
                        <p className="text-gray-500 font-mono text-sm mt-1">
                            {invoice.invoice_number}
                        </p>
                    </div>
                    <div className="text-right">
                        <h2 className="text-xl font-black text-indigo-700">
                            InvGudang (LogiKeep)
                        </h2>
                        <p className="text-sm text-gray-500">
                            Jl. Teknologi No. 123, Kota Gudang
                        </p>
                        <p className="text-sm text-gray-500">
                            Telp: 0812-3456-7890
                        </p>
                    </div>
                </div>

                {/* Info Pelanggan & Kasir */}
                <div className="flex justify-between mb-8">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                            Tagihan Kepada:
                        </p>
                        <p className="text-lg font-bold text-gray-800">
                            {invoice.destination}
                        </p>
                    </div>
                    <div className="text-right">
                        <p className="text-sm">
                            <span className="text-gray-500">Tanggal:</span>{" "}
                            <span className="font-bold text-gray-800">
                                {invoice.date}
                            </span>
                        </p>
                        <p className="text-sm">
                            <span className="text-gray-500">Kasir:</span>{" "}
                            <span className="font-bold text-gray-800">
                                {invoice.user?.name}
                            </span>
                        </p>
                    </div>
                </div>

                {/* Tabel Detail */}
                <table className="w-full text-left mb-8 border-collapse">
                    <thead>
                        <tr className="border-y-2 border-gray-200">
                            <th className="py-3 px-2 text-sm text-gray-600 uppercase w-1/2">
                                Deskripsi Barang
                            </th>
                            <th className="py-3 px-2 text-sm text-gray-600 uppercase text-center w-16">
                                Qty
                            </th>
                            <th className="py-3 px-2 text-sm text-gray-600 uppercase text-right">
                                Harga
                            </th>
                            <th className="py-3 px-2 text-sm text-gray-600 uppercase text-right">
                                Subtotal
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {invoice.outbound_transactions.map((trx) => (
                            <tr key={trx.id}>
                                <td className="py-4 px-2">
                                    <p className="font-bold text-gray-800">
                                        {trx.item?.name}
                                    </p>
                                    <p className="text-xs text-gray-500 font-mono">
                                        {trx.item?.sku}
                                    </p>
                                </td>
                                <td className="py-4 px-2 text-center font-bold text-gray-800">
                                    {trx.quantity}
                                </td>
                                <td className="py-4 px-2 text-right text-gray-600">
                                    {formatRp(trx.price)}
                                </td>
                                <td className="py-4 px-2 text-right font-bold text-gray-900">
                                    {formatRp(trx.total)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                {/* Ringkasan Total */}
                <div className="flex justify-end">
                    <div className="w-1/2 bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <div className="flex justify-between items-center">
                            <span className="font-bold text-gray-600 uppercase">
                                Grand Total
                            </span>
                            <span className="text-2xl font-black text-indigo-700">
                                {formatRp(invoice.total_amount)}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Footer Pesan */}
                <div className="mt-16 text-center border-t border-gray-200 pt-6">
                    <p className="text-sm font-bold text-gray-600">
                        Terima kasih atas kepercayaan Anda!
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                        Barang yang sudah dibeli tidak dapat ditukar atau
                        dikembalikan.
                    </p>
                </div>
            </div>

            <style jsx global>{`
                @media print {
                    @page {
                        margin: 1cm;
                    }
                    body {
                        -webkit-print-color-adjust: exact;
                        print-color-adjust: exact;
                    }
                }
            `}</style>
        </div>
    );
}
