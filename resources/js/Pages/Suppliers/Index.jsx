import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, router } from "@inertiajs/react";
import {
    PlusIcon,
    PencilSquareIcon,
    TrashIcon,
} from "@heroicons/react/24/outline";

export default function Index({ suppliers }) {
    return (
        <AuthenticatedLayout>
            <Head title="Master Supplier" />
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-xl font-bold text-gray-800">
                        Master Supplier
                    </h2>
                    <Link
                        href={route("suppliers.create")}
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md transition"
                    >
                        <PlusIcon className="w-5 h-5" /> Tambah Supplier
                    </Link>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-gray-100 text-gray-700 text-sm uppercase tracking-wider">
                                <th className="p-4 border-b">Nama Supplier</th>
                                <th className="p-4 border-b">Kontak</th>
                                <th className="p-4 border-b">Alamat</th>
                                <th className="p-4 border-b text-center">
                                    Aksi
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-gray-600 text-sm">
                            {suppliers.data.map((sup) => (
                                <tr
                                    key={sup.id}
                                    className="hover:bg-gray-50 border-b"
                                >
                                    <td className="p-4 font-bold text-gray-800">
                                        {sup.name}
                                    </td>
                                    <td className="p-4">
                                        <div>{sup.phone_number || "-"}</div>
                                        <div className="text-xs text-gray-400">
                                            {sup.email || "-"}
                                        </div>
                                    </td>
                                    <td className="p-4 text-xs">
                                        {sup.address || "-"}
                                    </td>
                                    <td className="p-4 flex justify-center gap-3">
                                        <Link
                                            href={route(
                                                "suppliers.edit",
                                                sup.id,
                                            )}
                                            className="text-blue-600 hover:text-blue-800"
                                        >
                                            <PencilSquareIcon className="w-5 h-5" />
                                        </Link>
                                        <button
                                            onClick={() => {
                                                if (
                                                    confirm(
                                                        "Hapus supplier ini?",
                                                    )
                                                )
                                                    router.delete(
                                                        route(
                                                            "suppliers.destroy",
                                                            sup.id,
                                                        ),
                                                    );
                                            }}
                                            className="text-red-600 hover:text-red-800"
                                        >
                                            <TrashIcon className="w-5 h-5" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
