import type {
  ReactNode,
} from 'react'

interface SectionCardProps {
  children: ReactNode
  className?: string
}

export default function SectionCard({
  children,
  className = '',
}: SectionCardProps) {
  return (
    <div
      className={`rounded-2xl border border-slate-200 bg-white ${className}`}
    >
      {children}
    </div>
  )
}