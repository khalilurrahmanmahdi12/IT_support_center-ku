import { useEffect } from 'react'

import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom'

import ProtectedRoute from './components/auth/ProtectedRoute'

import Login from './pages/auth/Login'
import VerifikasiOtp from './pages/auth/VerifikasiOtp'

import AdminLayout from './layouts/AdminLayout'
import KaryawanLayout from './layouts/KaryawanLayout'
import TeknisiLayout from './layouts/TeknisiLayout'

import DasborAdmin from './pages/admin/DasborAdmin'
import SemuaTiket from './pages/admin/SemuaTiket'
import DetailTiket from './pages/admin/DetailTiket'
import DataKaryawan from './pages/admin/DataKaryawan'
import DataTeknisi from './pages/admin/DataTeknisi'
import DataDepartemen from './pages/admin/DataDepartemen'
import Laporan from './pages/admin/Laporan'

import DasborKaryawan from './pages/karyawan/DasborKaryawan'
import BuatTiket from './pages/karyawan/BuatTiket'
import TiketSaya from './pages/karyawan/TiketSaya'
import DetailTiketKaryawan from './pages/karyawan/DetailTiketKaryawan'

import DasborTeknisi from './pages/teknisi/DasborTeknisi'
import TiketDitugaskan from './pages/teknisi/TiketDitugaskan'
import DetailTiketTeknisi from './pages/teknisi/DetailTiketTeknisi'
import RiwayatPekerjaan from './pages/teknisi/RiwayatPekerjaan'

import Profil from './pages/Profil'
import Pengaturan from './pages/Pengaturan'

import TidakDitemukan from './pages/TidakDitemukan'

import { useAuthStore } from './store/authStore'

function App() {
  const muatSesi = useAuthStore(
    (state) => state.muatSesi,
  )

  useEffect(() => {
    muatSesi()
  }, [muatSesi])

  return (
    <BrowserRouter>
      <Routes>
        {/* =========================
            HALAMAN AWAL
        ========================== */}
        <Route
          path="/"
          element={
            <Navigate
              to="/login"
              replace
            />
          }
        />

        {/* =========================
            AUTENTIKASI
        ========================== */}
        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/verifikasi-otp"
          element={<VerifikasiOtp />}
        />

        {/* =========================
            ADMIN
        ========================== */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DasborAdmin />}
          />

          <Route
            path="tiket"
            element={<SemuaTiket />}
          />

          <Route
            path="tiket/:id"
            element={<DetailTiket />}
          />

          <Route
            path="karyawan"
            element={<DataKaryawan />}
          />

          <Route
            path="teknisi"
            element={<DataTeknisi />}
          />

          <Route
            path="departemen"
            element={<DataDepartemen />}
          />

          <Route
            path="laporan"
            element={<Laporan />}
          />

          <Route
            path="profil"
            element={<Profil />}
          />

          <Route
            path="pengaturan"
            element={<Pengaturan />}
          />
        </Route>

        {/* =========================
            TEKNISI
        ========================== */}
        <Route
          path="/teknisi"
          element={
            <ProtectedRoute role="teknisi">
              <TeknisiLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DasborTeknisi />}
          />

          <Route
            path="tiket"
            element={<TiketDitugaskan />}
          />

          <Route
            path="tiket/:id"
            element={<DetailTiketTeknisi />}
          />

          <Route
            path="riwayat"
            element={<RiwayatPekerjaan />}
          />

          <Route
            path="profil"
            element={<Profil />}
          />

          <Route
            path="pengaturan"
            element={<Pengaturan />}
          />
        </Route>

        {/* =========================
            KARYAWAN
        ========================== */}
        <Route
          path="/karyawan"
          element={
            <ProtectedRoute role="karyawan">
              <KaryawanLayout />
            </ProtectedRoute>
          }
        >
          <Route
            index
            element={<DasborKaryawan />}
          />

          <Route
            path="tiket/baru"
            element={<BuatTiket />}
          />

          <Route
            path="tiket"
            element={<TiketSaya />}
          />

          <Route
            path="tiket/:id"
            element={<DetailTiketKaryawan />}
          />

          <Route
            path="profil"
            element={<Profil />}
          />

          <Route
            path="pengaturan"
            element={<Pengaturan />}
          />
        </Route>

        {/* =========================
            404
        ========================== */}
        <Route
          path="*"
          element={<TidakDitemukan />}
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App