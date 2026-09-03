import {
  Inbox,
} from 'lucide-react'

interface EmptyStateProps {
  judul?: string
  deskripsi?: string
}

export default function EmptyState({
  judul = 'Data tidak tersedia',
  deskripsi = 'Belum ada data yang dapat ditampilkan.',
}: EmptyStateProps) {
  return (
    <div className="flex min-h-[240px] flex-col items-center justify-center rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-10 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 text-slate-400">
        <Inbox size={22} />
      </div>

      <h3 className="mt-4 text-sm font-bold text-slate-800">
        {judul}
      </h3>

      <p className="mt-2 max-w-md text-sm leading-6 text-slate-500">
        {deskripsi}
      </p>
    </div>
  )
}