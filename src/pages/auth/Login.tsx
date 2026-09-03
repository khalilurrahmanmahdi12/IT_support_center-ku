import { useState } from 'react'
import {
  ArrowRight,
  Headphones,
  Phone,
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

export default function Login() {
  const navigate = useNavigate()

  const setNomorWhatsApp = useAuthStore(
    (state) => state.setNomorWhatsApp,
  )

  const [nomor, setNomor] = useState('')
  const [error, setError] = useState('')

  const handleNomorChange = (value: string) => {
    const angkaSaja = value.replace(/\D/g, '').slice(0, 15)

    setNomor(angkaSaja)
    setError('')
  }

  const handleSubmit = (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault()

    if (nomor.length < 10) {
      setError('Masukkan nomor WhatsApp yang valid.')
      return
    }

    setNomorWhatsApp(nomor)

    navigate('/verifikasi-otp')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-md">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Headphones size={24} />
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold tracking-tight text-slate-900">
              IT Support Center
            </h1>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Masuk menggunakan nomor WhatsApp untuk mengakses
              layanan bantuan teknologi informasi perusahaan.
            </p>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8"
          >
            <label
              htmlFor="nomorWhatsApp"
              className="mb-2 block text-sm font-semibold text-slate-700"
            >
              Nomor WhatsApp
            </label>

            <div className="relative">
              <Phone
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                id="nomorWhatsApp"
                type="tel"
                inputMode="numeric"
                value={nomor}
                onChange={(event) =>
                  handleNomorChange(event.target.value)
                }
                placeholder="08xxxxxxxxxx"
                className="w-full rounded-2xl border border-slate-200 bg-white py-3.5 pl-11 pr-4 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
              />
            </div>

            {error && (
              <p className="mt-2 text-sm text-red-500">
                {error}
              </p>
            )}

            <button
              type="submit"
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-slate-800"
            >
              Kirim Kode OTP
              <ArrowRight size={18} />
            </button>
          </form>
        </div>

        <p className="mt-6 text-center text-xs leading-5 text-slate-400">
          Sistem layanan bantuan IT internal perusahaan.
        </p>
      </div>
    </div>
  )
}