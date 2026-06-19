_Warehouse Management System (WMS)_

sistem manajemen gudang modern yang dibangun untuk efisiensi operasional, pelacakan stok real-time, dan manajemen transaksi keluar-masuk barang. Sistem ini dirancang untuk kemudahan penggunaan bagi staf gudang dan fitur pelaporan yang komprehensif untuk pengelola bisnis.

_🚀 Fitur Utama_

Dashboard Visual: Monitor metrik gudang seperti Total SKU, Peringatan Stok Rendah (Low Stock Alert), dan Tren Pergerakan Barang (Inbound/Outbound).

Data Master: Manajemen modul data master yang terstruktur meliputi Kategori, Produk, dan Supplier.

Sistem Transaksi (POS): Fitur Barang Keluar dengan sistem keranjang (Cart) terintegrasi, perhitungan harga otomatis, dan sistem Checkout langsung.

Invoice & Barcode: Fitur cetak invoice otomatis dengan format bersih dan pembuatan label Barcode/Label Rak produk secara on-the-fly.

Pelaporan: Export laporan stok dan mutasi barang ke dalam format PDF.

Keamanan: Manajemen akses staf dan otentikasi yang aman.

_🛠 Tech Stack_

Framework: Laravel 11

Frontend: React.js dengan Inertia.js

Styling: Tailwind CSS

Database: MySQL / PostgreSQL

Utilities:

DOMPDF (PDF Generation)

React-Barcode (Label Printing)

Heroicons (UI Icons)

_📋 Prasyarat_

Sebelum memulai, pastikan Anda telah menginstal:

PHP 8.2+

Composer

Node.js & NPM

MySQL/MariaDB

_⚙️ Instalasi_

Clone repository ini

git clone https://github.com/username/logikeep.git
cd logikeep

Instal dependensi PHP

composer install

Instal dependensi Node.js

npm install

Konfigurasi Environment

cp .env.example .env
php artisan key:generate

Sesuaikan pengaturan database di dalam file .env.

Migrasi Database

php artisan migrate --seed

Jalankan Aplikasi

# Di satu terminal

npm run dev

# Di terminal lainnya

php artisan serve

🤝 Kontribusi

Saran dan pull request sangat dihargai. Untuk perubahan besar, harap buka issue terlebih dahulu untuk mendiskusikan apa yang ingin Anda ubah.

_📄 Lisensi_

MIT
