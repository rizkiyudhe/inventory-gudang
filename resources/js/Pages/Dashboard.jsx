import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import {
    CubeIcon,
    ArrowTrendingUpIcon,
    ArrowTrendingDownIcon,
    ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

export default function Dashboard({
    metrics,
    low_stock_items,
    recent_inbounds,
    recent_outbounds,
}) {
    return (
        <AuthenticatedLayout>
            <Head title="Dashboard" />

            {/* Bagian 1: Metrik Ringkasan */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Kartu Total Barang */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center gap-4">
                    <div className="p-4 bg-indigo-100 text-indigo-600 rounded-full">
                        <CubeIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Total SKU Barang
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800">
                            {metrics.total_items}
                        </h3>
                    </div>
                </div>

                {/* Kartu Barang Masuk */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center gap-4">
                    <div className="p-4 bg-green-100 text-green-600 rounded-full">
                        <ArrowTrendingUpIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Masuk Bulan Ini
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800">
                            +{metrics.inbound_month} Unit
                        </h3>
                    </div>
                </div>

                {/* Kartu Barang Keluar */}
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 flex items-center gap-4">
                    <div className="p-4 bg-red-100 text-red-600 rounded-full">
                        <ArrowTrendingDownIcon className="w-8 h-8" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-500">
                            Keluar Bulan Ini
                        </p>
                        <h3 className="text-2xl font-bold text-gray-800">
                            -{metrics.outbound_month} Unit
                        </h3>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Bagian 2: Peringatan Stok Menipis */}
                <div className="lg:col-span-1">
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="bg-red-50 p-4 border-b border-gray-200 flex items-center gap-2 rounded-t-lg">
                            <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
                            <h3 className="font-bold text-red-800">
                                Peringatan Stok Menipis
                            </h3>
                        </div>
                        <div className="p-4">
                            {low_stock_items.length > 0 ? (
                                <ul className="space-y-4">
                                    {low_stock_items.map((item) => (
                                        <li
                                            key={item.id}
                                            className="flex justify-between items-center border-b pb-3 last:border-0 last:pb-0"
                                        >
                                            <div>
                                                <p className="font-semibold text-gray-800">
                                                    {item.name}
                                                </p>
                                                <p className="text-xs text-gray-500">
                                                    Min: {item.min_stock} unit
                                                </p>
                                            </div>
                                            <div className="text-right">
                                                <span className="px-3 py-1 bg-red-100 text-red-700 font-bold rounded-full text-sm">
                                                    Sisa {item.current_stock}
                                                </span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <p className="text-gray-500 text-center py-4 text-sm">
                                    Semua stok barang aman.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Bagian 3: Aktivitas Terakhir */}
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Log Masuk */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
                            Inbound Terbaru
                        </h3>
                        <ul className="space-y-3">
                            {recent_inbounds.length > 0 ? (
                                recent_inbounds.map((trx) => (
                                    <li
                                        key={trx.id}
                                        className="text-sm flex justify-between items-start"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-700">
                                                {trx.item?.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {trx.date} • Oleh:{" "}
                                                {trx.user?.name}
                                            </p>
                                        </div>
                                        <span className="text-green-600 font-bold">
                                            +{trx.quantity}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-xs text-gray-500">
                                    Belum ada aktivitas.
                                </li>
                            )}
                        </ul>
                    </div>

                    {/* Log Keluar */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4">
                        <h3 className="font-bold text-gray-800 mb-4 border-b pb-2">
                            Outbound Terbaru
                        </h3>
                        <ul className="space-y-3">
                            {recent_outbounds.length > 0 ? (
                                recent_outbounds.map((trx) => (
                                    <li
                                        key={trx.id}
                                        className="text-sm flex justify-between items-start"
                                    >
                                        <div>
                                            <p className="font-semibold text-gray-700">
                                                {trx.item?.name}
                                            </p>
                                            <p className="text-xs text-gray-400">
                                                {trx.date} • Ke:{" "}
                                                {trx.destination}
                                            </p>
                                        </div>
                                        <span className="text-red-600 font-bold">
                                            -{trx.quantity}
                                        </span>
                                    </li>
                                ))
                            ) : (
                                <li className="text-xs text-gray-500">
                                    Belum ada aktivitas.
                                </li>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
