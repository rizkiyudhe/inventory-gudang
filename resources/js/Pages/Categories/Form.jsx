import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import { ArrowLeftIcon, CheckIcon } from "@heroicons/react/24/outline";

export default function Form({ category }) {
    const isEdit = !!category;
    const { data, setData, post, put, processing, errors } = useForm({
        name: category?.name || "",
        description: category?.description || "",
    });

    const submit = (e) => {
        e.preventDefault();
        if (isEdit) put(route("categories.update", category.id));
        else post(route("categories.store"));
    };

    return (
        <AuthenticatedLayout>
            <Head title={isEdit ? "Edit Kategori" : "Tambah Kategori"} />
            <div className="max-w-2xl mx-auto bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-4 mb-6">
                    <Link
                        href={route("categories.index")}
                        className="p-2 text-gray-500 hover:bg-gray-100 rounded-full"
                    >
                        <ArrowLeftIcon className="w-5 h-5" />
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">
                        {isEdit ? "Edit Kategori" : "Tambah Kategori"}
                    </h2>
                </div>
                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Nama Kategori
                        </label>
                        <input
                            type="text"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                            className="w-full border-gray-300 focus:ring-indigo-500 rounded-md shadow-sm"
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.name}
                            </p>
                        )}
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Deskripsi
                        </label>
                        <textarea
                            value={data.description}
                            onChange={(e) =>
                                setData("description", e.target.value)
                            }
                            className="w-full border-gray-300 focus:ring-indigo-500 rounded-md shadow-sm"
                            rows="3"
                        ></textarea>
                        {errors.description && (
                            <p className="text-red-500 text-sm mt-1">
                                {errors.description}
                            </p>
                        )}
                    </div>
                    <div className="flex justify-end border-t pt-4">
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-2.5 rounded-md font-semibold hover:bg-indigo-700"
                        >
                            <CheckIcon className="w-5 h-5" />{" "}
                            {isEdit ? "Simpan Perubahan" : "Simpan Kategori"}
                        </button>
                    </div>
                </form>
            </div>
        </AuthenticatedLayout>
    );
}
