import {
  BadgeCheck,
  BriefcaseBusiness,
  Hash,
  Phone,
  ShieldCheck,
  UserRound,
} from 'lucide-react'

import { useAuthStore } from '../store/authStore'

const labelRole = {
  admin: 'Administrator',
  teknisi: 'Teknisi IT',
  karyawan: 'Karyawan',
}

const deskripsiRole = {
  admin:
    'Memiliki akses penuh untuk mengelola tiket, pengguna, teknisi, departemen, dan laporan.',
  teknisi:
    'Menangani tiket bantuan IT yang ditugaskan dan memperbarui progres pekerjaan.',
  karyawan:
    'Membuat tiket bantuan IT serta memantau proses penyelesaian kendala.',
}

export default function Profil() {
  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  if (!pengguna) {
    return null
  }

  const namaRole =
    labelRole[pengguna.role]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <p className="text-sm font-medium text-slate-500">
          Akun
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Profil
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Informasi akun yang digunakan untuk mengakses
          IT Support Center.
        </p>
      </div>

      {/* Profile Hero */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="border-b border-slate-100 bg-slate-50/70 px-6 py-8">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-900 text-white shadow-sm">
              <UserRound size={34} />
            </div>

            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <h2 className="text-2xl font-bold text-slate-900">
                  {pengguna.nama}
                </h2>

                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                  <BadgeCheck size={14} />
                  Aktif
                </span>
              </div>

              <p className="mt-2 text-sm font-medium text-slate-500">
                {namaRole}
              </p>

              <p className="mt-1 max-w-2xl text-sm leading-6 text-slate-500">
                {deskripsiRole[pengguna.role]}
              </p>
            </div>
          </div>
        </div>

        {/* Detail */}
        <div className="grid grid-cols-1 divide-y divide-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
          <InfoAkun
            icon={UserRound}
            label="Nama Lengkap"
            nilai={pengguna.nama}
          />

          <InfoAkun
            icon={Phone}
            label="Nomor WhatsApp"
            nilai={pengguna.nomorWhatsApp}
          />
        </div>

        <div className="grid grid-cols-1 divide-y divide-slate-100 border-t border-slate-100 md:grid-cols-2 md:divide-x md:divide-y-0">
          <InfoAkun
            icon={Hash}
            label="ID Pengguna"
            nilai={pengguna.id}
          />

          <InfoAkun
            icon={BriefcaseBusiness}
            label="Peran Akun"
            nilai={namaRole}
          />
        </div>
      </div>

      {/* Role Access */}
      <div className="rounded-2xl border border-slate-200 bg-white p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
            <ShieldCheck size={21} />
          </div>

          <div>
            <h2 className="text-base font-bold text-slate-900">
              Hak Akses
            </h2>

            <p className="mt-1 text-sm leading-6 text-slate-500">
              Hak akses ditentukan secara otomatis berdasarkan
              peran akun yang digunakan saat masuk.
            </p>

            <div className="mt-4">
              <span className="inline-flex rounded-full bg-slate-900 px-3 py-1.5 text-xs font-semibold text-white">
                {namaRole}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Informasi */}
      <div className="rounded-2xl border border-blue-100 bg-blue-50/50 p-5">
        <p className="text-sm font-semibold text-blue-900">
          Informasi Akun
        </p>

        <p className="mt-1 text-sm leading-6 text-blue-700">
          Nomor WhatsApp digunakan sebagai identitas utama
          untuk proses masuk dan identifikasi pengguna pada
          sistem demo.
        </p>
      </div>
    </div>
  )
}

function InfoAkun({
  icon: Icon,
  label,
  nilai,
}: {
  icon: typeof UserRound
  label: string
  nilai: string
}) {
  return (
    <div className="flex items-center gap-4 p-6">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-500">
        <Icon size={18} />
      </div>

      <div className="min-w-0">
        <p className="text-xs font-semibold uppercase tracking-wide text-slate-400">
          {label}
        </p>

        <p className="mt-1 truncate text-sm font-semibold text-slate-800">
          {nilai}
        </p>
      </div>
    </div>
  )
}