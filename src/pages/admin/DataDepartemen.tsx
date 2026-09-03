import {
  Building2,
  Edit3,
  Plus,
  Search,
  Trash2,
  Users,
  X,
} from 'lucide-react'

import {
  useMemo,
  useState,
} from 'react'

import { dataDepartemenAwal } from '../../data/departemen'

import type { Departemen } from '../../types/departemen'

const formAwal = {
  kode: '',
  nama: '',
  kepalaDepartemen: '',
  jumlahKaryawan: 0,
}

export default function DataDepartemen() {
  const [daftarDepartemen, setDaftarDepartemen] =
    useState<Departemen[]>(dataDepartemenAwal)

  const [pencarian, setPencarian] =
    useState('')

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
    departemenAkanDihapus,
    setDepartemenAkanDihapus,
  ] = useState<Departemen | null>(null)

  const dataTerfilter = useMemo(() => {
    const keyword =
      pencarian
        .trim()
        .toLowerCase()

    return daftarDepartemen.filter(
      (item) =>
        item.id
          .toLowerCase()
          .includes(keyword) ||
        item.kode
          .toLowerCase()
          .includes(keyword) ||
        item.nama
          .toLowerCase()
          .includes(keyword) ||
        item.kepalaDepartemen
          .toLowerCase()
          .includes(keyword),
    )
  }, [
    daftarDepartemen,
    pencarian,
  ])

  const bukaTambah = () => {
    setModeEdit(false)
    setIdEdit(null)
    setForm(formAwal)
    setError('')
    setModalTerbuka(true)
  }

  const bukaEdit = (
    departemen: Departemen,
  ) => {
    setModeEdit(true)
    setIdEdit(departemen.id)

    setForm({
      kode: departemen.kode,
      nama: departemen.nama,
      kepalaDepartemen:
        departemen.kepalaDepartemen,
      jumlahKaryawan:
        departemen.jumlahKaryawan,
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

  const buatIdDepartemen = () => {
    const nomorTerbesar =
      daftarDepartemen.reduce(
        (terbesar, item) => {
          const nomor = Number(
            item.id.replace(
              'DEP-',
              '',
            ),
          )

          if (
            Number.isNaN(nomor)
          ) {
            return terbesar
          }

          return Math.max(
            terbesar,
            nomor,
          )
        },
        0,
      )

    return `DEP-${String(
      nomorTerbesar + 1,
    ).padStart(3, '0')}`
  }

  const handleSimpan = () => {
    if (
      form.kode.trim().length < 2
    ) {
      setError(
        'Kode departemen minimal 2 karakter.',
      )
      return
    }

    if (
      form.nama.trim().length < 3
    ) {
      setError(
        'Nama departemen minimal 3 karakter.',
      )
      return
    }

    if (
      form.kepalaDepartemen.trim().length < 3
    ) {
      setError(
        'Kepala departemen wajib diisi.',
      )
      return
    }

    if (
      form.jumlahKaryawan < 0
    ) {
      setError(
        'Jumlah karyawan tidak valid.',
      )
      return
    }

    const kodeSudahDipakai =
      daftarDepartemen.some(
        (item) =>
          item.kode.toLowerCase() ===
            form.kode
              .trim()
              .toLowerCase() &&
          item.id !== idEdit,
      )

    if (kodeSudahDipakai) {
      setError(
        'Kode departemen sudah digunakan.',
      )
      return
    }

    if (
      modeEdit &&
      idEdit
    ) {
      setDaftarDepartemen(
        (sebelumnya) =>
          sebelumnya.map(
            (item) =>
              item.id === idEdit
                ? {
                    ...item,
                    kode:
                      form.kode
                        .trim()
                        .toUpperCase(),
                    nama:
                      form.nama.trim(),
                    kepalaDepartemen:
                      form.kepalaDepartemen.trim(),
                    jumlahKaryawan:
                      form.jumlahKaryawan,
                  }
                : item,
          ),
      )
    } else {
      const departemenBaru: Departemen = {
        id:
          buatIdDepartemen(),

        kode:
          form.kode
            .trim()
            .toUpperCase(),

        nama:
          form.nama.trim(),

        kepalaDepartemen:
          form.kepalaDepartemen.trim(),

        jumlahKaryawan:
          form.jumlahKaryawan,
      }

      setDaftarDepartemen(
        (sebelumnya) => [
          departemenBaru,
          ...sebelumnya,
        ],
      )
    }

    tutupModal()
  }

  const handleHapus = (
    departemen: Departemen,
  ) => {
    setDepartemenAkanDihapus(
      departemen,
    )
  }

  const konfirmasiHapus = () => {
    if (
      !departemenAkanDihapus
    ) {
      return
    }

    setDaftarDepartemen(
      (sebelumnya) =>
        sebelumnya.filter(
          (item) =>
            item.id !==
            departemenAkanDihapus.id,
        ),
    )

    setDepartemenAkanDihapus(
      null,
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-medium text-slate-500">
            Struktur Organisasi
          </p>

          <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Data Departemen
          </h1>

          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-500">
            Kelola daftar departemen, kepala departemen,
            dan jumlah karyawan pada setiap unit kerja.
          </p>
        </div>

        <button
          type="button"
          onClick={bukaTambah}
          className="flex items-center justify-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
        >
          <Plus size={17} />
          Tambah Departemen
        </button>
      </div>

      {/* Pencarian */}
      <div className="rounded-2xl border border-slate-200 bg-white p-4">
        <div className="relative">
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
            placeholder="Cari kode, nama departemen, atau kepala departemen..."
            className="w-full rounded-xl border border-slate-200 py-3 pl-11 pr-4 text-sm outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
          />
        </div>

        <div className="mt-4 border-t border-slate-100 pt-4">
          <p className="text-sm text-slate-500">
            Menampilkan{' '}
            <span className="font-semibold text-slate-800">
              {dataTerfilter.length}
            </span>{' '}
            departemen
          </p>
        </div>
      </div>

      {/* Tabel */}
      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px]">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50">
                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Departemen
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Kode
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Kepala Departemen
                </th>

                <th className="px-6 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Jumlah Karyawan
                </th>

                <th className="px-6 py-3 text-right text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Aksi
                </th>
              </tr>
            </thead>

            <tbody>
              {dataTerfilter.length > 0 ? (
                dataTerfilter.map(
                  (departemen) => (
                    <tr
                      key={departemen.id}
                      className="border-b border-slate-100 transition last:border-b-0 hover:bg-slate-50"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-slate-600">
                            <Building2 size={18} />
                          </div>

                          <div>
                            <p className="text-sm font-semibold text-slate-800">
                              {departemen.nama}
                            </p>

                            <p className="mt-1 text-xs text-slate-400">
                              {departemen.id}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <span className="inline-flex rounded-lg bg-slate-100 px-2.5 py-1 text-xs font-bold text-slate-700">
                          {departemen.kode}
                        </span>
                      </td>

                      <td className="px-6 py-4 text-sm font-medium text-slate-700">
                        {departemen.kepalaDepartemen}
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Users
                            size={17}
                            className="text-slate-400"
                          />

                          <span className="text-sm font-bold text-slate-800">
                            {departemen.jumlahKaryawan}
                          </span>

                          <span className="text-xs text-slate-400">
                            orang
                          </span>
                        </div>
                      </td>

                      <td className="px-6 py-4">
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() =>
                              bukaEdit(
                                departemen,
                              )
                            }
                            title="Edit departemen"
                            className="flex h-9 w-9 items-center justify-center rounded-lg border border-slate-200 text-slate-600 transition hover:bg-slate-100 hover:text-slate-900"
                          >
                            <Edit3 size={16} />
                          </button>

                          <button
                            type="button"
                            onClick={() =>
                              handleHapus(
                                departemen,
                              )
                            }
                            title="Hapus departemen"
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
                    colSpan={5}
                    className="px-6 py-16 text-center"
                  >
                    <p className="text-sm font-semibold text-slate-600">
                      Data departemen tidak ditemukan
                    </p>

                    <p className="mt-1 text-xs text-slate-400">
                      Coba gunakan kata pencarian yang berbeda.
                    </p>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Tambah / Edit */}
      {modalTerbuka && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-slate-950/50 px-4 py-5">
          <div className="w-full max-w-2xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            <div className="flex items-start justify-between border-b border-slate-100 px-6 py-5">
              <div>
                <h2 className="text-xl font-bold text-slate-900">
                  {modeEdit
                    ? 'Edit Departemen'
                    : 'Tambah Departemen'}
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  {modeEdit
                    ? 'Perbarui informasi departemen.'
                    : 'Masukkan informasi departemen baru.'}
                </p>
              </div>

              <button
                type="button"
                onClick={tutupModal}
                aria-label="Tutup"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={19} />
              </button>
            </div>

            <div className="p-6">
              {error && (
                <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-medium text-red-700">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 gap-x-5 gap-y-5 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="kodeDepartemen"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Kode Departemen
                  </label>

                  <input
                    id="kodeDepartemen"
                    type="text"
                    maxLength={8}
                    value={form.kode}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        kode:
                          event.target.value
                            .replace(
                              /[^a-zA-Z0-9]/g,
                              '',
                            )
                            .toUpperCase(),
                      })

                      setError('')
                    }}
                    placeholder="Contoh: IT"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm uppercase text-slate-900 outline-none transition placeholder:normal-case placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="jumlahKaryawanDepartemen"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Jumlah Karyawan
                  </label>

                  <input
                    id="jumlahKaryawanDepartemen"
                    type="number"
                    min={0}
                    max={999}
                    value={form.jumlahKaryawan}
                    onChange={(event) => {
                      const nilai =
                        Number(
                          event.target.value,
                        )

                      setForm({
                        ...form,
                        jumlahKaryawan:
                          Number.isNaN(
                            nilai,
                          )
                            ? 0
                            : Math.max(
                                0,
                                nilai,
                              ),
                      })

                      setError('')
                    }}
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="namaDepartemen"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Nama Departemen
                  </label>

                  <input
                    id="namaDepartemen"
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
                    placeholder="Contoh: Teknologi Informasi"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label
                    htmlFor="kepalaDepartemen"
                    className="mb-2 block text-sm font-semibold text-slate-700"
                  >
                    Kepala Departemen
                  </label>

                  <input
                    id="kepalaDepartemen"
                    type="text"
                    value={form.kepalaDepartemen}
                    onChange={(event) => {
                      setForm({
                        ...form,
                        kepalaDepartemen:
                          event.target.value,
                      })

                      setError('')
                    }}
                    placeholder="Nama kepala departemen"
                    className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-slate-900 focus:ring-4 focus:ring-slate-100"
                  />
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/50 px-6 py-5">
              <button
                type="button"
                onClick={tutupModal}
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={handleSimpan}
                className="rounded-xl bg-slate-900 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-slate-800"
              >
                {modeEdit
                  ? 'Simpan Perubahan'
                  : 'Tambah Departemen'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Hapus */}
      {departemenAkanDihapus && (
        <div className="fixed inset-0 z-[120] flex items-center justify-center bg-slate-950/50 px-4">
          <div className="w-full max-w-md overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-2xl">
            <div className="p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-50 text-red-600">
                <Trash2 size={22} />
              </div>

              <h2 className="mt-5 text-xl font-bold text-slate-900">
                Hapus Departemen?
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Anda akan menghapus departemen{' '}
                <span className="font-semibold text-slate-800">
                  {departemenAkanDihapus.nama}
                </span>
                . Tindakan ini tidak dapat dibatalkan.
              </p>

              <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-slate-600 shadow-sm">
                    <Building2 size={18} />
                  </div>

                  <div>
                    <p className="text-sm font-semibold text-slate-800">
                      {departemenAkanDihapus.nama}
                    </p>

                    <p className="mt-1 text-xs text-slate-500">
                      {departemenAkanDihapus.kode}
                      {' • '}
                      {departemenAkanDihapus.id}
                    </p>
                  </div>
                </div>

                <div className="mt-4 border-t border-slate-200 pt-3">
                  <p className="text-xs text-slate-500">
                    Kepala Departemen
                  </p>

                  <p className="mt-1 text-sm font-semibold text-slate-700">
                    {departemenAkanDihapus.kepalaDepartemen}
                  </p>

                  <p className="mt-3 text-xs text-slate-500">
                    {departemenAkanDihapus.jumlahKaryawan}{' '}
                    karyawan
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-slate-100 bg-slate-50/70 px-6 py-4">
              <button
                type="button"
                onClick={() =>
                  setDepartemenAkanDihapus(
                    null,
                  )
                }
                className="rounded-xl border border-slate-200 bg-white px-5 py-2.5 text-sm font-semibold text-slate-600 transition hover:bg-slate-50 hover:text-slate-900"
              >
                Batal
              </button>

              <button
                type="button"
                onClick={konfirmasiHapus}
                className="flex items-center gap-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700"
              >
                <Trash2 size={16} />
                Hapus Departemen
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}