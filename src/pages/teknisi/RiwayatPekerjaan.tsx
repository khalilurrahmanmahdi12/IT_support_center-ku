import {
  ArrowRight,
  History,
  Search,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import { useTicketStore } from '../../store/ticketStore'

export default function RiwayatPekerjaan() {
  const navigate = useNavigate()

  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  const semuaTiket = useTicketStore(
    (state) => state.tiket,
  )

  const [pencarian, setPencarian] =
    useState('')

  const riwayat = useMemo(() => {
    if (!pengguna) {
      return []
    }

    const keyword =
      pencarian
        .trim()
        .toLowerCase()

    return semuaTiket.filter(
      (tiket) => {
        const milikTeknisi =
          tiket.teknisi ===
          pengguna.nama

        const selesai =
          tiket.status ===
            'Selesai' ||
          tiket.status ===
            'Ditutup'

        const cocokPencarian =
          tiket.id
            .toLowerCase()
            .includes(keyword) ||
          tiket.judul
            .toLowerCase()
            .includes(keyword) ||
          tiket.karyawan
            .toLowerCase()
            .includes(keyword)

        return (
          milikTeknisi &&
          selesai &&
          cocokPencarian
        )
      },
    )
  }, [
    semuaTiket,
    pengguna,
    pencarian,
  ])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Penanganan IT
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Riwayat Pekerjaan
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Lihat tiket yang telah selesai Anda tangani.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative">
          <Search
            size={18}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
          />

          <input
            type="text"
            value={pencarian}
            onChange={(event) =>
              setPencarian(
                event.target.value,
              )
            }
            placeholder="Cari riwayat pekerjaan..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
          />
        </div>
      </div>

      {riwayat.length > 0 ? (
        <div className="space-y-4">
          {riwayat.map((tiket) => (
            <button
              key={tiket.id}
              type="button"
              onClick={() =>
                navigate(
                  `/teknisi/tiket/${tiket.id}`,
                )
              }
              className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-slate-300 hover:shadow-sm"
            >
              <div className="flex items-center justify-between gap-5">
                <div className="min-w-0">
                  <p className="text-xs font-semibold text-slate-400">
                    {tiket.id}
                  </p>

                  <p className="mt-1 truncate text-sm font-bold text-slate-900">
                    {tiket.judul}
                  </p>

                  <p className="mt-2 text-xs text-slate-500">
                    {tiket.karyawan}
                    {' • '}
                    {tiket.kategori}
                  </p>
                </div>

                <div className="flex shrink-0 items-center gap-4">
                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                      tiket.status ===
                      'Ditutup'
                        ? 'bg-slate-100 text-slate-600'
                        : 'bg-emerald-50 text-emerald-700'
                    }`}
                  >
                    {tiket.status}
                  </span>

                  <ArrowRight
                    size={18}
                    className="text-slate-400"
                  />
                </div>
              </div>
            </button>
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center">
          <History
            size={28}
            className="mx-auto text-slate-400"
          />

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Belum ada riwayat pekerjaan
          </p>
        </div>
      )}
    </div>
  )
}