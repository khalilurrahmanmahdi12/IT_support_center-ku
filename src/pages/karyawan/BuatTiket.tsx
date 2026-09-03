import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  Send,
} from 'lucide-react'

import {
  useState,
} from 'react'

import {
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import { useTicketStore } from '../../store/ticketStore'

import type {
  KategoriTiket,
  PrioritasTiket,
} from '../../types/tiket'

export default function BuatTiket() {
  const navigate = useNavigate()

  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  const tambahTiket = useTicketStore(
    (state) => state.tambahTiket,
  )

  const [judul, setJudul] = useState('')
  const [deskripsi, setDeskripsi] = useState('')

  const [kategori, setKategori] =
    useState<KategoriTiket>('Perangkat Keras')

  const [prioritas, setPrioritas] =
    useState<PrioritasTiket>('Sedang')

  const [departemen, setDepartemen] =
    useState('Teknologi Informasi')

  const [error, setError] = useState('')
  const [berhasil, setBerhasil] = useState(false)

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (!pengguna) {
      setError('Data pengguna tidak ditemukan.')
      return
    }

    if (judul.trim().length < 5) {
      setError(
        'Judul tiket minimal 5 karakter.',
      )
      return
    }

    if (deskripsi.trim().length < 10) {
      setError(
        'Deskripsi kendala minimal 10 karakter.',
      )
      return
    }

    const tiketBaru = tambahTiket({
      judul: judul.trim(),
      deskripsi: deskripsi.trim(),
      karyawan: pengguna.nama,
      nomorWhatsApp:
        pengguna.nomorWhatsApp,
      departemen,
      kategori,
      prioritas,
    })

    setError('')
    setBerhasil(true)

    setTimeout(() => {
      navigate(
        `/karyawan/tiket/${tiketBaru.id}`,
        {
          replace: true,
        },
      )
    }, 800)
  }

  return (
    <div className="space-y-6">
      <div>
        <button
          type="button"
          onClick={() =>
            navigate('/karyawan')
          }
          className="mb-5 flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <p className="text-sm font-medium text-slate-500">
          Layanan Bantuan IT
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Buat Tiket
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Laporkan kendala teknologi informasi
          yang Anda alami agar dapat ditangani
          oleh tim IT.
        </p>
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

      {berhasil && (
        <div className="flex items-start gap-3 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700">
          <CheckCircle2
            size={18}
            className="mt-0.5 shrink-0"
          />

          <span>
            Tiket berhasil dibuat.
          </span>
        </div>
      )}

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label
              htmlFor="judul"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Judul Kendala
            </label>

            <input
              id="judul"
              type="text"
              value={judul}
              onChange={(event) => {
                setJudul(
                  event.target.value,
                )
                setError('')
              }}
              placeholder="Contoh: Laptop tidak dapat terhubung ke Wi-Fi"
              className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="kategori"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Kategori
            </label>

            <select
              id="kategori"
              value={kategori}
              onChange={(event) =>
                setKategori(
                  event.target
                    .value as KategoriTiket,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            >
              <option value="Perangkat Keras">
                Perangkat Keras
              </option>

              <option value="Perangkat Lunak">
                Perangkat Lunak
              </option>

              <option value="Jaringan">
                Jaringan
              </option>

              <option value="Akun & Akses">
                Akun & Akses
              </option>

              <option value="Lainnya">
                Lainnya
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="prioritas"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Prioritas
            </label>

            <select
              id="prioritas"
              value={prioritas}
              onChange={(event) =>
                setPrioritas(
                  event.target
                    .value as PrioritasTiket,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            >
              <option value="Rendah">
                Rendah
              </option>

              <option value="Sedang">
                Sedang
              </option>

              <option value="Tinggi">
                Tinggi
              </option>

              <option value="Kritis">
                Kritis
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="departemen"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Departemen
            </label>

            <select
              id="departemen"
              value={departemen}
              onChange={(event) =>
                setDepartemen(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            >
              <option value="Teknologi Informasi">
                Teknologi Informasi
              </option>

              <option value="Keuangan">
                Keuangan
              </option>

              <option value="SDM">
                SDM
              </option>

              <option value="Pemasaran">
                Pemasaran
              </option>

              <option value="Operasional">
                Operasional
              </option>

              <option value="Administrasi">
                Administrasi
              </option>

              <option value="Akuntansi">
                Akuntansi
              </option>
            </select>
          </div>

          <div>
            <label
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Pelapor
            </label>

            <div className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3">
              <p className="text-sm font-semibold text-slate-700">
                {pengguna?.nama ??
                  'Karyawan'}
              </p>

              <p className="mt-1 text-xs text-slate-400">
                {pengguna?.nomorWhatsApp}
              </p>
            </div>
          </div>

          <div className="lg:col-span-2">
            <label
              htmlFor="deskripsi"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Deskripsi Kendala
            </label>

            <textarea
              id="deskripsi"
              value={deskripsi}
              onChange={(event) => {
                setDeskripsi(
                  event.target.value,
                )
                setError('')
              }}
              rows={6}
              placeholder="Jelaskan kendala secara lengkap, termasuk kapan masalah mulai terjadi dan tindakan yang sudah dicoba."
              className="w-full resize-none rounded-xl border border-slate-200 px-4 py-3 text-sm leading-6 text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            />
          </div>
        </div>

        <div className="mt-6 flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
          <button
            type="button"
            onClick={() =>
              navigate('/karyawan')
            }
            className="rounded-xl border border-slate-200 px-5 py-3 text-sm font-semibold text-slate-600 transition hover:bg-slate-50"
          >
            Batal
          </button>

          <button
            type="submit"
            disabled={berhasil}
            className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-400"
          >
            <Send size={17} />

            Kirim Tiket
          </button>
        </div>
      </form>
    </div>
  )
}