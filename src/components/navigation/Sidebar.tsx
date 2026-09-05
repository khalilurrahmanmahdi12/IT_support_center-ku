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
    if (location.pathname === item.path) {
      return true
    }

    if (
      item.path === '/admin/tiket' &&
      location.pathname.startsWith('/admin/tiket/')
    ) {
      return true
    }

    if (
      item.path === '/teknisi/tiket' &&
      location.pathname.startsWith('/teknisi/tiket/')
    ) {
      return true
    }

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
          className="fixed inset-0 z-40 bg-slate-950/60 lg:hidden"
        />
      )}

      {/* Sidebar */}
      <aside
        className={`
          fixed bottom-0 left-0 top-0 z-50
          flex w-72 flex-col
          border-r border-slate-800
          bg-[#020617]
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
        <div className="flex h-20 shrink-0 items-center justify-between border-b border-slate-800 px-6">
          <NavLink
            to={halamanUtama}
            onClick={tutupSidebar}
            className="min-w-0"
          >
            <div className="min-w-0">
              <h1 className="truncate text-base font-bold text-white">
                IT Support Center
              </h1>

              <p className="mt-1 truncate text-xs text-slate-400">
                Layanan Bantuan IT
              </p>
            </div>
          </NavLink>

          <button
            type="button"
            aria-label="Tutup sidebar"
            onClick={tutupSidebar}
            className="
              flex h-10 w-10 shrink-0
              items-center justify-center
              rounded-xl
              text-slate-400
              transition
              hover:bg-slate-800
              hover:text-white
              lg:hidden
            "
          >
            <X size={20} />
          </button>
        </div>

        {/* Informasi role */}
        <div className="shrink-0 px-4 pt-4">
          <div
            className="
              rounded-xl
              border border-slate-800
              bg-slate-900/80
              px-4 py-3
            "
          >
            <p className="text-[11px] font-medium text-slate-500">
              Akses sebagai
            </p>

            <p className="mt-1 text-sm font-semibold text-slate-200">
              {labelRole}
            </p>
          </div>
        </div>

        {/* Menu utama */}
        <nav className="flex-1 overflow-y-auto px-4 py-5">
          <p
            className="
              mb-2
              px-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-slate-500
            "
          >
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
                    group
                    flex items-center gap-3
                    rounded-lg
                    px-3 py-2.5
                    text-sm font-medium
                    transition-all duration-200
                    ${
                      aktif
                        ? `
                          bg-[#1e293b]
                          text-white
                          shadow-sm
                        `
                        : `
                          text-[#93c5fd]
                          hover:bg-slate-900
                          hover:text-white
                        `
                    }
                  `}
                >
                  <Icon
                    size={18}
                    strokeWidth={1.8}
                    className={`
                      shrink-0
                      transition-colors
                      ${
                        aktif
                          ? 'text-slate-200'
                          : 'text-slate-400 group-hover:text-slate-200'
                      }
                    `}
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
        <div className="shrink-0 border-t border-slate-800 p-4">
          <p
            className="
              mb-2
              px-3
              text-[10px]
              font-bold
              uppercase
              tracking-[0.14em]
              text-slate-500
            "
          >
            Akun
          </p>

          {/* Profil */}
          <NavLink
            to={halamanProfil}
            onClick={tutupSidebar}
            className={`
              group
              flex items-center gap-3
              rounded-lg
              px-3 py-2.5
              text-sm font-medium
              transition-all duration-200
              ${
                profilAktif
                  ? 'bg-[#1e293b] text-white'
                  : 'text-[#93c5fd] hover:bg-slate-900 hover:text-white'
              }
            `}
          >
            <UserRound
              size={18}
              strokeWidth={1.8}
              className={`
                shrink-0
                ${
                  profilAktif
                    ? 'text-slate-200'
                    : 'text-slate-400 group-hover:text-slate-200'
                }
              `}
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
              group
              mt-1
              flex items-center gap-3
              rounded-lg
              px-3 py-2.5
              text-sm font-medium
              transition-all duration-200
              ${
                pengaturanAktif
                  ? 'bg-[#1e293b] text-white'
                  : 'text-[#93c5fd] hover:bg-slate-900 hover:text-white'
              }
            `}
          >
            <Settings
              size={18}
              strokeWidth={1.8}
              className={`
                shrink-0
                ${
                  pengaturanAktif
                    ? 'text-slate-200'
                    : 'text-slate-400 group-hover:text-slate-200'
                }
              `}
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
