export type StatusTiket =
  | 'Terbuka'
  | 'Sedang Diproses'
  | 'Selesai'
  | 'Ditutup'

export type PrioritasTiket =
  | 'Rendah'
  | 'Sedang'
  | 'Tinggi'
  | 'Kritis'

export type KategoriTiket =
  | 'Perangkat Keras'
  | 'Perangkat Lunak'
  | 'Jaringan'
  | 'Akun & Akses'
  | 'Lainnya'

export interface RiwayatTiket {
  id: string
  judul: string
  keterangan: string
  waktu: string
}

export interface Tiket {
  id: string
  judul: string
  deskripsi: string

  karyawan: string
  nomorWhatsApp?: string

  departemen: string
  kategori: KategoriTiket
  prioritas: PrioritasTiket
  status: StatusTiket

  teknisi?: string

  dibuatPada: string
  diperbaruiPada?: string

  catatanPenyelesaian?: string

  riwayat: RiwayatTiket[]
}