export interface Teknisi {
  id: string
  nama: string
  email: string
  nomorWhatsApp: string
  spesialisasi: string
  status: 'Tersedia' | 'Sibuk'
  tiketAktif: number
}