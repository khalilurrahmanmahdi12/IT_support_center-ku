import {
  Eye,
  Search,
  SlidersHorizontal,
  UserRoundCheck,
} from 'lucide-react'

import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { useTicketStore } from '../../store/ticketStore'

export default function SemuaTiket() {
  const navigate = useNavigate()

  const tiket = useTicketStore(
    (state) => state.tiket,
  )

  const [pencarian, setPencarian] = useState('')
  const [filterStatus, setFilterStatus] = useState('Semua')
  const [filterPrioritas, setFilterPrioritas] = useState('Semua')

  const tiketTerfilter = useMemo(() => {
    return tiket.filter((item) => {
      const keyword = pencarian.toLowerCase()

      const cocokPencarian =
        item.id.toLowerCase().includes(keyword) ||
        item.judul.toLowerCase().includes(keyword) ||
        item.karyawan.toLowerCase().includes(keyword)

      const cocokStatus =
        filterStatus === 'Semua' ||
        item.status === filterStatus

      const cocokPrioritas =
        filterPrioritas === 'Semua' ||
        item.prioritas === filterPrioritas

      return (
        cocokPencarian &&
        cocokStatus &&
        cocokPrioritas
      )
    })
  }, [
    tiket,
    pencarian,
    filterStatus,
    filterPrioritas,
  ])

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Manajemen Tiket
        </p>

        <h1 className="mt-1 text-2xl font-bold text-slate-900">
          Semua Tiket
        </h1>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-4">
          <div className="relative lg:col-span-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={pencarian}
              onChange={(event) =>
                setPencarian(event.target.value)
              }
              placeholder="Cari tiket..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none"
            />
          </div>

          <div className="relative">
            <SlidersHorizontal
              size={17}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <select
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(event.target.value)
              }
              className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-11 pr-4 text-sm"
            >
              <option value="Semua">Semua Status</option>
              <option value="Terbuka">Terbuka</option>
              <option value="Sedang Diproses">
                Sedang Diproses
              </option>
              <option value="Selesai">Selesai</option>
              <option value="Ditutup">Ditutup</option>
            </select>
          </div>

          <select
            value={filterPrioritas}
            onChange={(event) =>
              setFilterPrioritas(event.target.value)
            }
            className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm"
          >
            <option value="Semua">
              Semua Prioritas
            </option>
            <option value="Rendah">Rendah</option>
            <option value="Sedang">Sedang</option>
            <option value="Tinggi">Tinggi</option>
            <option value="Kritis">Kritis</option>
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="bg-slate-50">
                <th className="px-6 py-3 text-left text-xs text-slate-400">
                  Tiket
                </th>
                <th className="px-6 py-3 text-left text-xs text-slate-400">
                  Pelapor
                </th>
                <th className="px-6 py-3 text-left text-xs text-slate-400">
                  Kategori
                </th>
                <th className="px-6 py-3 text-left text-xs text-slate-400">
                  Prioritas
                </th>
                <th className="px-6 py-3 text-left text-xs text-slate-400">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs text-slate-400">
                  Teknisi
                </th>
                <th className="px-6 py-3 text-right text-xs text-slate-400">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {tiketTerfilter.map((item) => (
                <tr
                  key={item.id}
                  className="border-t border-slate-100"
                >
                  <td className="px-6 py-4">
                    <p className="text-xs text-slate-400">
                      {item.id}
                    </p>
                    <p className="font-semibold text-slate-800">
                      {item.judul}
                    </p>
                  </td>

                  <td className="px-6 py-4">
                    {item.karyawan}
                  </td>

                  <td className="px-6 py-4">
                    {item.kategori}
                  </td>

                  <td className="px-6 py-4">
                    {item.prioritas}
                  </td>

                  <td className="px-6 py-4">
                    {item.status}
                  </td>

                  <td className="px-6 py-4">
                    {item.teknisi ?? 'Belum ditugaskan'}
                  </td>

                  <td className="px-6 py-4">
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() =>
                          navigate(`/admin/tiket/${item.id}`)
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200"
                      >
                        <Eye size={17} />
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          navigate(
                            `/admin/tiket/${item.id}?aksi=tugaskan`,
                          )
                        }
                        className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-900 text-white"
                      >
                        <UserRoundCheck size={17} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}