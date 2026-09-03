import { create } from 'zustand'

import type {
  Pengguna,
  RolePengguna,
} from '../types/pengguna'

import { penggunaDemo } from '../data/pengguna'

interface AuthState {
  nomorWhatsApp: string
  pengguna: Pengguna | null
  sudahLogin: boolean

  setNomorWhatsApp: (nomor: string) => void
  verifikasiOtp: (otp: string) => Pengguna | null
  logout: () => void
  muatSesi: () => void
}

const STORAGE_KEY = 'it-support-session'

export const useAuthStore = create<AuthState>((set, get) => ({
  nomorWhatsApp: '',
  pengguna: null,
  sudahLogin: false,

  setNomorWhatsApp: (nomor) => {
    set({
      nomorWhatsApp: nomor,
    })
  },

  verifikasiOtp: (otp) => {
    const { nomorWhatsApp } = get()

    if (otp.length !== 6) {
      return null
    }

    const penggunaTerdaftar = penggunaDemo.find(
      (item) => item.nomorWhatsApp === nomorWhatsApp,
    )

    let pengguna: Pengguna

    if (penggunaTerdaftar) {
      pengguna = penggunaTerdaftar
    } else {
      pengguna = {
        id: `USR-${Date.now()}`,
        nama: 'Karyawan',
        nomorWhatsApp,
        role: 'karyawan' as RolePengguna,
      }
    }

    const session = {
      pengguna,
      sudahLogin: true,
    }

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(session),
    )

    set({
      pengguna,
      sudahLogin: true,
    })

    return pengguna
  },

  logout: () => {
    localStorage.removeItem(STORAGE_KEY)

    set({
      nomorWhatsApp: '',
      pengguna: null,
      sudahLogin: false,
    })
  },

  muatSesi: () => {
    const session = localStorage.getItem(STORAGE_KEY)

    if (!session) return

    try {
      const parsed = JSON.parse(session)

      set({
        pengguna: parsed.pengguna,
        sudahLogin: parsed.sudahLogin,
      })
    } catch {
      localStorage.removeItem(STORAGE_KEY)
    }
  },
}))