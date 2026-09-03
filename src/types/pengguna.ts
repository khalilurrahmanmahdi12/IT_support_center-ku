export type RolePengguna = 'admin' | 'teknisi' | 'karyawan'

export interface Pengguna {
  id: string
  nama: string
  nomorWhatsApp: string
  role: RolePengguna
}