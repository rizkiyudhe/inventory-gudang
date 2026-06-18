<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    // MENAMPILKAN DAFTAR STAF (Kecuali diri sendiri)
    public function index()
    {
        $users = User::where('id', '!=', auth()->id())->latest()->paginate(10);
        return Inertia::render('Users/Index', [
            'users' => $users
        ]);
    }

    // FORM TAMBAH STAF
    public function create()
    {
        return Inertia::render('Users/Create');
    }

    // SIMPAN STAF BARU
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'phone_number' => 'nullable|string|max:20',
            'role' => 'required|in:admin,staff',
            'password' => 'required|string|min:8', // Password awal
        ]);

        User::create([
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'role' => $validated['role'],
            'password' => Hash::make($validated['password']),
            'is_active' => true,
        ]);

        return redirect()->route('users.index');
    }

    // NONAKTIFKAN / AKTIFKAN AKUN (Toggle)
    public function toggleActive(User $user)
    {
        $user->update(['is_active' => !$user->is_active]);
        return redirect()->back();
    }

    // HAPUS AKUN
    public function destroy(User $user)
    {
        $user->delete(); // Otomatis mengisi deleted_at, riwayat transaksi tetap aman
        return redirect()->back();
    }

    // MENAMPILKAN FORM EDIT STAF
    public function edit(User $user)
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    // MENYIMPAN PERUBAHAN STAF
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            // Rule unique mengecualikan ID user ini sendiri agar tidak error
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone_number' => 'nullable|string|max:20',
            'role' => 'required|in:admin,staff',
            'password' => 'nullable|string|min:8', // Opsional, hanya isi jika ingin ganti password
        ]);

        // Siapkan data yang akan diupdate
        $dataToUpdate = [
            'name' => $validated['name'],
            'email' => $validated['email'],
            'phone_number' => $validated['phone_number'],
            'role' => $validated['role'],
        ];

        // Jika form password diisi, enkripsi dan masukkan ke data update
        if (!empty($validated['password'])) {
            $dataToUpdate['password'] = Hash::make($validated['password']);
        }

        $user->update($dataToUpdate);

        return redirect()->route('users.index');
    }
}
