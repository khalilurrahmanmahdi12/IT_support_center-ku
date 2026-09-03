import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { dataTiketAwal } from '../data/tiket'

import type {
  KategoriTiket,
  PrioritasTiket,
  StatusTiket,
  Tiket,
} from '../types/tiket'

interface TiketBaru {
  judul: string
  deskripsi: string
  karyawan: string
  nomorWhatsApp?: string
  departemen: string
  kategori: KategoriTiket
  prioritas: PrioritasTiket
}

interface TicketState {
  tiket: Tiket[]

  tambahTiket: (data: TiketBaru) => Tiket

  tugaskanTeknisi: (
    id: string,
    namaTeknisi: string,
  ) => void

  ubahStatus: (
    id: string,
    status: StatusTiket,
  ) => void

  selesaikanTiket: (
    id: string,
    catatanPenyelesaian: string,
  ) => void

  tutupTiket: (
    id: string,
  ) => void

  resetTiket: () => void
}

const tanggalSekarang = () => {
  return new Intl.DateTimeFormat('id-ID', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }).format(new Date())
}

const buatIdRiwayat = () => {
  return `RIW-${Date.now()}-${Math.floor(
    Math.random() * 1000,
  )}`
}

const buatIdTiket = (
  daftarTiket: Tiket[],
) => {
  const nomorTerbesar =
    daftarTiket.reduce(
      (terbesar, item) => {
        const nomor = Number(
          item.id.replace('TKT-', ''),
        )

        if (Number.isNaN(nomor)) {
          return terbesar
        }

        return Math.max(
          terbesar,
          nomor,
        )
      },
      0,
    )

  return `TKT-${String(
    nomorTerbesar + 1,
  ).padStart(3, '0')}`
}

export const useTicketStore =
  create<TicketState>()(
    persist(
      (set, get) => ({
        tiket: dataTiketAwal,

        tambahTiket: (data) => {
          const tiketSaatIni =
            get().tiket

          const tanggal =
            tanggalSekarang()

          const tiketBaru: Tiket = {
            id: buatIdTiket(
              tiketSaatIni,
            ),

            judul:
              data.judul,

            deskripsi:
              data.deskripsi,

            karyawan:
              data.karyawan,

            nomorWhatsApp:
              data.nomorWhatsApp,

            departemen:
              data.departemen,

            kategori:
              data.kategori,

            prioritas:
              data.prioritas,

            status:
              'Terbuka',

            dibuatPada:
              tanggal,

            diperbaruiPada:
              tanggal,

            riwayat: [
              {
                id: buatIdRiwayat(),

                judul:
                  'Tiket dibuat',

                keterangan:
                  `${data.karyawan} membuat tiket bantuan IT.`,

                waktu:
                  tanggal,
              },
            ],
          }

          set({
            tiket: [
              tiketBaru,
              ...tiketSaatIni,
            ],
          })

          return tiketBaru
        },

        tugaskanTeknisi: (
          id,
          namaTeknisi,
        ) => {
          const tanggal =
            tanggalSekarang()

          set((state) => ({
            tiket:
              state.tiket.map(
                (item) => {
                  if (
                    item.id !== id
                  ) {
                    return item
                  }

                  const teknisiBerubah =
                    item.teknisi !==
                    namaTeknisi

                  const statusBaru =
                    item.status ===
                    'Terbuka'
                      ? 'Sedang Diproses'
                      : item.status

                  const riwayatBaru =
                    [...item.riwayat]

                  if (
                    teknisiBerubah
                  ) {
                    riwayatBaru.push({
                      id:
                        buatIdRiwayat(),

                      judul:
                        item.teknisi
                          ? 'Teknisi diganti'
                          : 'Teknisi ditugaskan',

                      keterangan:
                        item.teknisi
                          ? `Penanganan tiket dialihkan dari ${item.teknisi} kepada ${namaTeknisi}.`
                          : `${namaTeknisi} ditugaskan untuk menangani tiket.`,

                      waktu:
                        tanggal,
                    })
                  }

                  if (
                    item.status ===
                    'Terbuka'
                  ) {
                    riwayatBaru.push({
                      id:
                        buatIdRiwayat(),

                      judul:
                        'Penanganan dimulai',

                      keterangan:
                        'Status tiket diubah menjadi Sedang Diproses.',

                      waktu:
                        tanggal,
                    })
                  }

                  return {
                    ...item,

                    teknisi:
                      namaTeknisi,

                    status:
                      statusBaru,

                    diperbaruiPada:
                      tanggal,

                    riwayat:
                      riwayatBaru,
                  }
                },
              ),
          }))
        },

        ubahStatus: (
          id,
          status,
        ) => {
          const tanggal =
            tanggalSekarang()

          set((state) => ({
            tiket:
              state.tiket.map(
                (item) => {
                  if (
                    item.id !== id
                  ) {
                    return item
                  }

                  if (
                    item.status === status
                  ) {
                    return item
                  }

                  return {
                    ...item,

                    status,

                    diperbaruiPada:
                      tanggal,

                    riwayat: [
                      ...item.riwayat,
                      {
                        id:
                          buatIdRiwayat(),

                        judul:
                          'Status diperbarui',

                        keterangan:
                          `Status tiket diubah menjadi ${status}.`,

                        waktu:
                          tanggal,
                      },
                    ],
                  }
                },
              ),
          }))
        },

        selesaikanTiket: (
          id,
          catatanPenyelesaian,
        ) => {
          const tanggal =
            tanggalSekarang()

          set((state) => ({
            tiket:
              state.tiket.map(
                (item) => {
                  if (
                    item.id !== id
                  ) {
                    return item
                  }

                  if (
                    item.status ===
                    'Ditutup'
                  ) {
                    return item
                  }

                  return {
                    ...item,

                    status:
                      'Selesai',

                    catatanPenyelesaian,

                    diperbaruiPada:
                      tanggal,

                    riwayat: [
                      ...item.riwayat,
                      {
                        id:
                          buatIdRiwayat(),

                        judul:
                          'Tiket diselesaikan',

                        keterangan:
                          'Kendala telah selesai ditangani oleh teknisi dan menunggu konfirmasi karyawan.',

                        waktu:
                          tanggal,
                      },
                    ],
                  }
                },
              ),
          }))
        },

        tutupTiket: (
          id,
        ) => {
          const tanggal =
            tanggalSekarang()

          set((state) => ({
            tiket:
              state.tiket.map(
                (item) => {
                  if (
                    item.id !== id
                  ) {
                    return item
                  }

                  if (
                    item.status !==
                    'Selesai'
                  ) {
                    return item
                  }

                  return {
                    ...item,

                    status:
                      'Ditutup',

                    diperbaruiPada:
                      tanggal,

                    riwayat: [
                      ...item.riwayat,
                      {
                        id:
                          buatIdRiwayat(),

                        judul:
                          'Tiket ditutup',

                        keterangan:
                          'Karyawan mengonfirmasi kendala telah selesai dan tiket ditutup.',

                        waktu:
                          tanggal,
                      },
                    ],
                  }
                },
              ),
          }))
        },

        resetTiket: () => {
          set({
            tiket:
              dataTiketAwal,
          })
        },
      }),

      {
        name:
          'it-support-tickets',
      },
    ),
  )