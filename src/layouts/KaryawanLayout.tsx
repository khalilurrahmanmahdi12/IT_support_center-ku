import { useState } from 'react'
import { Outlet } from 'react-router-dom'

import Navbar from '../components/navigation/Navbar'
import Sidebar from '../components/navigation/Sidebar'

export default function KaryawanLayout() {
  const [sidebarTerbuka, setSidebarTerbuka] =
    useState(false)

  return (
    <div className="min-h-screen bg-slate-50">
      <Sidebar
        role="karyawan"
        terbuka={sidebarTerbuka}
        tutupSidebar={() =>
          setSidebarTerbuka(false)
        }
      />

      <div className="min-h-screen lg:pl-72">
        <Navbar
          bukaSidebar={() =>
            setSidebarTerbuka(true)
          }
        />

        <main className="p-4 sm:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}