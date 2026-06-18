import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: "",
        email: "",
        phone_number: "",
        role: "staff",
        password: "",
    });

    const submit = (e) => {
        e.preventDefault();
        post(route("users.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title="Tambah Staf Baru" />

            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("users.index")}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        Tambah Akun Karyawan
                    </h2>
                </div>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Lengkap
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email Karyawan
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.email}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                No. Handphone
                            </label>
                            <input
                                type="text"
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                            />
                            {errors.phone_number && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.phone_number}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Peran Akses (Role)
                            </label>
                            <select
                                value={data.role}
                                onChange={(e) =>
                                    setData("role", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                            >
                                <option value="staff">Staff Gudang</option>
                                <option value="admin">Administrator</option>
                            </select>
                            {errors.role && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.role}
                                </p>
                            )}
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Password Sementara
                            </label>
                            <input
                                type="text"
                                value={data.password}
                                onChange={(e) =>
                                    setData("password", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 focus:border-indigo-500 rounded-md shadow-sm"
                                placeholder="Minimal 8 karakter"
                            />
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password}
                                </p>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <button
                            type="submit"
                            disabled={processing}
                            className={`flex items-center gap-2 px-6 py-2.5 bg-indigo-600 text-white font-semibold rounded-md shadow-sm hover:bg-indigo-700 transition ${processing && "opacity-50"}`}
                        >
                            <CheckIcon className="w-5 h-5" />
                            {processing ? "Menyimpan..." : "Simpan Karyawan"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
