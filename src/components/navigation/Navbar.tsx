import {
  Bell,
  ChevronDown,
  LogOut,
  Menu,
  Settings,
  UserRound,
  X,
} from 'lucide-react'

import {
  useEffect,
  useRef,
  useState,
} from 'react'

import {
  useLocation,
  useNavigate,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

interface NavbarProps {
  bukaSidebar: () => void
}

interface Notifikasi {
  id: string
  judul: string
  deskripsi: string
  waktu: string
  dibaca: boolean
  path?: string
}

const notifikasiAdmin: Notifikasi[] = [
  {
    id: 'NOT-001',
    judul: 'Tiket baru dibuat',
    deskripsi:
      'Siti Rahma membuat tiket printer tidak dapat mencetak dokumen.',
    waktu: '5 menit lalu',
    dibaca: false,
    path: '/admin/tiket/TKT-002',
  },
  {
    id: 'NOT-002',
    judul: 'Tiket prioritas kritis',
    deskripsi:
      'Tiket koneksi internet lambat membutuhkan penanganan segera.',
    waktu: '12 menit lalu',
    dibaca: false,
    path: '/admin/tiket/TKT-003',
  },
  {
    id: 'NOT-003',
    judul: 'Tiket selesai ditangani',
    deskripsi:
      'Ardi Nugraha menyelesaikan kendala Microsoft Excel.',
    waktu: '1 jam lalu',
    dibaca: true,
    path: '/admin/tiket/TKT-004',
  },
]

const notifikasiTeknisi: Notifikasi[] = [
  {
    id: 'NOT-001',
    judul: 'Tiket baru ditugaskan',
    deskripsi:
      'Anda ditugaskan menangani tiket tidak dapat masuk ke email perusahaan.',
    waktu: '8 menit lalu',
    dibaca: false,
    path: '/teknisi/tiket/TKT-001',
  },
  {
    id: 'NOT-002',
    judul: 'Tiket perlu ditindaklanjuti',
    deskripsi:
      'Laptop tidak dapat menyala masih berstatus Sedang Diproses.',
    waktu: '35 menit lalu',
    dibaca: false,
    path: '/teknisi/tiket/TKT-005',
  },
]

const notifikasiKaryawan: Notifikasi[] = [
  {
    id: 'NOT-001',
    judul: 'Tiket sedang diproses',
    deskripsi:
      'Tiket bantuan IT Anda sedang ditangani oleh teknisi.',
    waktu: '10 menit lalu',
    dibaca: false,
    path: '/karyawan/tiket',
  },
  {
    id: 'NOT-002',
    judul: 'Tiket selesai',
    deskripsi:
      'Salah satu tiket Anda telah selesai dan menunggu konfirmasi.',
    waktu: '2 jam lalu',
    dibaca: false,
    path: '/karyawan/tiket',
  },
]

export default function Navbar({
  bukaSidebar,
}: NavbarProps) {
  const navigate = useNavigate()
  const location = useLocation()

  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  const logout = useAuthStore(
    (state) => state.logout,
  )

  const [
    profilTerbuka,
    setProfilTerbuka,
  ] = useState(false)

  const [
    notifikasiTerbuka,
    setNotifikasiTerbuka,
  ] = useState(false)

  const profilRef =
    useRef<HTMLDivElement | null>(null)

  const notifikasiRef =
    useRef<HTMLDivElement | null>(null)

  const ambilNotifikasiAwal = () => {
    if (pengguna?.role === 'admin') {
      return notifikasiAdmin
    }

    if (pengguna?.role === 'teknisi') {
      return notifikasiTeknisi
    }

    return notifikasiKaryawan
  }

  const [
    daftarNotifikasi,
    setDaftarNotifikasi,
  ] = useState<Notifikasi[]>(
    ambilNotifikasiAwal(),
  )

  useEffect(() => {
    if (
      pengguna?.role === 'admin'
    ) {
      setDaftarNotifikasi(
        notifikasiAdmin,
      )
      return
    }

    if (
      pengguna?.role === 'teknisi'
    ) {
      setDaftarNotifikasi(
        notifikasiTeknisi,
      )
      return
    }

    setDaftarNotifikasi(
      notifikasiKaryawan,
    )
  }, [pengguna?.role])

  useEffect(() => {
    const handleKlikLuar = (
      event: MouseEvent,
    ) => {
      const target =
        event.target as Node

      if (
        profilRef.current &&
        !profilRef.current.contains(
          target,
        )
      ) {
        setProfilTerbuka(false)
      }

      if (
        notifikasiRef.current &&
        !notifikasiRef.current.contains(
          target,
        )
      ) {
        setNotifikasiTerbuka(
          false,
        )
      }
    }

    document.addEventListener(
      'mousedown',
      handleKlikLuar,
    )

    return () => {
      document.removeEventListener(
        'mousedown',
        handleKlikLuar,
      )
    }
  }, [])

  useEffect(() => {
    setProfilTerbuka(false)
    setNotifikasiTerbuka(false)
  }, [location.pathname])

  if (!pengguna) {
    return null
  }

  const jumlahBelumDibaca =
    daftarNotifikasi.filter(
      (item) => !item.dibaca,
    ).length

  const labelRole =
    pengguna.role === 'admin'
      ? 'Administrator'
      : pengguna.role === 'teknisi'
        ? 'Teknisi IT'
        : 'Karyawan'

  const pathProfil =
    pengguna.role === 'admin'
      ? '/admin/profil'
      : pengguna.role === 'teknisi'
        ? '/teknisi/profil'
        : '/karyawan/profil'

  const pathPengaturan =
    pengguna.role === 'admin'
      ? '/admin/pengaturan'
      : pengguna.role === 'teknisi'
        ? '/teknisi/pengaturan'
        : '/karyawan/pengaturan'

  const handleLogout = () => {
    logout()

    navigate('/login', {
      replace: true,
    })
  }

  const toggleNotifikasi = () => {
    setNotifikasiTerbuka(
      (sebelumnya) =>
        !sebelumnya,
    )

    setProfilTerbuka(false)
  }

  const toggleProfil = () => {
    setProfilTerbuka(
      (sebelumnya) =>
        !sebelumnya,
    )

    setNotifikasiTerbuka(false)
  }

  const tandaiSemuaDibaca = () => {
    setDaftarNotifikasi(
      (sebelumnya) =>
        sebelumnya.map(
          (item) => ({
            ...item,
            dibaca: true,
          }),
        ),
    )
  }

  const bukaDetailNotifikasi = (
    notifikasi: Notifikasi,
  ) => {
    setDaftarNotifikasi(
      (sebelumnya) =>
        sebelumnya.map(
          (item) =>
            item.id ===
            notifikasi.id
              ? {
                  ...item,
                  dibaca: true,
                }
              : item,
        ),
    )

    setNotifikasiTerbuka(false)

    if (notifikasi.path) {
      navigate(
        notifikasi.path,
      )
    }
  }

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white/95 backdrop-blur">
      <div className="flex h-16 items-center justify-between gap-3 px-3 sm:px-6 lg:px-8">
        {/* KIRI */}
        <div className="flex min-w-0 items-center gap-2.5 sm:gap-3">
          <button
            type="button"
            onClick={bukaSidebar}
            aria-label="Buka menu"
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition hover:bg-slate-50 lg:hidden"
          >
            <Menu size={18} />
          </button>

          <div className="min-w-0">
            <p className="truncate text-xs font-bold text-slate-900 sm:text-sm">
              IT Support Center
            </p>

            <p className="hidden text-xs text-slate-400 sm:block">
              Sistem Layanan & Manajemen Tiket IT
            </p>
          </div>
        </div>

        {/* KANAN */}
        <div className="flex shrink-0 items-center gap-1 sm:gap-2">
          {/* NOTIFIKASI */}
          <div
            ref={notifikasiRef}
            className="relative"
          >
            <button
              type="button"
              onClick={toggleNotifikasi}
              aria-label="Notifikasi"
              className={`relative flex h-9 w-9 items-center justify-center rounded-xl border transition sm:h-10 sm:w-10 ${
                notifikasiTerbuka
                  ? 'border-slate-300 bg-slate-100 text-slate-900'
                  : 'border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
              }`}
            >
              <Bell size={18} />

              {jumlahBelumDibaca >
                0 && (
                <span className="absolute right-1.5 top-1.5 flex min-h-[15px] min-w-[15px] items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold leading-none text-white ring-2 ring-white">
                  {jumlahBelumDibaca >
                  9
                    ? '9+'
                    : jumlahBelumDibaca}
                </span>
              )}
            </button>

            {/* DROPDOWN NOTIFIKASI */}
            {notifikasiTerbuka && (
              <div
                className="
                  fixed
                  left-3
                  right-3
                  top-[68px]
                  z-[100]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-2xl

                  sm:absolute
                  sm:left-auto
                  sm:right-0
                  sm:top-12
                  sm:w-[380px]
                "
              >
                {/* HEADER */}
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 px-4 py-3.5 sm:px-5 sm:py-4">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="text-sm font-bold text-slate-900">
                        Notifikasi
                      </h2>

                      {jumlahBelumDibaca >
                        0 && (
                        <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-bold text-red-600">
                          {
                            jumlahBelumDibaca
                          }{' '}
                          baru
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-[11px] text-slate-400 sm:text-xs">
                      Aktivitas terbaru IT Support Center
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() =>
                      setNotifikasiTerbuka(
                        false,
                      )
                    }
                    aria-label="Tutup notifikasi"
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                  >
                    <X size={16} />
                  </button>
                </div>

                {/* LIST */}
                <div className="max-h-[320px] overflow-y-auto sm:max-h-[380px]">
                  {daftarNotifikasi.length >
                  0 ? (
                    daftarNotifikasi.map(
                      (notifikasi) => (
                        <button
                          key={
                            notifikasi.id
                          }
                          type="button"
                          onClick={() =>
                            bukaDetailNotifikasi(
                              notifikasi,
                            )
                          }
                          className={`flex w-full gap-3 border-b border-slate-100 px-4 py-3.5 text-left transition last:border-b-0 hover:bg-slate-50 sm:px-5 sm:py-4 ${
                            !notifikasi.dibaca
                              ? 'bg-blue-50/40'
                              : 'bg-white'
                          }`}
                        >
                          {/* DOT */}
                          <div className="pt-1.5">
                            <span
                              className={`block h-2 w-2 rounded-full ${
                                !notifikasi.dibaca
                                  ? 'bg-blue-500'
                                  : 'bg-slate-200'
                              }`}
                            />
                          </div>

                          {/* ISI */}
                          <div className="min-w-0 flex-1">
                            <div className="flex items-start justify-between gap-3">
                              <p
                                className={`min-w-0 text-xs leading-5 sm:text-sm ${
                                  !notifikasi.dibaca
                                    ? 'font-bold text-slate-900'
                                    : 'font-semibold text-slate-700'
                                }`}
                              >
                                {
                                  notifikasi.judul
                                }
                              </p>

                              <span className="shrink-0 pt-0.5 text-[9px] text-slate-400 sm:text-[11px]">
                                {
                                  notifikasi.waktu
                                }
                              </span>
                            </div>

                            <p className="mt-1 line-clamp-2 text-[11px] leading-5 text-slate-500 sm:text-xs">
                              {
                                notifikasi.deskripsi
                              }
                            </p>
                          </div>
                        </button>
                      ),
                    )
                  ) : (
                    <div className="px-6 py-10 text-center">
                      <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-slate-100 text-slate-400">
                        <Bell size={20} />
                      </div>

                      <p className="mt-3 text-sm font-semibold text-slate-700">
                        Tidak ada notifikasi
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Aktivitas terbaru akan muncul di sini.
                      </p>
                    </div>
                  )}
                </div>

                {/* FOOTER */}
                {jumlahBelumDibaca >
                  0 && (
                  <div className="border-t border-slate-100 bg-white px-4 py-3 sm:px-5">
                    <button
                      type="button"
                      onClick={
                        tandaiSemuaDibaca
                      }
                      className="w-full rounded-xl py-2 text-center text-xs font-semibold text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
                    >
                      Tandai semua sebagai dibaca
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* PROFIL */}
          <div
            ref={profilRef}
            className="relative"
          >
            <button
              type="button"
              onClick={toggleProfil}
              className={`flex h-9 items-center gap-2 rounded-xl px-2 transition sm:h-auto sm:px-3 sm:py-2 ${
                profilTerbuka
                  ? 'bg-slate-100'
                  : 'hover:bg-slate-50'
              }`}
            >
              <div className="hidden text-right md:block">
                <p className="max-w-[160px] truncate text-sm font-semibold text-slate-800">
                  {pengguna.nama}
                </p>

                <p className="mt-0.5 text-xs text-slate-400">
                  {labelRole}
                </p>
              </div>

              <ChevronDown
                size={15}
                className={`text-slate-400 transition ${
                  profilTerbuka
                    ? 'rotate-180'
                    : ''
                }`}
              />
            </button>

            {/* DROPDOWN PROFIL */}
            {profilTerbuka && (
              <div
                className="
                  fixed
                  left-3
                  right-3
                  top-[68px]
                  z-[100]
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-2xl

                  sm:absolute
                  sm:left-auto
                  sm:right-0
                  sm:top-12
                  sm:w-64
                "
              >
                <div className="border-b border-slate-100 px-4 py-4">
                  <p className="truncate text-sm font-bold text-slate-900">
                    {pengguna.nama}
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    {
                      pengguna.nomorWhatsApp
                    }
                  </p>

                  <span className="mt-3 inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">
                    {labelRole}
                  </span>
                </div>

                <div className="p-2">
                  <button
                    type="button"
                    onClick={() => {
                      setProfilTerbuka(
                        false,
                      )

                      navigate(
                        pathProfil,
                      )
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    <UserRound size={17} />
                    Profil
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setProfilTerbuka(
                        false,
                      )

                      navigate(
                        pathPengaturan,
                      )
                    }}
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
                  >
                    <Settings size={17} />
                    Pengaturan
                  </button>
                </div>

                <div className="border-t border-slate-100 p-2">
                  <button
                    type="button"
                    onClick={
                      handleLogout
                    }
                    className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-semibold text-red-600 transition hover:bg-red-50"
                  >
                    <LogOut size={17} />
                    Keluar
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}