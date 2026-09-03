import { Link } from 'react-router-dom'

export default function TidakDitemukan() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-6">
      <div className="text-center">
        <p className="text-sm font-semibold text-slate-500">
          404
        </p>

        <h1 className="mt-2 text-4xl font-bold text-slate-900">
          Halaman Tidak Ditemukan
        </h1>

        <p className="mt-3 text-slate-500">
          Halaman yang Anda cari tidak tersedia atau telah dipindahkan.
        </p>

        <Link
          to="/login"
          className="mt-6 inline-block rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-700"
        >
          Kembali ke Halaman Masuk
        </Link>
      </div>
    </div>
  )
}