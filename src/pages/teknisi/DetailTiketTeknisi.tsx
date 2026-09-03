import {
  AlertCircle,
  ArrowLeft,
  Building2,
  CalendarDays,
  CheckCircle2,
  CircleUserRound,
  Laptop,
  Tag,
  UserCog,
} from 'lucide-react'

import { useState } from 'react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import { useTicketStore } from '../../store/ticketStore'

export default function DetailTiketTeknisi() {
  const navigate = useNavigate()
  const { id } = useParams()

  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  const tiket = useTicketStore(
    (state) =>
      state.tiket.find(
        (item) => item.id === id,
      ),
  )

  const ubahStatus = useTicketStore(
    (state) => state.ubahStatus,
  )

  const selesaikanTiket = useTicketStore(
    (state) => state.selesaikanTiket,
  )

  const [catatan, setCatatan] =
    useState(
      tiket?.catatanPenyelesaian ?? '',
    )

  const [error, setError] =
    useState('')

  const [pesanSukses, setPesanSukses] =
    useState('')

  const tiketMilikTeknisi =
    tiket &&
    pengguna &&
    tiket.teknisi === pengguna.nama

  if (
    !tiket ||
    !tiketMilikTeknisi
  ) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Tiket tidak ditemukan
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Tiket tidak tersedia atau tidak ditugaskan kepada akun Anda.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate('/teknisi/tiket')
          }
          className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          Kembali ke Tiket Ditugaskan
        </button>
      </div>
    )
  }

  const handleMulaiPenanganan = () => {
    if (
      tiket.status === 'Selesai' ||
      tiket.status === 'Ditutup'
    ) {
      return
    }

    ubahStatus(
      tiket.id,
      'Sedang Diproses',
    )

    setPesanSukses(
      'Penanganan tiket berhasil dimulai.',
    )

    setError('')
  }

  const handleSelesaikan = () => {
    if (
      catatan.trim().length < 10
    ) {
      setError(
        'Catatan penyelesaian minimal 10 karakter.',
      )
      return
    }

    selesaikanTiket(
      tiket.id,
      catatan.trim(),
    )

    setError('')

    setPesanSukses(
      'Tiket berhasil diselesaikan dan menunggu konfirmasi karyawan.',
    )
  }

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

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate('/teknisi/tiket')
        }
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Kembali ke Tiket Ditugaskan
      </button>

      <div>
        <p className="text-sm font-semibold text-slate-400">
          {tiket.id}
        </p>

        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {tiket.judul}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Ditugaskan kepada {tiket.teknisi}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${warnaPrioritas(
                tiket.prioritas,
              )}`}
            >
              {tiket.prioritas}
            </span>

            <span
              className={`rounded-full px-3 py-1.5 text-xs font-semibold ${warnaStatus(
                tiket.status,
              )}`}
            >
              {tiket.status}
            </span>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          <AlertCircle
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            {error}
          </span>
        </div>
      )}

      {pesanSukses && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            {pesanSukses}
          </span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-slate-900">
              Informasi Tiket
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <Informasi
                icon={CircleUserRound}
                label="Pelapor"
                nilai={tiket.karyawan}
              />

              <Informasi
                icon={Building2}
                label="Departemen"
                nilai={tiket.departemen}
              />

              <Informasi
                icon={Laptop}
                label="Kategori"
                nilai={tiket.kategori}
              />

              <Informasi
                icon={Tag}
                label="Prioritas"
                nilai={tiket.prioritas}
              />

              <Informasi
                icon={CalendarDays}
                label="Tanggal Dibuat"
                nilai={tiket.dibuatPada}
              />

              <Informasi
                icon={UserCog}
                label="Teknisi"
                nilai={
                  tiket.teknisi ??
                  'Belum ditugaskan'
                }
              />
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-slate-900">
              Deskripsi Kendala
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {tiket.deskripsi}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-slate-900">
              Riwayat Aktivitas
            </h2>

            <div className="mt-6 space-y-6">
              {tiket.riwayat.length > 0 ? (
                tiket.riwayat.map(
                  (aktivitas) => (
                    <div
                      key={aktivitas.id}
                      className="flex gap-4"
                    >
                      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-slate-900" />

                      <div>
                        <p className="text-sm font-semibold text-slate-800">
                          {aktivitas.judul}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          {aktivitas.keterangan}
                        </p>

                        <p className="mt-2 text-xs text-slate-400">
                          {aktivitas.waktu}
                        </p>
                      </div>
                    </div>
                  ),
                )
              ) : (
                <p className="text-sm text-slate-400">
                  Belum ada riwayat aktivitas.
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-slate-900">
              Penanganan
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Perbarui proses penanganan tiket sesuai kondisi pekerjaan.
            </p>

            <div className="mt-5 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-400">
                Status Saat Ini
              </p>

              <p className="mt-1 text-sm font-bold text-slate-700">
                {tiket.status}
              </p>
            </div>

            {tiket.status === 'Terbuka' && (
              <button
                type="button"
                onClick={handleMulaiPenanganan}
                className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Mulai Penanganan
              </button>
            )}
          </div>

          {tiket.status !== 'Ditutup' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="text-base font-bold text-slate-900">
                Catatan Penyelesaian
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Jelaskan tindakan yang dilakukan untuk menyelesaikan kendala.
              </p>

              <textarea
                value={catatan}
                disabled={
                  tiket.status === 'Selesai'
                }
                onChange={(event) => {
                  setCatatan(
                    event.target.value,
                  )

                  setError('')
                }}
                rows={6}
                placeholder="Contoh: Melakukan konfigurasi ulang jaringan dan memperbarui driver perangkat..."
                className="mt-5 w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100 disabled:bg-slate-50"
              />

              {tiket.status !== 'Selesai' && (
                <button
                  type="button"
                  onClick={handleSelesaikan}
                  className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
                >
                  <CheckCircle2 size={17} />
                  Tandai Selesai
                </button>
              )}

              {tiket.status === 'Selesai' && (
                <div className="mt-4 rounded-xl bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
                  Menunggu konfirmasi penyelesaian dari karyawan.
                </div>
              )}
            </div>
          )}

          {tiket.status === 'Ditutup' && (
            <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
              <div className="flex items-center gap-2 text-slate-700">
                <CheckCircle2 size={19} />

                <h2 className="font-bold">
                  Tiket Ditutup
                </h2>
              </div>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Karyawan telah mengonfirmasi bahwa kendala selesai.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

function Informasi({
  icon: Icon,
  label,
  nilai,
}: {
  icon: React.ElementType
  label: string
  nilai: string
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
        <Icon size={18} />
      </div>

      <div>
        <p className="text-xs font-medium text-slate-400">
          {label}
        </p>

        <p className="mt-1 text-sm font-semibold text-slate-700">
          {nilai}
        </p>
      </div>
    </div>
  )
}