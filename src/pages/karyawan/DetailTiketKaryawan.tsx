import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  UserCog,
} from 'lucide-react'

import {
  useNavigate,
  useParams,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'
import { useTicketStore } from '../../store/ticketStore'

export default function DetailTiketKaryawan() {
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

  const tutupTiket = useTicketStore(
    (state) => state.tutupTiket,
  )

  const milikPengguna =
    tiket &&
    pengguna &&
    (
      tiket.nomorWhatsApp ===
        pengguna.nomorWhatsApp ||
      tiket.karyawan ===
        pengguna.nama
    )

  if (
    !tiket ||
    !milikPengguna
  ) {
    return (
      <div className="rounded-2xl border border-slate-200 bg-white p-10 text-center">
        <h1 className="text-xl font-bold text-slate-900">
          Tiket tidak ditemukan
        </h1>

        <p className="mt-2 text-sm text-slate-500">
          Tiket tidak tersedia atau bukan milik akun Anda.
        </p>

        <button
          type="button"
          onClick={() =>
            navigate('/karyawan/tiket')
          }
          className="mt-5 rounded-xl bg-slate-900 px-5 py-3 text-sm font-semibold text-white"
        >
          Kembali ke Tiket Saya
        </button>
      </div>
    )
  }

  const handleKonfirmasi = () => {
    tutupTiket(tiket.id)
  }

  return (
    <div className="space-y-6">
      <button
        type="button"
        onClick={() =>
          navigate('/karyawan/tiket')
        }
        className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
      >
        <ArrowLeft size={18} />
        Kembali ke Tiket Saya
      </button>

      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <p className="text-sm font-semibold text-slate-400">
          {tiket.id}
        </p>

        <div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900">
              {tiket.judul}
            </h1>

            <p className="mt-2 text-sm text-slate-500">
              Dibuat pada {tiket.dibuatPada}
            </p>
          </div>

          <span className="w-fit rounded-full bg-slate-100 px-3 py-1.5 text-xs font-semibold text-slate-700">
            {tiket.status}
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Deskripsi Kendala
            </h2>

            <p className="mt-4 text-sm leading-7 text-slate-600">
              {tiket.deskripsi}
            </p>
          </div>

          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Riwayat Tiket
            </h2>

            <div className="mt-6 space-y-6">
              {tiket.riwayat.map(
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
              )}
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-slate-200 bg-white p-6">
            <h2 className="font-bold text-slate-900">
              Informasi Penanganan
            </h2>

            <div className="mt-5 space-y-5">
              <div className="flex gap-3">
                <UserCog
                  size={18}
                  className="mt-0.5 text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Teknisi
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {tiket.teknisi ??
                      'Belum ditugaskan'}
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <Clock3
                  size={18}
                  className="mt-0.5 text-slate-400"
                />

                <div>
                  <p className="text-xs text-slate-400">
                    Status
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {tiket.status}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {tiket.catatanPenyelesaian && (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-6">
              <div className="flex items-center gap-2 text-emerald-700">
                <CheckCircle2
                  size={19}
                />

                <h2 className="font-bold">
                  Penyelesaian
                </h2>
              </div>

              <p className="mt-4 text-sm leading-6 text-emerald-700">
                {tiket.catatanPenyelesaian}
              </p>
            </div>
          )}

          {tiket.status === 'Selesai' && (
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <h2 className="font-bold text-slate-900">
                Konfirmasi Penyelesaian
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Jika kendala sudah benar-benar selesai,
                konfirmasi untuk menutup tiket.
              </p>

              <button
                type="button"
                onClick={handleKonfirmasi}
                className="mt-5 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                Konfirmasi & Tutup Tiket
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}