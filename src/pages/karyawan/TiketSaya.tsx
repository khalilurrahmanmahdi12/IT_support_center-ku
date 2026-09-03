import {
  ArrowRight,
  ClipboardList,
  Plus,
  Search,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import { useTicketStore } from '../../store/ticketStore'

export default function TiketSaya() {
  const navigate = useNavigate()

  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  const semuaTiket = useTicketStore(
    (state) => state.tiket,
  )

  const [pencarian, setPencarian] =
    useState('')

  const [filterStatus, setFilterStatus] =
    useState('Semua')

  const tiketSaya = useMemo(() => {
    if (!pengguna) {
      return []
    }

    return semuaTiket.filter(
      (tiket) => {
        const milikPengguna =
          tiket.nomorWhatsApp ===
            pengguna.nomorWhatsApp ||
          tiket.karyawan ===
            pengguna.nama

        const keyword =
          pencarian
            .trim()
            .toLowerCase()

        const cocokPencarian =
          tiket.id
            .toLowerCase()
            .includes(keyword) ||
          tiket.judul
            .toLowerCase()
            .includes(keyword)

        const cocokStatus =
          filterStatus ===
            'Semua' ||
          tiket.status ===
            filterStatus

        return (
          milikPengguna &&
          cocokPencarian &&
          cocokStatus
        )
      },
    )
  }, [
    semuaTiket,
    pengguna,
    pencarian,
    filterStatus,
  ])

  const warnaStatus = (
    status: string,
  ) => {
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

  const warnaPrioritas = (
    prioritas: string,
  ) => {
    switch (prioritas) {
      case 'Kritis':
        return 'bg-red-50 text-red-700'

      case 'Tinggi':
        return 'bg-orange-50 text-orange-700'

      case 'Sedang':
        return 'bg-yellow-50 text-yellow-700'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Layanan Bantuan IT
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Tiket Saya
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Pantau seluruh tiket bantuan IT yang Anda laporkan.
          </p>
        </div>

        <button
          type="button"
          onClick={() =>
            navigate(
              '/karyawan/tiket/baru',
            )
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={17} />
          Buat Tiket
        </button>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative md:col-span-2">
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
              placeholder="Cari ID atau judul tiket..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(event) =>
              setFilterStatus(
                event.target.value,
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none"
          >
            <option value="Semua">
              Semua Status
            </option>

            <option value="Terbuka">
              Terbuka
            </option>

            <option value="Sedang Diproses">
              Sedang Diproses
            </option>

            <option value="Selesai">
              Selesai
            </option>

            <option value="Ditutup">
              Ditutup
            </option>
          </select>
        </div>
      </div>

      {tiketSaya.length > 0 ? (
        <div className="grid grid-cols-1 gap-4">
          {tiketSaya.map(
            (tiket) => (
              <button
                key={tiket.id}
                type="button"
                onClick={() =>
                  navigate(
                    `/karyawan/tiket/${tiket.id}`,
                  )
                }
                className="w-full rounded-2xl border border-slate-200 bg-white p-5 text-left transition hover:border-slate-300 hover:shadow-sm"
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-slate-400">
                      {tiket.id}
                    </p>

                    <h2 className="mt-1 text-base font-bold text-slate-900">
                      {tiket.judul}
                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      {tiket.kategori}
                      {' • '}
                      {tiket.dibuatPada}
                    </p>
                  </div>

                  <div className="flex shrink-0 flex-wrap gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${warnaPrioritas(
                        tiket.prioritas,
                      )}`}
                    >
                      {tiket.prioritas}
                    </span>

                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${warnaStatus(
                        tiket.status,
                      )}`}
                    >
                      {tiket.status}
                    </span>
                  </div>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
                  <div>
                    <p className="text-xs text-slate-400">
                      Teknisi
                    </p>

                    <p className="mt-1 text-sm font-semibold text-slate-700">
                      {tiket.teknisi ??
                        'Belum ditugaskan'}
                    </p>
                  </div>

                  <ArrowRight
                    size={18}
                    className="text-slate-400"
                  />
                </div>
              </button>
            ),
          )}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-slate-300 bg-white px-6 py-16 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
            <ClipboardList
              size={22}
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-slate-700">
            Belum ada tiket
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Tiket yang Anda buat akan muncul di sini.
          </p>
        </div>
      )}
    </div>
  )
}