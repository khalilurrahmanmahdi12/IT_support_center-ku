interface HalamanSementaraProps {
  judul: string
  deskripsi: string
}

export default function HalamanSementara({
  judul,
  deskripsi,
}: HalamanSementaraProps) {
  return (
    <div>
      <p className="text-sm font-medium text-slate-500">
        IT Support Center
      </p>

      <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900">
        {judul}
      </h1>

      <p className="mt-2 text-sm text-slate-500">
        {deskripsi}
      </p>

      <div className="mt-8 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center">
        <p className="text-sm font-medium text-slate-600">
          Halaman sedang disiapkan
        </p>

        <p className="mt-1 text-xs text-slate-400">
          Fitur lengkap akan dibuat pada tahap berikutnya.
        </p>
      </div>
    </div>
  )
}