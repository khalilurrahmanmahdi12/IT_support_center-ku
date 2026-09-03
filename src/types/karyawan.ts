export interface Karyawan {
  id: string
  nama: string
  email: string
  nomorWhatsApp: string
  departemen: string
  jabatan: string
  status: 'Aktif' | 'Nonaktif'
}