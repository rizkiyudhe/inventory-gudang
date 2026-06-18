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
} from "@heroicons/react/24/outline";

export default function AuthenticatedLayout({ children }) {
    // State untuk toggle hamburger menu di mobile
    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    // Mengambil data user yang sedang login dari Inertia props
    const { auth } = usePage().props;
    const user = auth.user;

    // Helper untuk style Link agar seragam
    const linkStyle =
        "flex items-center gap-3 py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white";

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
                    <Link href="#" className={linkStyle}>
                        <ArrowDownTrayIcon className="w-5 h-5" />
                        <span>Barang Masuk</span>
                    </Link>
                    <Link href="#" className={linkStyle}>
                        <ArrowUpTrayIcon className="w-5 h-5" />
                        <span>Barang Keluar</span>
                    </Link>
                    <Link href="#" className={linkStyle}>
                        <ClipboardDocumentCheckIcon className="w-5 h-5" />
                        <span>Stock Opname</span>
                    </Link>

                    {/* Divider */}
                    <hr className="border-gray-700 my-5 mx-4" />

                    {/* Menu Khusus Admin */}
                    {user.role === "admin" && (
                        <div>
                            <p className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-3">
                                Administrator
                            </p>
                            <Link
                                href={route("items.index")}
                                className={linkStyle}
                            >
                                <CircleStackIcon className="w-5 h-5" />
                                <span>Data Master</span>
                            </Link>
                            <Link href="#" className={linkStyle}>
                                <UsersIcon className="w-5 h-5" />
                                <span>Manajemen Staf</span>
                            </Link>
                            <Link href="#" className={linkStyle}>
                                <DocumentChartBarIcon className="w-5 h-5" />
                                <span>Laporan & Mutasi</span>
                            </Link>
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
