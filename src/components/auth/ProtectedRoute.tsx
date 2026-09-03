import type { ReactNode } from 'react'

import {
  Navigate,
  useLocation,
} from 'react-router-dom'

import { useAuthStore } from '../../store/authStore'

import type { RolePengguna } from '../../types/pengguna'

interface ProtectedRouteProps {
  children: ReactNode
  role?: RolePengguna
}

export default function ProtectedRoute({
  children,
  role,
}: ProtectedRouteProps) {
  const location = useLocation()

  const sudahLogin = useAuthStore(
    (state) => state.sudahLogin,
  )

  const pengguna = useAuthStore(
    (state) => state.pengguna,
  )

  if (!sudahLogin || !pengguna) {
    return (
      <Navigate
        to="/login"
        replace
        state={{
          dari: location.pathname,
        }}
      />
    )
  }

  if (role && pengguna.role !== role) {
    switch (pengguna.role) {
      case 'admin':
        return <Navigate to="/admin" replace />

      case 'teknisi':
        return <Navigate to="/teknisi" replace />

      default:
        return <Navigate to="/karyawan" replace />
    }
  }

  return children
}