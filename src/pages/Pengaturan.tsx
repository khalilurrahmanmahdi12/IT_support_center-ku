import {
  Bell,
  Check,
  CheckCircle2,
  MessageCircle,
  RefreshCcw,
  RotateCcw,
  Settings2,
  ShieldAlert,
  TicketCheck,
  UserCog,
  
} from 'lucide-react'

import {
  useEffect,
  useState,
} from 'react'

import { useAuthStore } from '../store/authStore'
import { useTicketStore } from '../store/ticketStore'

interface PreferensiNotifikasi {
  whatsapp: boolean
  perubahanStatus: boolean
  tiketSelesai: boolean
  penugasan: boolean
}

const PREFERENCE_KEY =
  'it-support-preferences'

const preferensiAwal: PreferensiNotifikasi = {
  whatsapp: true,
  perubahanStatus: true,
  tiketSelesai: true,
  penugasan: true,
}

export default function Pengaturan() {
  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  const resetTiket = useTicketStore(
    (state) => state.resetTiket,
  )

  const [
    preferensi,
    setPreferensi,
  ] =
    useState<PreferensiNotifikasi>(
      preferensiAwal,
    )

  const [
    tampilResetData,
    setTampilResetData,
  ] = useState(false)

  const [
    tersimpan,
    setTersimpan,
  ] = useState(false)

  useEffect(() => {
    const data =
      localStorage.getItem(
        PREFERENCE_KEY,
      )

    if (!data) {
      return
    }

    try {
      const parsed =
        JSON.parse(data)

      setPreferensi({
        ...preferensiAwal,
        ...parsed,
      })
    } catch {
      localStorage.removeItem(
        PREFERENCE_KEY,
      )
    }
  }, [])

  const ubahPreferensi = (
    key: keyof PreferensiNotifikasi,
  ) => {
    setPreferensi(
      (sebelumnya) => ({
        ...sebelumnya,
        [key]:
          !sebelumnya[key],
      }),
    )

    setTersimpan(false)
  }

  const simpanPengaturan = () => {
    localStorage.setItem(
      PREFERENCE_KEY,
      JSON.stringify(preferensi),
    )

    setTersimpan(true)

    window.setTimeout(() => {
      setTersimpan(false)
    }, 2500)
  }

  const resetPreferensi = () => {
    setPreferensi(
      preferensiAwal,
    )

    localStorage.setItem(
      PREFERENCE_KEY,
      JSON.stringify(
        preferensiAwal,
      ),
    )

    setTersimpan(true)

    window.setTimeout(() => {
      setTersimpan(false)
    }, 2500)
  }

  const konfirmasiResetData = () => {
    resetTiket()

    localStorage.removeItem(
      PREFERENCE_KEY,
    )

    setPreferensi(
      preferensiAwal,
    )

    setTampilResetData(false)

    /*
      Reload digunakan agar state demo pada halaman
      Karyawan, Teknisi, dan Departemen kembali
      ke data awal masing-masing.
    */
    window.location.reload()
  }

  if (!pengguna) {
    return null
  }

  const tampilkanPenugasan =
    pengguna.role === 'admin' ||
    pengguna.role === 'teknisi'

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-slate-500">
          Preferensi Akun
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Pengaturan
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Atur preferensi notifikasi dan konfigurasi
          penggunaan IT Support Center.
        </p>
      </div>

      {/* Info Akun */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-900 text-white">
              <Settings2 size={20} />
            </div>

            <div>
              <p className="text-sm font-bold text-slate-900">
                {pengguna.nama}
              </p>

              <p className="mt-1 text-xs text-slate-500">
                {pengguna.nomorWhatsApp}
                {' • '}
                {pengguna.role === 'admin'
                  ? 'Administrator'
                  : pengguna.role === 'teknisi'
                    ? 'Teknisi IT'
                    : 'Karyawan'}
              </p>
            </div>
          </div>

          <span className="w-fit rounded-full bg-emerald-50 px-3 py-1.5 text-xs font-semibold text-emerald-700">
            Akun Aktif
          </span>
        </div>
      </div>

      {/* Notifikasi */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 px-6 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
              <Bell size={19} />
            </div>

            <div>
              <h2 className="text-base font-bold text-slate-900">
                Preferensi Notifikasi
              </h2>

              <p className="mt-1 text-sm text-slate-500">
                Tentukan informasi yang ingin Anda terima.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y divide-slate-100">
          <PengaturanToggle
            icon={MessageCircle}
            judul="Notifikasi WhatsApp"
            deskripsi="Izinkan sistem mengirim informasi layanan melalui nomor WhatsApp akun."
            aktif={preferensi.whatsapp}
            onChange={() =>
              ubahPreferensi(
                'whatsapp',
              )
            }
          />

          <PengaturanToggle
            icon={Bell}
            judul="Perubahan Status Tiket"
            deskripsi="Terima notifikasi ketika status tiket mengalami perubahan."
            aktif={
              preferensi.perubahanStatus
            }
            onChange={() =>
              ubahPreferensi(
                'perubahanStatus',
              )
            }
          />

          <PengaturanToggle
            icon={TicketCheck}
            judul="Tiket Selesai"
            deskripsi="Terima informasi ketika proses penanganan tiket telah selesai."
            aktif={
              preferensi.tiketSelesai
            }
            onChange={() =>
              ubahPreferensi(
                'tiketSelesai',
              )
            }
          />

          {tampilkanPenugasan && (
            <PengaturanToggle
              icon={UserCog}
              judul="Penugasan Teknisi"
              deskripsi={
                pengguna.role ===
                'admin'
                  ? 'Terima pemberitahuan terkait penugasan teknisi pada tiket.'
                  : 'Terima pemberitahuan ketika tiket baru ditugaskan kepada Anda.'
              }
              aktif={
                preferensi.penugasan
              }
              onChange={() =>
                ubahPreferensi(
                  'penugasan',
                )
              }
            />
          )}
        </div>

        <div className="flex flex-col-reverse gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <button
            type="button"
            onClick={resetPreferensi}
            className="flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
          >
            <RotateCcw size={16} />
            Reset Preferensi
          </button>

          <button
            type="button"
            onClick={simpanPengaturan}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
          >
            {tersimpan ? (
              <>
                <Check size={17} />
                Tersimpan
              </>
            ) : (
              <>
                <CheckCircle2 size={17} />
                Simpan Pengaturan
              </>
            )}
          </button>
        </div>
      </div>

      {/* Data Demo hanya Admin */}
      {pengguna.role === 'admin' && (
        <div className="overflow-hidden rounded-2xl border border-red-200 bg-white">
          <div className="p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600">
                  <RefreshCcw size={20} />
                </div>

                <div>
                  <h2 className="text-base font-bold text-slate-900">
                    Reset Data Demo
                  </h2>

                  <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                    Kembalikan data tiket dan konfigurasi demo
                    ke kondisi awal aplikasi.
                  </p>

                  <p className="mt-2 text-xs font-medium text-red-600">
                    Data perubahan yang dibuat selama sesi demo akan dihapus.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() =>
                  setTampilResetData(
                    true,
                  )
                }
                className="flex shrink-0 items-center justify-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2.5 text-sm font-semibold text-red-700 transition hover:bg-red-100"
              >
                <RefreshCcw size={16} />
                Reset Data Demo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Reset */}
      {tampilResetData && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <ShieldAlert size={22} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Reset Data Demo?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Semua perubahan pada data demo akan dikembalikan
                ke kondisi awal aplikasi.
              </p>

              <div className="mt-5 rounded-xl border border-red-100 bg-red-50/70 p-4">
                <p className="text-sm font-semibold text-red-800">
                  Data yang akan direset
                </p>

                <div className="mt-3 space-y-2 text-sm text-red-700">
                  <p>• Data dan status tiket</p>
                  <p>• Penugasan teknisi</p>
                  <p>• Preferensi notifikasi</p>
                  <p>• Perubahan data demo pada halaman manajemen</p>
                </div>
              </div>

              <p className="mt-4 text-xs leading-5 text-slate-400">
                Sesi login Administrator tetap dipertahankan.
              </p>
            </div>

            <div className="flex justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setTampilResetData(
                    false,
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={
                  konfirmasiResetData
                }
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <RefreshCcw size={16} />
                Ya, Reset Data
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function PengaturanToggle({
  icon: Icon,
  judul,
  deskripsi,
  aktif,
  onChange,
}: {
  icon: typeof Bell
  judul: string
  deskripsi: string
  aktif: boolean
  onChange: () => void
}) {
  return (
    <div className="flex items-center justify-between gap-5 px-6 py-5">
      <div className="flex min-w-0 items-start gap-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
          <Icon size={18} />
        </div>

        <div>
          <p className="text-sm font-semibold text-slate-800">
            {judul}
          </p>

          <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
            {deskripsi}
          </p>
        </div>
      </div>

      <button
        type="button"
        role="switch"
        aria-checked={aktif}
        onClick={onChange}
        className={`relative h-7 w-12 shrink-0 rounded-full transition ${
          aktif
            ? 'bg-slate-900'
            : 'bg-slate-200'
        }`}
      >
        <span
          className={`absolute top-1 h-5 w-5 rounded-full bg-white shadow-sm transition-all ${
            aktif
              ? 'left-6'
              : 'left-1'
          }`}
        />
      </button>
    </div>
  )
}