import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { performaTeknisi } from '../../data/dashboard'

export default function PerformaTeknisi() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Performa Teknisi
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Jumlah tiket yang berhasil diselesaikan.
        </p>
      </div>

      <div className="mt-6 h-64">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <BarChart
            data={performaTeknisi}
            margin={{
              top: 5,
              right: 5,
              left: -25,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="nama"
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: '#64748b',
              }}
            />

            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{
                fontSize: 11,
                fill: '#64748b',
              }}
            />

            <Tooltip />

            <Bar
              dataKey="selesai"
              name="Tiket Selesai"
              fill="#0f172a"
              radius={[6, 6, 0, 0]}
              barSize={32}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}