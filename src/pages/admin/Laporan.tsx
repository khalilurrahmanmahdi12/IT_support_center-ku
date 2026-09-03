import {
  AlertTriangle,
  CheckCircle2,
  Clock3,
  Download,
  FileSpreadsheet,
  RotateCcw,
  Ticket,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import * as XLSX from 'xlsx'

import {
  dataLaporanTiket,
} from '../../data/laporan'

export default function Laporan() {
  const [tanggalMulai, setTanggalMulai] =
    useState('')

  const [tanggalSelesai, setTanggalSelesai] =
    useState('')

  const [filterStatus, setFilterStatus] =
    useState('Semua')

  const [filterPrioritas, setFilterPrioritas] =
    useState('Semua')

  const dataTerfilter = useMemo(() => {
    return dataLaporanTiket.filter(
      (item) => {
        const cocokTanggalMulai =
          !tanggalMulai ||
          item.tanggalISO >= tanggalMulai

        const cocokTanggalSelesai =
          !tanggalSelesai ||
          item.tanggalISO <= tanggalSelesai

        const cocokStatus =
          filterStatus === 'Semua' ||
          item.status === filterStatus

        const cocokPrioritas =
          filterPrioritas === 'Semua' ||
          item.prioritas === filterPrioritas

        return (
          cocokTanggalMulai &&
          cocokTanggalSelesai &&
          cocokStatus &&
          cocokPrioritas
        )
      },
    )
  }, [
    tanggalMulai,
    tanggalSelesai,
    filterStatus,
    filterPrioritas,
  ])

  const totalTiket =
    dataTerfilter.length

  const totalTerbuka =
    dataTerfilter.filter(
      (item) =>
        item.status === 'Terbuka',
    ).length

  const totalDiproses =
    dataTerfilter.filter(
      (item) =>
        item.status === 'Sedang Diproses',
    ).length

  const totalSelesai =
    dataTerfilter.filter(
      (item) =>
        item.status === 'Selesai' ||
        item.status === 'Ditutup',
    ).length

  const totalKritis =
    dataTerfilter.filter(
      (item) =>
        item.prioritas === 'Kritis',
    ).length

  const resetFilter = () => {
    setTanggalMulai('')
    setTanggalSelesai('')
    setFilterStatus('Semua')
    setFilterPrioritas('Semua')
  }

  const exportExcel = () => {
    if (dataTerfilter.length === 0) {
      return
    }

    const dataExcel =
      dataTerfilter.map(
        (item, index) => ({
          No: index + 1,
          'ID Tiket': item.id,
          Tanggal: item.tanggal,
          Pelapor: item.pelapor,
          Departemen: item.departemen,
          'Judul Kendala': item.judul,
          Kategori: item.kategori,
          Prioritas: item.prioritas,
          Status: item.status,
          Teknisi: item.teknisi,
          'Waktu Penyelesaian':
            item.waktuPenyelesaian,
        }),
      )

    const worksheet =
      XLSX.utils.json_to_sheet(
        dataExcel,
      )

    worksheet['!cols'] = [
      { wch: 6 },
      { wch: 14 },
      { wch: 16 },
      { wch: 22 },
      { wch: 20 },
      { wch: 42 },
      { wch: 22 },
      { wch: 14 },
      { wch: 20 },
      { wch: 22 },
      { wch: 22 },
    ]

    const workbook =
      XLSX.utils.book_new()

    XLSX.utils.book_append_sheet(
      workbook,
      worksheet,
      'Laporan Tiket',
    )

    const namaFile =
      `Laporan-IT-Support-${new Date()
        .toISOString()
        .slice(0, 10)}.xlsx`

    XLSX.writeFile(
      workbook,
      namaFile,
    )
  }

  const warnaStatus = (
    status: string,
  ) => {
    switch (status) {
      case 'Terbuka':
        return 'bg-blue-50 text-blue-700'

      case 'Sedang Diproses':
        return 'bg-amber-50 text-amber-700'

      case 'Selesai':
        return 'bg-emerald-50 text-emerald-700'

      case 'Ditutup':
        return 'bg-slate-100 text-slate-600'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  const warnaPrioritas = (
    prioritas: string,
  ) => {
    switch (prioritas) {
      case 'Kritis':
        return 'bg-red-50 text-red-700'

      case 'Tinggi':
        return 'bg-orange-50 text-orange-700'

      case 'Sedang':
        return 'bg-yellow-50 text-yellow-700'

      default:
        return 'bg-slate-100 text-slate-600'
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Analisis Layanan
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Laporan
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Pantau laporan layanan bantuan IT dan ekspor data
            berdasarkan periode yang dipilih.
          </p>
        </div>

        <button
          type="button"
          onClick={exportExcel}
          disabled={
            dataTerfilter.length === 0
          }
          className="flex items-center justify-center gap-2 rounded-xl bg-emerald-600 px-4 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-slate-300"
        >
          <FileSpreadsheet size={18} />
          Export Excel
        </button>
      </div>

      {/* Filter */}
      <div className="rounded-2xl border border-slate-200 bg-white p-5">
        <div className="flex items-center justify-between gap-4">
          <div>
            <h2 className="text-sm font-bold text-slate-900">
              Filter Laporan
            </h2>

            <p className="mt-1 text-xs text-slate-400">
              Sesuaikan periode dan kategori laporan.
            </p>
          </div>

          <button
            type="button"
            onClick={resetFilter}
            className="flex items-center gap-2 text-sm font-semibold text-slate-500 transition hover:text-slate-900"
          >
            <RotateCcw size={16} />
            Reset
          </button>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
          <div>
            <label
              htmlFor="tanggalMulai"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Tanggal Mulai
            </label>

            <input
              id="tanggalMulai"
              type="date"
              value={tanggalMulai}
              onChange={(event) =>
                setTanggalMulai(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="tanggalSelesai"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Tanggal Selesai
            </label>

            <input
              id="tanggalSelesai"
              type="date"
              value={tanggalSelesai}
              min={tanggalMulai || undefined}
              onChange={(event) =>
                setTanggalSelesai(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <div>
            <label
              htmlFor="statusLaporan"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Status
            </label>

            <select
              id="statusLaporan"
              value={filterStatus}
              onChange={(event) =>
                setFilterStatus(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            >
              <option value="Semua">
                Semua Status
              </option>

              <option value="Terbuka">
                Terbuka
              </option>

              <option value="Sedang Diproses">
                Sedang Diproses
              </option>

              <option value="Selesai">
                Selesai
              </option>

              <option value="Ditutup">
                Ditutup
              </option>
            </select>
          </div>

          <div>
            <label
              htmlFor="prioritasLaporan"
              className="mb-2 block text-xs font-semibold uppercase tracking-wide text-slate-500"
            >
              Prioritas
            </label>

            <select
              id="prioritasLaporan"
              value={filterPrioritas}
              onChange={(event) =>
                setFilterPrioritas(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            >
              <option value="Semua">
                Semua Prioritas
              </option>

              <option value="Rendah">
                Rendah
              </option>

              <option value="Sedang">
                Sedang
              </option>

              <option value="Tinggi">
                Tinggi
              </option>

              <option value="Kritis">
                Kritis
              </option>
            </select>
          </div>
        </div>
      </div>

      {/* Ringkasan */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <Ringkasan
          icon={Ticket}
          label="Total Tiket"
          nilai={totalTiket}
          keterangan="Dalam laporan"
        />

        <Ringkasan
          icon={Clock3}
          label="Terbuka"
          nilai={totalTerbuka}
          keterangan="Belum ditangani"
        />

        <Ringkasan
          icon={Download}
          label="Diproses"
          nilai={totalDiproses}
          keterangan="Sedang ditangani"
        />

        <Ringkasan
          icon={CheckCircle2}
          label="Selesai"
          nilai={totalSelesai}
          keterangan="Selesai / ditutup"
        />

        <Ringkasan
          icon={AlertTriangle}
          label="Kritis"
          nilai={totalKritis}
          keterangan="Prioritas kritis"
        />
      </div>

      {/* Informasi jumlah */}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Daftar Laporan Tiket
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Menampilkan{' '}
            <span className="font-semibold text-slate-800">
              {dataTerfilter.length}
            </span>{' '}
            data tiket.
          </p>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1250px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tiket
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tanggal
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Pelapor
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Kendala
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Prioritas
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Teknisi
                </th>

                <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Penyelesaian
                </th>
              </tr>
            </thead>

            <tbody>
              {dataTerfilter.length > 0 ? (
                dataTerfilter.map(
                  (item) => (
                    <tr
                      key={item.id}
                      className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-5 py-4">
                        <p className="text-sm font-bold text-slate-800">
                          {item.id}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {item.kategori}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.tanggal}
                      </td>

                      <td className="px-5 py-4">
                        <p className="text-sm font-semibold text-slate-700">
                          {item.pelapor}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {item.departemen}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <p className="max-w-72 text-sm font-medium text-slate-700">
                          {item.judul}
                        </p>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${warnaPrioritas(
                            item.prioritas,
                          )}`}
                        >
                          {item.prioritas}
                        </span>
                      </td>

                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${warnaStatus(
                            item.status,
                          )}`}
                        >
                          {item.status}
                        </span>
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.teknisi}
                      </td>

                      <td className="px-5 py-4 text-sm text-slate-600">
                        {item.waktuPenyelesaian}
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan={8}
                    className="px-6 py-16 text-center"
                  >
                    <p className="text-sm font-semibold text-slate-600">
                      Data laporan tidak ditemukan
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Coba ubah periode atau filter laporan.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

function Ringkasan({
  icon: Icon,
  label,
  nilai,
  keterangan,
}: {
  icon: React.ElementType
  label: string
  nilai: number
  keterangan: string
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-sm font-medium text-slate-500">
            {label}
          </p>

          <p className="mt-3 text-3xl font-bold tracking-tight text-slate-900">
            {nilai}
          </p>
        </div>

        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
          <Icon size={19} />
        </div>
      </div>

      <p className="mt-4 text-xs text-slate-400">
        {keterangan}
      </p>
    </div>
  )
}