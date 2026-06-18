<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckRole
{
    public function handle(Request $request, Closure $next, string $role): Response
    {
        // Tolak jika belum login atau role tidak sesuai
        if (!auth()->check() || auth()->user()->role !== $role) {
            abort(403, 'Akses ditolak. Anda tidak memiliki izin untuk halaman ini.');
        }

        // Tolak jika akun dinonaktifkan (Sesuai PRD Bab 5.3)
        if (!auth()->user()->is_active) {
            auth()->logout();
            $request->session()->invalidate();
            $request->session()->regenerateToken();
            return redirect('/login')->withErrors(['email' => 'Akun Anda dinonaktifkan.']);
        }

        return $next($request);
    }
}
