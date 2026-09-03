import type { ElementType } from 'react'

import {
  BarChart3,
  Building2,
  ClipboardList,
  LayoutDashboard,
  PlusCircle,
  Settings,
  TicketCheck,
  UserCog,
  UserRound,
  Users,
  Wrench,
  X,
} from 'lucide-react'

import {
  NavLink,
  useLocation,
} from 'react-router-dom'

import type { RolePengguna } from '../../types/pengguna'

interface SidebarProps {
  role: RolePengguna
  terbuka: boolean
  tutupSidebar: () => void
}

interface MenuItem {
  label: string
  path: string
  icon: ElementType
}

export default function Sidebar({
  role,
  terbuka,
  tutupSidebar,
}: SidebarProps) {
  const location = useLocation()

  const menuAdmin: MenuItem[] = [
    {
      label: 'Dasbor',
      path: '/admin',
      icon: LayoutDashboard,
    },
    {
      label: 'Semua Tiket',
      path: '/admin/tiket',
      icon: ClipboardList,
    },
    {
      label: 'Karyawan',
      path: '/admin/karyawan',
      icon: Users,
    },
    {
      label: 'Teknisi',
      path: '/admin/teknisi',
      icon: UserCog,
    },
    {
      label: 'Departemen',
      path: '/admin/departemen',
      icon: Building2,
    },
    {
      label: 'Laporan',
      path: '/admin/laporan',
      icon: BarChart3,
    },
  ]

  const menuTeknisi: MenuItem[] = [
    {
      label: 'Dasbor',
      path: '/teknisi',
      icon: LayoutDashboard,
    },
    {
      label: 'Tiket Ditugaskan',
      path: '/teknisi/tiket',
      icon: TicketCheck,
    },
    {
      label: 'Riwayat Pekerjaan',
      path: '/teknisi/riwayat',
      icon: Wrench,
    },
  ]

  const menuKaryawan: MenuItem[] = [
    {
      label: 'Dasbor',
      path: '/karyawan',
      icon: LayoutDashboard,
    },
    {
      label: 'Buat Tiket',
      path: '/karyawan/tiket/baru',
      icon: PlusCircle,
    },
    {
      label: 'Tiket Saya',
      path: '/karyawan/tiket',
      icon: ClipboardList,
    },
  ]

  const menu =
    role === 'admin'
      ? menuAdmin
      : role === 'teknisi'
        ? menuTeknisi
        : menuKaryawan

  const labelRole =
    role === 'admin'
      ? 'Administrator'
      : role === 'teknisi'
        ? 'Teknisi IT'
        : 'Karyawan'

  const halamanUtama =
    role === 'admin'
      ? '/admin'
      : role === 'teknisi'
        ? '/teknisi'
        : '/karyawan'

  const halamanProfil =
    role === 'admin'
      ? '/admin/profil'
      : role === 'teknisi'
        ? '/teknisi/profil'
        : '/karyawan/profil'

  const halamanPengaturan =
    role === 'admin'
      ? '/admin/pengaturan'
      : role === 'teknisi'
        ? '/teknisi/pengaturan'
        : '/karyawan/pengaturan'

  const cekAktif = (item: MenuItem) => {
    // Route harus sama persis
    if (location.pathname === item.path) {
      return true
    }

    // Detail tiket admin
    if (
      item.path === '/admin/tiket' &&
      location.pathname.startsWith('/admin/tiket/')
    ) {
      return true
    }

    // Detail tiket teknisi
    if (
      item.path === '/teknisi/tiket' &&
      location.pathname.startsWith('/teknisi/tiket/')
    ) {
      return true
    }

    // Detail tiket karyawan
    // Tapi halaman "Buat Tiket" jangan ikut dianggap aktif sebagai "Tiket Saya"
    if (
      item.path === '/karyawan/tiket' &&
      location.pathname.startsWith('/karyawan/tiket/') &&
      location.pathname !== '/karyawan/tiket/baru'
    ) {
      return true
    }

    return false
  }

  const profilAktif =
    location.pathname === halamanProfil

  const pengaturanAktif =
    location.pathname === halamanPengaturan

  return (
    <>
      {/* Overlay mobile */}
      {terbuka && (
        <button
          type="button"
          aria-label="Tutup menu"
          onClick={tutupSidebar}
          className="fixed inset-0 z-40 bg-slate-950/40 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed bottom-0 left-0 top-0 z-50
          flex w-72 flex-col
          border-r border-slate-200
          bg-white
          transition-transform duration-300
          lg:translate-x-0
          ${
            terbuka
              ? 'translate-x-0'
              : '-translate-x-full'
          }
        `}
      >
        {/* Logo */}
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-100 px-6">
          <NavLink
            to={halamanUtama}
            onClick={tutupSidebar}
            className="min-w-0"
          >
            <div className="min-w-0">
              <h1 className="truncate text-sm font-bold text-slate-900">
                IT Support Center
              </h1>

              <p className="truncate text-xs text-slate-400">
                Layanan Bantuan IT
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={tutupSidebar}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-slate-500 transition hover:bg-slate-100 lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        {/* Informasi role */}
        <div className="shrink-0 px-5 pt-5">
          <div className="rounded-xl border border-slate-100 bg-slate-50 px-4 py-3">
            <p className="text-xs font-medium text-slate-400">
              Akses sebagai
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-700">
              {labelRole}
            </p>
          </div>
        </div>

        {/* Menu utama */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Menu Utama
          </p>

          <div className="space-y-1">
            {menu.map((item) => {
              const Icon = item.icon
              const aktif = cekAktif(item)

              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={tutupSidebar}
                  className={`
                    flex items-center gap-3
                    rounded-xl
                    px-3 py-2.5
                    text-sm font-medium
                    transition
                    ${
                      aktif
                        ? 'bg-slate-900 text-white'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={2}
                    className="shrink-0"
                  />

                  <span className="truncate">
                    {item.label}
                  </span>
                </NavLink>
              )
            })}
          </div>
        </nav>

        {/* Akun */}
        <div className="shrink-0 border-t border-slate-100 p-4">
          <p className="mb-2 px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400">
            Akun
          </p>

          {/* Profil */}
          <NavLink
            to={halamanProfil}
            onClick={tutupSidebar}
            className={`
              flex items-center gap-3
              rounded-xl
              px-3 py-2.5
              text-sm font-medium
              transition
              ${
                profilAktif
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <UserRound
              size={18}
              strokeWidth={2}
              className="shrink-0"
            />

            <span>
              Profil
            </span>
          </NavLink>

          {/* Pengaturan */}
          <NavLink
            to={halamanPengaturan}
            onClick={tutupSidebar}
            className={`
              mt-1 flex items-center gap-3
              rounded-xl
              px-3 py-2.5
              text-sm font-medium
              transition
              ${
                pengaturanAktif
                  ? 'bg-slate-900 text-white'
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              }
            `}
          >
            <Settings
              size={18}
              strokeWidth={2}
              className="shrink-0"
            />

            <span>
              Pengaturan
            </span>
          </NavLink>
        </div>
      </aside>
    </>
  )
}