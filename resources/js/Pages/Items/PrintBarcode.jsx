import { Head } from "@inertiajs/react";
import Barcode from "react-barcode";
import { useEffect } from "react";

export default function PrintBarcode({ item }) {
    // Otomatis memunculkan dialog print browser saat halaman dimuat
    useEffect(() => {
        setTimeout(() => {
            window.print();
        }, 500);
    }, []);

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4 print:bg-white print:p-0">
            <Head title={`Print Barcode - ${item.sku}`} />

            {/* Desain Label (Ukuran standar stiker thermal 100x50mm jika di-print) */}
            <div className="bg-white border-2 border-dashed border-gray-300 p-6 rounded-lg w-[400px] print:border-none print:w-auto print:p-2 flex flex-col items-center shadow-lg print:shadow-none text-center">
                <h1 className="text-xl font-black text-gray-900 uppercase tracking-wider mb-1">
                    LOGIKEEP WMS
                </h1>
                <p className="text-xs text-gray-500 font-bold mb-4 border-b pb-2 w-full">
                    {item.category?.name || "UMUM"}
                </p>

                <h2 className="text-lg font-bold text-gray-800 leading-tight w-full truncate">
                    {item.name}
                </h2>

                <div className="my-4">
                    <Barcode
                        value={item.sku}
                        format="CODE128"
                        width={2.5}
                        height={70}
                        displayValue={true}
                        fontSize={16}
                        font="monospace"
                        background="#ffffff"
                        lineColor="#000000"
                        margin={0}
                    />
                </div>

                <div className="text-[10px] text-gray-400 mt-2">
                    Printed on: {new Date().toLocaleDateString("id-ID")}
                </div>
            </div>

            {/* Tombol kembali (Sembunyi saat diprint) */}
            <div className="fixed bottom-10 print:hidden">
                <button
                    onClick={() => window.history.back()}
                    className="px-6 py-2 bg-gray-900 text-white font-bold rounded-full shadow-lg hover:bg-gray-800 transition"
                >
                    Kembali ke Master Produk
                </button>
            </div>

            {/* CSS khusus agar layar print bersih */}
            <style jsx global>{`
                @media print {
                    @page {
                        margin: 0;
                        size: auto;
                    }
                    body {
                        margin: 0;
                        background-color: white;
                    }
                }
            `}</style>
        </div>
    );
}
