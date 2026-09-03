import {
  Edit3,
  Plus,
  Search,
  Trash2,
  UserCog,
  X,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import { dataTeknisi as dataTeknisiAwal } from '../../data/teknisi'

import type { Teknisi } from '../../types/teknisi'

const spesialisasiList = [
  'Jaringan & Infrastruktur',
  'Perangkat Keras',
  'Perangkat Lunak',
  'Akun & Akses',
  'Keamanan Sistem',
  'Dukungan Umum',
]

const formAwal = {
  nama: '',
  email: '',
  nomorWhatsApp: '',
  spesialisasi: 'Jaringan & Infrastruktur',
  status: 'Tersedia' as 'Tersedia' | 'Sibuk',
  tiketAktif: 0,
}

export default function DataTeknisi() {
  const [dataTeknisi, setDataTeknisi] =
    useState<Teknisi[]>(dataTeknisiAwal)

  const [pencarian, setPencarian] =
    useState('')

  const [filterStatus, setFilterStatus] =
    useState('Semua')

  const [modalTerbuka, setModalTerbuka] =
    useState(false)

  const [modeEdit, setModeEdit] =
    useState(false)

  const [idEdit, setIdEdit] =
    useState<string | null>(null)

  const [form, setForm] =
    useState(formAwal)

  const [error, setError] =
    useState('')

  const [
    teknisiAkanDihapus,
    setTeknisiAkanDihapus,
  ] = useState<Teknisi | null>(null)

  const dataTerfilter = useMemo(() => {
    const keyword = pencarian
      .trim()
      .toLowerCase()

    return dataTeknisi.filter(
      (item) => {
        const cocokPencarian =
          item.id
            .toLowerCase()
            .includes(keyword) ||
          item.nama
            .toLowerCase()
            .includes(keyword) ||
          item.email
            .toLowerCase()
            .includes(keyword) ||
          item.spesialisasi
            .toLowerCase()
            .includes(keyword)

        const cocokStatus =
          filterStatus === 'Semua' ||
          item.status === filterStatus

        return (
          cocokPencarian &&
          cocokStatus
        )
      },
    )
  }, [
    dataTeknisi,
    pencarian,
    filterStatus,
  ])

  const bukaTambah = () => {
    setModeEdit(false)
    setIdEdit(null)
    setForm(formAwal)
    setError('')
    setModalTerbuka(true)
  }

  const bukaEdit = (
    teknisi: Teknisi,
  ) => {
    setModeEdit(true)
    setIdEdit(teknisi.id)

    setForm({
      nama: teknisi.nama,
      email: teknisi.email,
      nomorWhatsApp:
        teknisi.nomorWhatsApp,
      spesialisasi:
        teknisi.spesialisasi,
      status:
        teknisi.status,
      tiketAktif:
        teknisi.tiketAktif,
    })

    setError('')
    setModalTerbuka(true)
  }

  const tutupModal = () => {
    setModalTerbuka(false)
    setModeEdit(false)
    setIdEdit(null)
    setForm(formAwal)
    setError('')
  }

  const buatIdTeknisi = () => {
    const nomorTerbesar =
      dataTeknisi.reduce(
        (terbesar, item) => {
          const nomor = Number(
            item.id.replace(
              'TEK-',
              '',
            ),
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

    return `TEK-${String(
      nomorTerbesar + 1,
    ).padStart(3, '0')}`
  }

  const handleSimpan = () => {
    if (
      form.nama.trim().length < 3
    ) {
      setError(
        'Nama minimal 3 karakter.',
      )
      return
    }

    if (
      !form.email.includes('@')
    ) {
      setError(
        'Email tidak valid.',
      )
      return
    }

    if (
      form.nomorWhatsApp.length < 10
    ) {
      setError(
        'Nomor WhatsApp tidak valid.',
      )
      return
    }

    if (
      form.spesialisasi.trim().length < 3
    ) {
      setError(
        'Spesialisasi wajib dipilih.',
      )
      return
    }

    if (
      form.tiketAktif < 0
    ) {
      setError(
        'Jumlah tiket aktif tidak boleh kurang dari 0.',
      )
      return
    }

    if (
      modeEdit &&
      idEdit
    ) {
      setDataTeknisi(
        (sebelumnya) =>
          sebelumnya.map(
            (item) =>
              item.id === idEdit
                ? {
                    ...item,
                    ...form,
                  }
                : item,
          ),
      )
    } else {
      const teknisiBaru: Teknisi = {
        id:
          buatIdTeknisi(),
        ...form,
      }

      setDataTeknisi(
        (sebelumnya) => [
          teknisiBaru,
          ...sebelumnya,
        ],
      )
    }

    tutupModal()
  }

  const handleHapus = (
    teknisi: Teknisi,
  ) => {
    setTeknisiAkanDihapus(
      teknisi,
    )
  }

  const konfirmasiHapus = () => {
    if (!teknisiAkanDihapus) {
      return
    }

    setDataTeknisi(
      (sebelumnya) =>
        sebelumnya.filter(
          (item) =>
            item.id !==
            teknisiAkanDihapus.id,
        ),
    )

    setTeknisiAkanDihapus(
      null,
    )
  }

  return (
    <div className="space-y-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Manajemen Teknisi
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Data Teknisi
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola data teknisi IT, spesialisasi, status, dan beban tiket aktif.
          </p>
        </div>

        <button
          type="button"
          onClick={bukaTambah}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 sm:w-auto"
        >
          <Plus size={17} />
          Tambah Teknisi
        </button>
      </div>

      {/* FILTER */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
          <div className="relative md:col-span-2">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
            />

            <input
              type="text"
              value={pencarian}
              onChange={(event) =>
                setPencarian(
                  event.target.value,
                )
              }
              placeholder="Cari ID, nama, email, atau spesialisasi..."
              className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
            />
          </div>

          <select
            value={filterStatus}
            onChange={(event) =>
              setFilterStatus(
                event.target.value,
              )
            }
            className="rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-700 outline-none transition focus:border-slate-900"
          >
            <option value="Semua">
              Semua Status
            </option>

            <option value="Tersedia">
              Tersedia
            </option>

            <option value="Sibuk">
              Sibuk
            </option>
          </select>
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Menampilkan{' '}
            <span className="font-semibold text-slate-800">
              {dataTerfilter.length}
            </span>{' '}
            teknisi
          </p>
        </div>
      </div>

      {/* TABEL */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Teknisi
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Kontak
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Spesialisasi
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Status
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Tiket Aktif
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {dataTerfilter.length > 0 ? (
                dataTerfilter.map(
                  (teknisi) => (
                    <tr
                      key={teknisi.id}
                      className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                            <UserCog size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {teknisi.nama}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {teknisi.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <p className="text-sm text-slate-700">
                          {teknisi.email}
                        </p>

                        <p className="mt-1 text-xs text-slate-400">
                          {teknisi.nomorWhatsApp}
                        </p>
                      </td>

                      <td className="px-6 py-4 text-sm text-slate-600">
                        {teknisi.spesialisasi}
                      </td>

                      <td className="px-6 py-4">
                        <span
                          className={`rounded-full px-2.5 py-1 text-xs font-semibold ${
                            teknisi.status === 'Tersedia'
                              ? 'bg-emerald-50 text-emerald-700'
                              : 'bg-amber-50 text-amber-700'
                          }`}
                        >
                          {teknisi.status}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex min-w-8 items-center justify-center rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                          {teknisi.tiketAktif}
                        </span>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              bukaEdit(
                                teknisi,
                              )
                            }
                            title="Edit teknisi"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleHapus(
                                teknisi,
                              )
                            }
                            title="Hapus teknisi"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-red-200 text-red-600 transition hover:bg-red-50"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ),
                )
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center"
                  >
                    <p className="text-sm font-semibold text-slate-600">
                      Data tidak ditemukan
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Coba ubah pencarian atau filter status.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL TAMBAH / EDIT */}
      {modalTerbuka && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 p-3 sm:p-5">
          <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)]">
            {/* HEADER MODAL */}
            <div className="flex shrink-0 items-start justify-between border-b border-slate-100 px-4 py-4 sm:px-6 sm:py-5">
              <div>
                <h2 className="text-lg font-bold text-slate-900 sm:text-xl">
                  {modeEdit
                    ? 'Edit Teknisi'
                    : 'Tambah Teknisi'}
                </h2>

                <p className="mt-1 text-xs text-slate-500 sm:text-sm">
                  {modeEdit
                    ? 'Perbarui informasi teknisi.'
                    : 'Masukkan informasi teknisi baru.'}
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                aria-label="Tutup"
                className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 sm:h-9 sm:w-9"
              >
                <X size={18} />
              </button>
            </div>

            {/* BODY MODAL */}
            <div className="min-h-0 flex-1 overflow-y-auto overscroll-contain p-4 sm:p-6">
              {error && (
                <div className="mb-4 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-xs font-medium text-red-700 sm:mb-5 sm:text-sm">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2 sm:gap-y-5">
                {/* NAMA */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="namaTeknisi"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:mb-2 sm:text-sm"
                  >
                    Nama Lengkap
                  </label>

                  <input
                    id="namaTeknisi"
                    type="text"
                    value={form.nama}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        nama:
                          event.target.value,
                      })

                      setError('')
                    }}
                    placeholder="Nama teknisi"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-100 sm:py-3"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label
                    htmlFor="emailTeknisi"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:mb-2 sm:text-sm"
                  >
                    Email
                  </label>

                  <input
                    id="emailTeknisi"
                    type="email"
                    value={form.email}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        email:
                          event.target.value,
                      })

                      setError('')
                    }}
                    placeholder="nama@perusahaan.id"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-100 sm:py-3"
                  />
                </div>

                {/* WHATSAPP */}
                <div>
                  <label
                    htmlFor="whatsappTeknisi"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:mb-2 sm:text-sm"
                  >
                    Nomor WhatsApp
                  </label>

                  <input
                    id="whatsappTeknisi"
                    type="tel"
                    inputMode="numeric"
                    value={form.nomorWhatsApp}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        nomorWhatsApp:
                          event.target.value
                            .replace(/\D/g, '')
                            .slice(0, 15),
                      })

                      setError('')
                    }}
                    placeholder="08xxxxxxxxxx"
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-100 sm:py-3"
                  />
                </div>

                {/* SPESIALISASI */}
                <div>
                  <label
                    htmlFor="spesialisasiTeknisi"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:mb-2 sm:text-sm"
                  >
                    Spesialisasi
                  </label>

                  <select
                    id="spesialisasiTeknisi"
                    value={form.spesialisasi}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        spesialisasi:
                          event.target.value,
                      })

                      setError('')
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100 sm:py-3"
                  >
                    {spesialisasiList.map(
                      (item) => (
                        <option
                          key={item}
                          value={item}
                        >
                          {item}
                        </option>
                      ),
                    )}
                  </select>
                </div>

                {/* STATUS */}
                <div>
                  <label
                    htmlFor="statusTeknisi"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:mb-2 sm:text-sm"
                  >
                    Status
                  </label>

                  <select
                    id="statusTeknisi"
                    value={form.status}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        status:
                          event.target.value as
                            | 'Tersedia'
                            | 'Sibuk',
                      })

                      setError('')
                    }}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-700 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100 sm:py-3"
                  >
                    <option value="Tersedia">
                      Tersedia
                    </option>

                    <option value="Sibuk">
                      Sibuk
                    </option>
                  </select>
                </div>

                {/* JUMLAH TIKET AKTIF */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="tiketAktifTeknisi"
                    className="mb-1.5 block text-xs font-semibold text-slate-700 sm:mb-2 sm:text-sm"
                  >
                    Jumlah Tiket Aktif
                  </label>

                  <input
                    id="tiketAktifTeknisi"
                    type="number"
                    inputMode="numeric"
                    min={0}
                    value={form.tiketAktif}
                    onChange={(event) => {
                      const nilai =
                        Number(
                          event.target.value,
                        )

                      setForm({
                        ...form,
                        tiketAktif:
                          Number.isNaN(nilai)
                            ? 0
                            : Math.max(
                                0,
                                nilai,
                              ),
                      })

                      setError('')
                    }}
                    className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100 sm:py-3"
                  />

                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    Jumlah tiket aktif digunakan sebagai data demo beban kerja teknisi.
                  </p>
                </div>
              </div>
            </div>

            {/* FOOTER MODAL */}
            <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-3.5 sm:px-6 sm:py-5">
              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={tutupModal}
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:px-5"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={handleSimpan}
                  className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800 sm:px-5"
                >
                  {modeEdit
                    ? 'Simpan Perubahan'
                    : 'Tambah Teknisi'}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* MODAL HAPUS */}
      {teknisiAkanDihapus && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 p-3 sm:p-5">
          <div className="flex max-h-[calc(100dvh-24px)] w-full max-w-md flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl sm:max-h-[calc(100dvh-40px)]">
            <div className="min-h-0 flex-1 overflow-y-auto p-5 sm:p-6">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-50 text-red-600 sm:h-12 sm:w-12">
                <Trash2 size={21} />
              </div>

              <h2 className="mt-4 text-lg font-bold text-slate-900 sm:mt-5 sm:text-xl">
                Hapus Teknisi?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Anda akan menghapus data{' '}
                <span className="font-semibold text-slate-800">
                  {teknisiAkanDihapus.nama}
                </span>
                . Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4 sm:mt-5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <UserCog size={18} />
                  </div>

                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-slate-800">
                      {teknisiAkanDihapus.nama}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {teknisiAkanDihapus.id}
                      {' • '}
                      {teknisiAkanDihapus.status}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-3">
                  <p className="truncate text-xs text-slate-500">
                    {teknisiAkanDihapus.email}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    {teknisiAkanDihapus.spesialisasi}
                  </p>
                </div>
              </div>
            </div>

            <div className="shrink-0 border-t border-slate-100 bg-white px-4 py-3.5 sm:px-6 sm:py-4">
              <div className="flex items-center justify-end gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() =>
                    setTeknisiAkanDihapus(
                      null,
                    )
                  }
                  className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900 sm:px-5"
                >
                  Batal
                </button>

                <button
                  type="button"
                  onClick={konfirmasiHapus}
                  className="flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 sm:px-5"
                >
                  <Trash2 size={16} />
                  Hapus Teknisi
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}