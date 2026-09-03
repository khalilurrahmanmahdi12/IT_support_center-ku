import type {
  ReactNode,
} from 'react'

interface PageHeaderProps {
  eyebrow?: string
  judul: string
  deskripsi?: string
  action?: ReactNode
}

export default function PageHeader({
  eyebrow,
  judul,
  deskripsi,
  action,
}: PageHeaderProps) {
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        {eyebrow && (
          <p className="text-sm font-medium text-slate-500">
            {eyebrow}
          </p>
        )}

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          {judul}
        </h1>

        {deskripsi && (
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            {deskripsi}
          </p>
        )}
      </div>

      {action && (
        <div className="w-full sm:w-auto">
          {action}
        </div>
      )}
    </div>
  )
}