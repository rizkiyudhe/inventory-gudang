import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
// Tambahkan PencilSquareIcon
import {
    PlusIcon,
    TrashIcon,
    NoSymbolIcon,
    CheckCircleIcon,
    PencilSquareIcon,
} from "@heroicons/react/24/outline";

export default function Index({ users }) {
    return (
        <AuthenticatedLayout>
            <Head title="Manajemen Staf" />

            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Daftar Akun Karyawan
                    </h2>
                    <Link
                        href={route("users.create")}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <PlusIcon className="w-5 h-5" />
                        Tambah Staf
                    </Link>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">Nama</th>
                                <th className="p-4 border-b">Email / Kontak</th>
                                <th className="p-4 border-b text-center">
                                    Peran
                                </th>
                                <th className="p-4 border-b text-center">
                                    Status
                                </th>
                                <th className="p-4 border-b text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {users.data.length > 0 ? (
                                users.data.map((u) => (
                                    <tr
                                        key={u.id}
                                        className="hover:bg-gray-50 border-b"
                                    >
                                        <td className="p-4 font-semibold text-gray-800">
                                            {u.name}
                                        </td>
                                        <td className="p-4">
                                            <div>{u.email}</div>
                                            <div className="text-xs text-gray-400">
                                                {u.phone_number || "-"}
                                            </div>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${u.role === "admin" ? "bg-purple-100 text-purple-700" : "bg-blue-100 text-blue-700"}`}
                                            >
                                                {u.role.toUpperCase()}
                                            </span>
                                        </td>
                                        <td className="p-4 text-center">
                                            <span
                                                className={`px-3 py-1 rounded-full text-xs font-bold ${u.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}
                                            >
                                                {u.is_active
                                                    ? "Aktif"
                                                    : "Nonaktif"}
                                            </span>
                                        </td>
                                        <td className="p-4 flex justify-center gap-3">
                                            {/* Tombol Edit */}
                                            <Link
                                                href={route("users.edit", u.id)}
                                                className="text-blue-600 hover:text-blue-800 transition"
                                                title="Edit Akun"
                                            >
                                                <PencilSquareIcon className="w-5 h-5" />
                                            </Link>

                                            {/* Tombol Toggle Aktif/Nonaktif */}
                                            <button
                                                onClick={() =>
                                                    router.patch(
                                                        route(
                                                            "users.toggle-active",
                                                            u.id,
                                                        ),
                                                    )
                                                }
                                                className={`${u.is_active ? "text-orange-500 hover:text-orange-700" : "text-green-500 hover:text-green-700"} transition`}
                                                title={
                                                    u.is_active
                                                        ? "Nonaktifkan Akun"
                                                        : "Aktifkan Akun"
                                                }
                                            >
                                                {u.is_active ? (
                                                    <NoSymbolIcon className="w-5 h-5" />
                                                ) : (
                                                    <CheckCircleIcon className="w-5 h-5" />
                                                )}
                                            </button>

                                            {/* Tombol Hapus (Soft Delete) */}
                                            <button
                                                onClick={() => {
                                                    if (
                                                        confirm(
                                                            "Yakin ingin menghapus staf ini? Riwayat transaksinya akan tetap aman.",
                                                        )
                                                    ) {
                                                        router.delete(
                                                            route(
                                                                "users.destroy",
                                                                u.id,
                                                            ),
                                                        );
                                                    }
                                                }}
                                                className="text-red-600 hover:text-red-800 transition"
                                                title="Hapus Akun"
                                            >
                                                <TrashIcon className="w-5 h-5" />
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td
                                        colSpan="5"
                                        className="p-8 text-center text-gray-500"
                                    >
                                        Belum ada akun karyawan terdaftar.
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
