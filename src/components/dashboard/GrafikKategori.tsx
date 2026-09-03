import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { kategoriTiket } from '../../data/dashboard'

export default function GrafikKategori() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Tiket Berdasarkan Kategori
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Distribusi kendala berdasarkan jenis masalah.
        </p>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={kategoriTiket}
            layout="vertical"
            margin={{
              top: 0,
              right: 10,
              bottom: 0,
              left: 15,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              horizontal={false}
              stroke="#e2e8f0"
            />

            <XAxis
              type="number"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: '#64748b',
              }}
            />

            <YAxis
              type="category"
              dataKey="nama"
              width={110}
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 10,
                fill: '#64748b',
              }}
            />

            <Tooltip />

            <Bar
              dataKey="jumlah"
              name="Jumlah Tiket"
              fill="#0f172a"
              radius={[0, 6, 6, 0]}
              barSize={18}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}