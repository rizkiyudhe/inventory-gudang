import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Form({ supplier }) {
    const isEdit = !!supplier;
    const { data, setData, post, put, processing, errors } = useForm({
        name: supplier?.name || "",
        phone_number: supplier?.phone_number || "",
        email: supplier?.email || "",
        address: supplier?.address || "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) put(route("suppliers.update", supplier.id));
        else post(route("suppliers.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Edit Supplier" : "Tambah Supplier"} />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("suppliers.index")}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEdit ? "Edit Supplier" : "Tambah Supplier"}
                    </h2>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Supplier
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border-gray-300 focus:ring-indigo-500 rounded-md"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                No. Telepon
                            </label>
                            <input
                                type="text"
                                value={data.phone_number}
                                onChange={(e) =>
                                    setData("phone_number", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 rounded-md"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-1">
                                Email
                            </label>
                            <input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData("email", e.target.value)
                                }
                                className="w-full border-gray-300 focus:ring-indigo-500 rounded-md"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Alamat Lengkap
                        </label>
                        <textarea
                            value={data.address}
                            onChange={(e) => setData("address", e.target.value)}
                            className="w-full border-gray-300 focus:ring-indigo-500 rounded-md"
                            rows="3"
                        ></textarea>
                    </div>
                    <div className="flex justify-end border-t pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-indigo-700"
                        >
                            <CheckIcon className="w-5 h-5" />{" "}
                            {isEdit ? "Simpan Perubahan" : "Simpan Supplier"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
