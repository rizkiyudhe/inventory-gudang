import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link } from "@inertiajs/react";
import { usePage } from "@inertiajs/react";

export default function Dashboard({
    metrics,
    low_stock_items,
    recent_inbounds,
    recent_outbounds,
    chart_data = [], // <-- TAMBAHAN: Menerima data grafik dari Controller
}) {
    const { auth } = usePage().props;
    const user = auth.user;

    // Kalkulasi Data Chart (Mencari nilai tertinggi untuk patokan 100% tinggi balok)
    const maxChartValue = Math.max(
        ...chart_data.map((d) => Math.max(d.in, d.out)),
        10, // Angka minimal agar grafiknya tidak kosong jika belum ada data
    );

    // Menggabungkan dan mengurutkan aktivitas terbaru (Inbound & Outbound)
    const combinedActivities = [
        ...recent_inbounds.map((item) => ({ ...item, type: "inbound" })),
        ...recent_outbounds.map((item) => ({ ...item, type: "outbound" })),
    ]
        .sort(
            (a, b) =>
                new Date(b.created_at || b.date) -
                new Date(a.created_at || a.date),
        )
        .slice(0, 5);

    return (
        <AuthenticatedLayout>
            <Head title="Warehouse Dashboard" />

            {/* Hubungkan stylesheet Google Material Symbols jika belum ada di app.blade.php */}
            <link
                href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
                rel="stylesheet"
            />

            <div className="space-y-6">
                {/* Page Header */}
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
                    <div>
                        <p className="text-xs font-bold tracking-wider text-gray-400 uppercase mb-1">
                            OVERVIEW
                        </p>
                        <h2 className="text-3xl font-extrabold text-gray-900 tracking-tight">
                            Warehouse Dashboard
                        </h2>
                    </div>
                    <div className="flex gap-2">
                        <button className="px-4 h-10 border border-gray-300 bg-white text-sm font-bold text-gray-700 rounded hover:bg-gray-50 transition-colors flex items-center gap-2 shadow-sm">
                            <span className="material-symbols-outlined text-[18px]">
                                calendar_today
                            </span>
                            Bulan Ini
                        </button>
                        <Link
                            href={route("reports.stok")}
                            className="px-4 h-10 bg-gray-950 text-white text-sm font-bold rounded hover:opacity-90 transition-opacity flex items-center gap-2 shadow-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">
                                download
                            </span>
                            Buka Laporan
                        </Link>
                    </div>
                </div>

                {/* Overview Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {/* Card 1: Total Stock */}
                    <div className="bg-white border border-gray-200 p-6 rounded-lg flex items-center gap-6 relative overflow-hidden shadow-sm hover:bg-gray-50 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gray-950"></div>
                        <div className="w-12 h-12 rounded bg-gray-100 text-gray-900 flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">
                                inventory
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                                TOTAL SKU BARANG
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics.total_items}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px] text-green-600">
                                    trending_up
                                </span>
                                Terdaftar di sistem aktif
                            </p>
                        </div>
                    </div>

                    {/* Card 2: Low Stock Alerts */}
                    <div className="bg-white border border-gray-200 p-6 rounded-lg flex items-center gap-6 relative overflow-hidden shadow-sm hover:bg-gray-50 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-600"></div>
                        <div className="w-12 h-12 rounded bg-red-50 text-red-600 flex items-center justify-center">
                            <span
                                className="material-symbols-outlined text-2xl"
                                style={{ fontVariationSettings: "'FILL' 1" }}
                            >
                                warning
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                                LOW STOCK ALERTS
                            </p>
                            <h3 className="text-2xl font-bold text-red-600 mt-1">
                                {low_stock_items.length}
                            </h3>
                            <p className="text-xs text-red-500 mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">
                                    priority_high
                                </span>
                                Butuh restock segera
                            </p>
                        </div>
                    </div>

                    {/* Card 3: Shipments / Outbound */}
                    <div className="bg-white border border-gray-200 p-6 rounded-lg flex items-center gap-6 relative overflow-hidden shadow-sm hover:bg-gray-50 transition-colors">
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-slate-500"></div>
                        <div className="w-12 h-12 rounded bg-slate-100 text-slate-700 flex items-center justify-center">
                            <span className="material-symbols-outlined text-2xl">
                                local_shipping
                            </span>
                        </div>
                        <div>
                            <p className="text-xs font-bold tracking-wider text-gray-400 uppercase">
                                KELUAR BULAN INI
                            </p>
                            <h3 className="text-2xl font-bold text-gray-900 mt-1">
                                {metrics.outbound_month}
                            </h3>
                            <p className="text-xs text-gray-500 mt-1 flex items-center gap-1">
                                <span className="material-symbols-outlined text-[14px]">
                                    schedule
                                </span>
                                Total unit didistribusikan
                            </p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Stock Throughput Trends Chart (Dinamis dari Database) */}
                    <div className="lg:col-span-2 bg-white border border-gray-200 rounded-lg p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-base font-bold text-gray-800">
                                Pergerakan Stok (7 Hari)
                            </h4>
                            <div className="flex gap-4">
                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                    <span className="w-2.5 h-2.5 rounded-full bg-gray-950"></span>{" "}
                                    Inbound
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-xs text-gray-500 font-medium">
                                    <span className="w-2.5 h-2.5 rounded-full bg-gray-400"></span>{" "}
                                    Outbound
                                </span>
                            </div>
                        </div>
                        <div className="h-64 flex items-end justify-between gap-2 pt-4 border-b border-gray-100">
                            {/* RENDER GRAFIK DINAMIS */}
                            {chart_data.map((bar, idx) => {
                                // Menghitung persentase tinggi balok
                                const inPercent = Math.round(
                                    (bar.in / maxChartValue) * 100,
                                );
                                const outPercent = Math.round(
                                    (bar.out / maxChartValue) * 100,
                                );

                                return (
                                    <div
                                        key={idx}
                                        className="flex flex-col items-center gap-2 flex-1 h-full justify-end group"
                                    >
                                        <div className="w-full flex items-end justify-center gap-1 h-full relative">
                                            {/* Balok Inbound */}
                                            <div
                                                className="bg-gray-950 w-full max-w-[20px] rounded-t-sm transition-all duration-500 hover:opacity-80"
                                                style={{
                                                    height: `${inPercent}%`,
                                                }}
                                                title={`Masuk: ${bar.in} unit`}
                                            ></div>
                                            {/* Balok Outbound */}
                                            <div
                                                className="bg-gray-400 w-full max-w-[20px] rounded-t-sm transition-all duration-500 hover:opacity-80"
                                                style={{
                                                    height: `${outPercent}%`,
                                                }}
                                                title={`Keluar: ${bar.out} unit`}
                                            ></div>
                                        </div>
                                        <span className="text-[10px] font-bold text-gray-400 mt-1">
                                            {bar.day}
                                        </span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Recent Activity Feed */}
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm flex flex-col">
                        <div className="flex items-center justify-between mb-6">
                            <h4 className="text-base font-bold text-gray-800">
                                Recent Activity
                            </h4>
                            <Link
                                href={route("inbound.index")}
                                className="text-gray-950 text-xs font-bold hover:underline"
                            >
                                View All
                            </Link>
                        </div>
                        <div className="space-y-4 flex-1 overflow-y-auto max-h-64 pr-1">
                            {combinedActivities.length > 0 ? (
                                combinedActivities.map((act, idx) => (
                                    <div className="flex gap-4" key={idx}>
                                        <div className="relative">
                                            <div
                                                className={`w-8 h-8 rounded-full flex items-center justify-center z-10 relative shadow-sm ${act.type === "inbound" ? "bg-green-50 text-green-600" : "bg-red-50 text-red-600"}`}
                                            >
                                                <span className="material-symbols-outlined text-[18px]">
                                                    {act.type === "inbound"
                                                        ? "login"
                                                        : "logout"}
                                                </span>
                                            </div>
                                            {idx !==
                                                combinedActivities.length -
                                                    1 && (
                                                <div className="absolute left-1/2 top-8 bottom-[-16px] w-px bg-gray-200 -translate-x-1/2"></div>
                                            )}
                                        </div>
                                        <div className="pb-4">
                                            <p className="text-sm font-bold text-gray-800">
                                                {act.type === "inbound"
                                                    ? `Barang Masuk #${act.reference_number || "PO"}`
                                                    : `Barang Keluar ke ${act.destination}`}
                                            </p>
                                            <p className="text-xs text-gray-500 mt-0.5">
                                                {act.quantity} unit dari{" "}
                                                {act.item?.name || "Item"} telah
                                                diproses.
                                            </p>
                                            <p className="text-[10px] font-semibold text-gray-400 uppercase mt-1">
                                                {act.date}
                                            </p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p className="text-xs text-gray-400 text-center py-8">
                                    Belum ada aktivitas mutasi barang hari ini.
                                </p>
                            )}
                        </div>
                    </div>
                </div>

                {/* Table Section: Critical Stock Replenishment */}
                <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-sm">
                    <div className="px-6 py-4 border-b border-gray-200 flex items-center justify-between bg-gray-50">
                        <h4 className="text-base font-bold text-gray-800">
                            Critical Stock Replenishment
                        </h4>
                        <span className="px-2.5 py-1 bg-red-100 text-red-800 text-xs font-bold rounded-md">
                            {low_stock_items.length} Alerts
                        </span>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100 bg-opacity-50 border-b border-gray-200">
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                        SKU / ITEM
                                    </th>
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                        KATEGORI
                                    </th>
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase text-center">
                                        ON HAND
                                    </th>
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase text-center">
                                        THRESHOLD
                                    </th>
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                        STATUS
                                    </th>
                                    <th className="px-6 py-3 text-xs font-bold tracking-wider text-gray-500 uppercase">
                                        ACTIONS
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100 text-sm text-gray-600">
                                {low_stock_items.length > 0 ? (
                                    low_stock_items.map((item) => (
                                        <tr
                                            className="hover:bg-gray-50 transition-colors"
                                            key={item.id}
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex flex-col">
                                                    <span className="font-bold text-gray-900">
                                                        {item.sku}
                                                    </span>
                                                    <span className="text-xs text-gray-500">
                                                        {item.name}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="font-mono text-xs bg-gray-100 text-gray-700 px-2 py-1 rounded">
                                                    {item.category?.name ||
                                                        "Umum"}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4 font-bold text-red-600 text-center">
                                                {item.current_stock}
                                            </td>
                                            <td className="px-6 py-4 text-gray-400 text-center">
                                                {item.min_stock}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className="inline-flex items-center px-2 py-0.5 bg-red-50 text-red-700 text-[10px] font-bold uppercase tracking-wider rounded border border-red-100">
                                                    Critical
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <Link
                                                    href={route(
                                                        "inbound.create",
                                                    )}
                                                    className="text-gray-950 font-bold text-xs hover:underline decoration-2 underline-offset-4"
                                                >
                                                    Restock
                                                </Link>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td
                                            colSpan="6"
                                            className="px-6 py-8 text-center text-gray-400 text-xs"
                                        >
                                            Luar biasa! Tidak ada barang yang
                                            berada di bawah ambang batas stok
                                            minimum.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
