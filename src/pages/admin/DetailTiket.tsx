import type { ElementType } from 'react'

import {
  ArrowLeft,
  Building2,
  CalendarDays,
  CircleUserRound,
  Laptop,
  Tag,
  UserCog,
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import {
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

import { dataTeknisi } from '../../data/teknisi'
import { useTicketStore } from '../../store/ticketStore'

export default function DetailTiket() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [searchParams] = useSearchParams()

  const tiket = useTicketStore(
    (state) =>
      state.tiket.find(
        (item) => item.id === id,
      ),
  )

  const tugaskanTeknisi = useTicketStore(
    (state) => state.tugaskanTeknisi,
  )

  const [modalTugaskan, setModalTugaskan] =
    useState(false)

  const [teknisiDipilih, setTeknisiDipilih] =
    useState('')

  const [pesanSukses, setPesanSukses] =
    useState('')

  useEffect(() => {
    if (searchParams.get('aksi') === 'tugaskan') {
      setModalTugaskan(true)
    }
  }, [searchParams])

  useEffect(() => {
    if (tiket?.teknisi) {
      setTeknisiDipilih(tiket.teknisi)
    }
  }, [tiket?.teknisi])

  if (!tiket) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Tiket tidak ditemukan
        </h1>

        <button
          type="button"
          onClick={() => navigate('/admin/tiket')}
          className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Kembali ke Semua Tiket
        </button>
      </div>
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

      case 'Rendah':
        return 'bg-slate-100 text-slate-600'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  const handleTugaskan = () => {
    if (!teknisiDipilih) {
      return
    }

    tugaskanTeknisi(
      tiket.id,
      teknisiDipilih,
    )

    setModalTugaskan(false)

    setPesanSukses(
      `Tiket berhasil ditugaskan kepada ${teknisiDipilih}.`,
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() => navigate('/admin/tiket')}
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Kembali ke Semua Tiket
        </button>

        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <p className="text-sm font-semibold text-slate-400">
              {tiket.id}
            </p>

            <h1 className="mt-2 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
              {tiket.judul}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Dilaporkan pada {tiket.dibuatPada}
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${warnaPrioritas(
                tiket.prioritas,
              )}`}
            >
              {tiket.prioritas}
            </span>

            <span
              className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold ${warnaStatus(
                tiket.status,
              )}`}
            >
              {tiket.status}
            </span>
          </div>
        </div>
      </div>

      {pesanSukses && (
        <div className="rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700">
          {pesanSukses}
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <div className="space-y-6 xl:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-slate-900">
              Informasi Tiket
            </h2>

            <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2">
              <InfoItem
                icon={CircleUserRound}
                label="Pelapor"
                nilai={tiket.karyawan}
              />

              <InfoItem
                icon={Building2}
                label="Departemen"
                nilai={tiket.departemen}
              />

              <InfoItem
                icon={Laptop}
                label="Kategori"
                nilai={tiket.kategori}
              />

              <InfoItem
                icon={Tag}
                label="Prioritas"
                nilai={tiket.prioritas}
              />

              <InfoItem
                icon={CalendarDays}
                label="Tanggal Dibuat"
                nilai={tiket.dibuatPada}
              />

              <InfoItem
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
                tiket.riwayat.map((aktivitas) => (
                  <Aktivitas
                    key={aktivitas.id}
                    judul={aktivitas.judul}
                    keterangan={aktivitas.keterangan}
                    waktu={aktivitas.waktu}
                  />
                ))
              ) : (
                <p className="text-sm text-slate-400">
                  Belum ada riwayat aktivitas.
                </p>
              )}
            </div>
          </div>
        </div>

        <div>
          <div className="sticky top-28 rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="text-base font-bold text-slate-900">
              Penanganan Tiket
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Tugaskan teknisi yang sesuai untuk menangani kendala ini.
            </p>

            <div className="mt-6 rounded-xl bg-slate-50 p-4">
              <p className="text-xs font-medium text-slate-400">
                Teknisi Saat Ini
              </p>

              <p className="mt-1 text-sm font-semibold text-slate-700">
                {tiket.teknisi ??
                  'Belum ditugaskan'}
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModalTugaskan(true)}
              className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              {tiket.teknisi
                ? 'Ganti Teknisi'
                : 'Tugaskan Teknisi'}
            </button>
          </div>
        </div>
      </div>

      {modalTugaskan && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <h2 className="text-xl font-bold text-slate-900">
              Tugaskan Teknisi
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Pilih teknisi yang akan menangani tiket{' '}
              <span className="font-semibold text-slate-700">
                {tiket.id}
              </span>
              .
            </p>

            <div className="mt-6 space-y-3">
              {dataTeknisi.map((teknisi) => (
                <label
                  key={teknisi.id}
                  className={`flex cursor-pointer items-center justify-between gap-4 rounded-xl border p-4 transition ${
                    teknisiDipilih === teknisi.nama
                      ? 'border-slate-900 bg-slate-50'
                      : 'border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {teknisi.nama}
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      {teknisi.spesialisasi}
                    </p>
                  </div>

                  <div className="flex items-center gap-3">
                    <span
                      className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                        teknisi.status === 'Tersedia'
                          ? 'bg-emerald-50 text-emerald-700'
                          : 'bg-amber-50 text-amber-700'
                      }`}
                    >
                      {teknisi.status}
                    </span>

                    <input
                      type="radio"
                      name="teknisi"
                      value={teknisi.nama}
                      checked={
                        teknisiDipilih === teknisi.nama
                      }
                      onChange={() =>
                        setTeknisiDipilih(
                          teknisi.nama,
                        )
                      }
                    />
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() =>
                  setModalTugaskan(false)
                }
                className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
              >
                Batal
              </button>

              <button
                type="button"
                disabled={!teknisiDipilih}
                onClick={handleTugaskan}
                className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
              >
                Simpan Penugasan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function InfoItem({
  icon: Icon,
  label,
  nilai,
}: {
  icon: ElementType
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

function Aktivitas({
  judul,
  keterangan,
  waktu,
}: {
  judul: string
  keterangan: string
  waktu: string
}) {
  return (
    <div className="flex gap-4">
      <div className="mt-1 h-3 w-3 shrink-0 rounded-full bg-slate-900" />

      <div>
        <p className="text-sm font-semibold text-slate-800">
          {judul}
        </p>

        <p className="mt-1 text-sm text-slate-500">
          {keterangan}
        </p>

        <p className="mt-2 text-xs text-slate-400">
          {waktu}
        </p>
      </div>
    </div>
  )
}