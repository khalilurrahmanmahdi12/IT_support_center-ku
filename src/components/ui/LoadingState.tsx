export default function LoadingState({
  teks = 'Memuat data...',
}: {
  teks?: string
}) {
  return (
    <div className="flex min-h-[220px] flex-col items-center justify-center rounded-2xl border border-slate-200 bg-white p-8 text-center">
      <div className="h-9 w-9 animate-spin rounded-full border-4 border-slate-200 border-t-slate-900" />

      <p className="mt-4 text-sm font-semibold text-slate-700">
        {teks}
      </p>

      <p className="mt-1 text-xs text-slate-400">
        Mohon tunggu sebentar.
      </p>
    </div>
  )
}