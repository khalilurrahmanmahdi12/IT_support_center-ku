import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Headphones,
  Ticket,
} from 'lucide-react'

import GrafikKategori from '../../components/dashboard/GrafikKategori'
import GrafikPrioritas from '../../components/dashboard/GrafikPrioritas'
import GrafikTrenTiket from '../../components/dashboard/GrafikTrenTiket'
import KartuStatistik from '../../components/dashboard/KartuStatistik'
import PerformaTeknisi from '../../components/dashboard/PerformaTeknisi'
import TiketTerbaru from '../../components/dashboard/TiketTerbaru'

import { useTicketStore } from '../../store/ticketStore'

export default function DasborAdmin() {
  const tiket = useTicketStore(
    (state) => state.tiket,
  )

  const totalTiket = tiket.length

  const tiketTerbuka = tiket.filter(
    (item) => item.status === 'Terbuka',
  ).length

  const sedangDiproses = tiket.filter(
    (item) => item.status === 'Sedang Diproses',
  ).length

  const tiketSelesai = tiket.filter(
    (item) =>
      item.status === 'Selesai' ||
      item.status === 'Ditutup',
  ).length

  const tiketKritis = tiket.filter(
    (item) =>
      item.prioritas === 'Kritis' &&
      item.status !== 'Ditutup',
  ).length

  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm font-medium text-slate-500">
          Ringkasan Sistem
        </p>

        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Dasbor Admin
        </h1>

        <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
          Pantau aktivitas tiket, performa teknisi, dan kondisi layanan bantuan IT perusahaan.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KartuStatistik
          judul="Total Tiket"
          nilai={totalTiket}
          keterangan="Seluruh tiket yang tercatat"
          icon={Ticket}
        />

        <KartuStatistik
          judul="Tiket Terbuka"
          nilai={tiketTerbuka}
          keterangan="Menunggu penanganan"
          icon={Headphones}
        />

        <KartuStatistik
          judul="Sedang Diproses"
          nilai={sedangDiproses}
          keterangan="Sedang ditangani teknisi"
          icon={Clock3}
        />

        <KartuStatistik
          judul="Tiket Selesai"
          nilai={tiketSelesai}
          keterangan="Telah berhasil diselesaikan"
          icon={CheckCircle2}
        />

        <KartuStatistik
          judul="Prioritas Kritis"
          nilai={tiketKritis}
          keterangan="Membutuhkan perhatian segera"
          icon={AlertTriangle}
        />
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-5">
        <div className="xl:col-span-3">
          <GrafikTrenTiket />
        </div>

        <div className="xl:col-span-2">
          <GrafikKategori />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        <GrafikPrioritas />
        <PerformaTeknisi />
      </div>

      <TiketTerbaru />
    </div>
  )
}