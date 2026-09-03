import { ArrowRight } from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useTicketStore } from '../../store/ticketStore'

export default function TiketTerbaru() {
  const navigate = useNavigate()

  const tiket = useTicketStore(
    (state) => state.tiket,
  )

  const tiketTerbaru = tiket.slice(0, 5)

  const warnaStatus = (status: string) => {
    switch (status) {
      case 'Terbuka':
        return 'bg-blue-50 text-blue-700'

      case 'Sedang Diproses':
        return 'bg-amber-50 text-amber-700'

      case 'Selesai':
        return 'bg-emerald-50 text-emerald-700'

      case 'Ditutup':
        return 'bg-slate-100 text-slate-600'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  const warnaPrioritas = (prioritas: string) => {
    switch (prioritas) {
      case 'Kritis':
        return 'bg-red-50 text-red-700'

      case 'Tinggi':
        return 'bg-orange-50 text-orange-700'

      case 'Sedang':
        return 'bg-yellow-50 text-yellow-700'

      case 'Rendah':
        return 'bg-slate-100 text-slate-600'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Tiket Terbaru
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Tiket bantuan IT yang baru masuk ke sistem.
          </p>
        </div>

        <button
          type="button"
          onClick={() => navigate('/admin/tiket')}
          className="flex items-center gap-2 text-sm font-semibold text-slate-700 transition hover:text-slate-950"
        >
          Lihat Semua
          <ArrowRight size={16} />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px]">
          <thead>
            <tr className="border-b border-slate-100 bg-slate-50">
              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Tiket
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Pelapor
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Kategori
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Prioritas
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Status
              </th>

              <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                Teknisi
              </th>
            </tr>
          </thead>

          <tbody>
            {tiketTerbaru.map((item) => (
              <tr
                key={item.id}
                className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
              >
                <td className="px-6 py-4">
                  <p className="text-xs font-semibold text-slate-400">
                    {item.id}
                  </p>

                  <p className="mt-1 max-w-64 truncate text-sm font-semibold text-slate-800">
                    {item.judul}
                  </p>
                </td>

                <td className="px-6 py-4">
                  <p className="text-sm font-medium text-slate-700">
                    {item.karyawan}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {item.departemen}
                  </p>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.kategori}
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${warnaPrioritas(
                      item.prioritas,
                    )}`}
                  >
                    {item.prioritas}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${warnaStatus(
                      item.status,
                    )}`}
                  >
                    {item.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-600">
                  {item.teknisi ?? 'Belum ditugaskan'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}