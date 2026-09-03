import { useState } from 'react'
import {
  ArrowLeft,
  ShieldCheck,
} from 'lucide-react'
import {
  Navigate,
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

export default function VerifikasiOtp() {
  const navigate = useNavigate()

  const nomorWhatsApp = useAuthStore(
    (state) => state.nomorWhatsApp,
  )

  const verifikasiOtp = useAuthStore(
    (state) => state.verifikasiOtp,
  )

  const [otp, setOtp] = useState('')
  const [error, setError] = useState('')

  if (!nomorWhatsApp) {
    return <Navigate to="/login" replace />
  }

  const handleOtpChange = (value: string) => {
    const angkaSaja = value.replace(/\D/g, '').slice(0, 6)

    setOtp(angkaSaja)
    setError('')
  }

  const formatNomor = (nomor: string) => {
    if (nomor.length < 8) return nomor

    return `${nomor.slice(0, 4)} **** ${nomor.slice(-4)}`
  }

  const handleVerifikasi = () => {
    if (otp.length !== 6) {
      setError('Masukkan 6 digit kode OTP.')
      return
    }

    const pengguna = verifikasiOtp(otp)

    if (!pengguna) {
      setError('Kode OTP tidak valid.')
      return
    }

    switch (pengguna.role) {
      case 'admin':
        navigate('/admin', {
          replace: true,
        })
        break

      case 'teknisi':
        navigate('/teknisi', {
          replace: true,
        })
        break

      default:
        navigate('/karyawan', {
          replace: true,
        })
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <button
          type="button"
          onClick={() => navigate('/login')}
          className="mb-6 flex items-center gap-2 text-sm font-medium text-slate-500 transition hover:text-slate-900"
        >
          <ArrowLeft size={18} />
          Kembali
        </button>

        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <ShieldCheck size={24} />
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              Verifikasi nomor WhatsApp
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Masukkan kode verifikasi yang dikirim ke nomor
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-900">
              {formatNomor(nomorWhatsApp)}
            </p>
          </div>

          <div className="mt-8">
            <label
              htmlFor="otp"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Kode verifikasi
            </label>

            <input
              id="otp"
              type="text"
              inputMode="numeric"
              autoComplete="one-time-code"
              maxLength={6}
              value={otp}
              onChange={(event) =>
                handleOtpChange(event.target.value)
              }
              placeholder="000000"
              className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-4 text-center text-2xl font-bold tracking-[0.45em] text-slate-900 outline-none transition placeholder:text-slate-300 focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            />

            <p className="mt-3 text-center text-xs text-slate-400">
              Versi demo menerima 6 digit angka apa saja.
            </p>

            {error && (
              <p className="mt-3 text-center text-sm text-red-500">
                {error}
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={handleVerifikasi}
            disabled={otp.length !== 6}
            className="mt-7 w-full rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:cursor-not-allowed disabled:bg-slate-300"
          >
            Verifikasi dan Masuk
          </button>

          <div className="mt-6 border-t border-slate-100 pt-6 text-center">
            <p className="text-sm text-slate-500">
              Tidak menerima kode?
            </p>

            <button
              type="button"
              className="mt-1 text-sm font-semibold text-slate-900 transition hover:text-slate-600"
            >
              Kirim ulang kode
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Kode OTP pada versi ini hanya digunakan sebagai
          simulasi autentikasi.
        </p>
      </div>
    </div>
  )
}