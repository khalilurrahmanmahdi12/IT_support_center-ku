import type { ElementType } from 'react'

interface KartuStatistikProps {
  judul: string
  nilai: number | string
  keterangan: string
  icon: ElementType
}

export default function KartuStatistik({
  judul,
  nilai,
  keterangan,
  icon: Icon,
}: KartuStatistikProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {judul}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {nilai}
          </p>
        </div>

        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-700">
          <Icon
            size={20}
            strokeWidth={2}
          />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {keterangan}
      </p>
    </div>
  )
}