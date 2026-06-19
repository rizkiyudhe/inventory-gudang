import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    HomeIcon,
    ArrowDownTrayIcon,
    ArrowUpTrayIcon,
    ClipboardDocumentCheckIcon,
    CircleStackIcon,
    UsersIcon,
    DocumentChartBarIcon,
    Bars3Icon,
    XMarkIcon,
    ChevronDownIcon,
} from "@heroicons/react/24/outline";

export default function AuthenticatedLayout({ children }) {
    // State untuk toggle hamburger menu di mobile
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Mengambil data user yang sedang login dari Inertia props
    const { auth } = usePage().props;
    const user = auth.user;

    // State untuk Dropdown Data Master
    const [isMasterOpen, setIsMasterOpen] = useState(
        route().current("categories.*") ||
            route().current("suppliers.*") ||
            route().current("items.*"),
    );

    // State untuk Dropdown Laporan
    const [isReportOpen, setIsReportOpen] = useState(
        route().current("reports.*"),
    );

    // Helper untuk style Link agar seragam
    const linkStyle =
        "flex items-center gap-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white";
    const subLinkStyle =
        "flex items-center gap-3 py-2 pl-11 pr-4 rounded text-sm text-gray-400 hover:bg-gray-800 hover:text-white transition duration-150";

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Sidebar */}
            <aside
                className={`${
                    showingNavigationDropdown
                        ? "translate-x-0"
                        : "-translate-x-full"
                } bg-gray-900 text-gray-300 w-64 space-y-6 py-7 absolute inset-y-0 left-0 transform md:relative md:translate-x-0 transition duration-200 ease-in-out z-20 shadow-xl`}
            >
                {/* Logo / Judul */}
                <div className="flex items-center space-x-2 px-6 mb-8 text-white">
                    <CircleStackIcon className="w-8 h-8 text-indigo-400" />
                    <span className="text-2xl font-extrabold tracking-tight">
                        InvGudang
                    </span>
                </div>

                {/* Navigasi Menu */}
                <nav className="space-y-1 px-3">
                    {/* Menu Umum (Semua Role) */}
                    <Link
                        href={route("dashboard")}
                        className={`${linkStyle} ${route().current("dashboard") ? "bg-gray-800 text-white" : ""}`}
                    >
                        <HomeIcon className="w-5 h-5" />
                        <span>Dashboard</span>
                    </Link>
                    <Link
                        href={route("inbound.index")}
                        className={`${linkStyle} ${route().current("inbound.*") ? "bg-gray-800 text-white" : ""}`}
                    >
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        <span>Barang Masuk</span>
                    </Link>
                    <Link
                        href={route("outbound.index")}
                        className={`${linkStyle} ${route().current("outbound.*") ? "bg-gray-800 text-white" : ""}`}
                    >
                        <ArrowUpTrayIcon className="w-5 h-5" />
                        <span>Barang Keluar</span>
                    </Link>
                    <Link
                        href={route("stock-adjustments.index")}
                        className={`${linkStyle} ${route().current("stock-adjustments.*") ? "bg-gray-800 text-white" : ""}`}
                    >
                        <ClipboardDocumentCheckIcon className="w-5 h-5" />
                        <span>Stock Opname</span>
                    </Link>

                    {/* Divider */}
                    <hr className="border-gray-700 my-5 mx-4" />

                    {/* Menu Khusus Admin */}
                    {user.role === "admin" && (
                        <div className="space-y-1">
                            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                Administrator
                            </p>

                            {/* MENU DROPDOWN DATA MASTER */}
                            <div>
                                <button
                                    onClick={() =>
                                        setIsMasterOpen(!isMasterOpen)
                                    }
                                    className={`w-full text-left ${linkStyle} ${route().current("categories.*") || route().current("suppliers.*") || route().current("items.*") ? "bg-gray-800 text-white" : ""} flex justify-between items-center`}
                                >
                                    <div className="flex items-center gap-3">
                                        <CircleStackIcon className="w-5 h-5" />
                                        <span>Data Master</span>
                                    </div>
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform duration-200 ${isMasterOpen ? "transform rotate-180" : ""}`}
                                    />
                                </button>

                                {/* Sub-menu Data Master */}
                                {isMasterOpen && (
                                    <div className="mt-1 space-y-1 bg-gray-900 bg-opacity-40 rounded-md py-1.5 mx-1">
                                        <Link
                                            href={route("categories.index")}
                                            className={`${subLinkStyle} ${route().current("categories.*") ? "text-white font-medium bg-gray-800" : ""}`}
                                        >
                                            Master Kategori
                                        </Link>
                                        <Link
                                            href={route("items.index")}
                                            className={`${subLinkStyle} ${route().current("items.index") || route().current("items.create") || route().current("items.edit") ? "text-white font-medium bg-gray-800" : ""}`}
                                        >
                                            Master Produk
                                        </Link>
                                        <Link
                                            href={route("suppliers.index")}
                                            className={`${subLinkStyle} ${route().current("suppliers.*") ? "text-white font-medium bg-gray-800" : ""}`}
                                        >
                                            Master Supplier
                                        </Link>
                                        <Link
                                            href={route("items.stock")}
                                            className={`${subLinkStyle} ${route().current("items.stock") ? "text-white font-medium bg-gray-800" : ""}`}
                                        >
                                            Data Stok
                                        </Link>
                                    </div>
                                )}
                            </div>

                            <Link
                                href={route("users.index")}
                                className={`${linkStyle} ${route().current("users.*") ? "bg-gray-800 text-white" : ""}`}
                            >
                                <UsersIcon className="w-5 h-5" />
                                <span>Manajemen Staf</span>
                            </Link>

                            {/* MENU DROPDOWN LAPORAN */}
                            <div>
                                <button
                                    onClick={() =>
                                        setIsReportOpen(!isReportOpen)
                                    }
                                    className={`w-full text-left ${linkStyle} ${route().current("reports.*") ? "bg-gray-800 text-white" : ""} flex justify-between items-center`}
                                >
                                    <div className="flex items-center gap-3">
                                        <DocumentChartBarIcon className="w-5 h-5" />
                                        <span>Laporan</span>
                                    </div>
                                    <ChevronDownIcon
                                        className={`w-4 h-4 transition-transform duration-200 ${isReportOpen ? "transform rotate-180" : ""}`}
                                    />
                                </button>

                                {/* Sub-menu Laporan */}
                                {isReportOpen && (
                                    <div className="mt-1 space-y-1 bg-gray-900 bg-opacity-40 rounded-md py-1.5 mx-1">
                                        <Link
                                            href={route("reports.stok")}
                                            className={`${subLinkStyle} ${route().current("reports.stok") ? "text-white font-medium bg-gray-800" : ""}`}
                                        >
                                            Laporan Stok
                                        </Link>
                                        <Link
                                            href={route("reports.inbound")}
                                            className={`${subLinkStyle} ${route().current("reports.inbound") ? "text-white font-medium bg-gray-800" : ""}`}
                                        >
                                            Laporan Barang Masuk
                                        </Link>
                                        <Link
                                            href={route("reports.outbound")}
                                            className={`${subLinkStyle} ${route().current("reports.outbound") ? "text-white font-medium bg-gray-800" : ""}`}
                                        >
                                            Laporan Barang Keluar
                                        </Link>
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 flex flex-col h-screen overflow-hidden">
                {/* Mobile Header & Hamburger Toggle */}
                <header className="bg-white shadow-sm flex items-center justify-between px-4 py-3 md:hidden">
                    <div className="font-bold text-xl text-gray-800 flex items-center gap-2">
                        <CircleStackIcon className="w-6 h-6 text-indigo-600" />
                        InvGudang
                    </div>
                    <button
                        onClick={() =>
                            setShowingNavigationDropdown(
                                !showingNavigationDropdown,
                            )
                        }
                        className="text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 rounded"
                    >
                        {showingNavigationDropdown ? (
                            <XMarkIcon className="w-7 h-7" />
                        ) : (
                            <Bars3Icon className="w-7 h-7" />
                        )}
                    </button>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-6">
                    {children}
                </main>
            </div>

            {/* Overlay untuk mobile saat sidebar terbuka */}
            {showingNavigationDropdown && (
                <div
                    onClick={() => setShowingNavigationDropdown(false)}
                    className="fixed inset-0 bg-gray-900 bg-opacity-50 transition-opacity z-10 md:hidden backdrop-blur-sm"
                ></div>
            )}
        </div>
    );
}
