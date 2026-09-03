import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

import { trenTiket } from '../../data/dashboard'

export default function GrafikTrenTiket() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Tren Tiket
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Perbandingan tiket masuk dan tiket selesai selama 7 hari.
        </p>
      </div>

      <div className="mt-6 h-72">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <LineChart
            data={trenTiket}
            margin={{
              top: 5,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke="#e2e8f0"
            />

            <XAxis
              dataKey="hari"
              tick={{
                fontSize: 12,
                fill: '#64748b',
              }}
              axisLine={false}
              tickLine={false}
            />

            <YAxis
              tick={{
                fontSize: 12,
                fill: '#64748b',
              }}
              axisLine={false}
              tickLine={false}
            />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="masuk"
              name="Tiket Masuk"
              stroke="#0f172a"
              strokeWidth={3}
              dot={{
                r: 3,
              }}
            />

            <Line
              type="monotone"
              dataKey="selesai"
              name="Tiket Selesai"
              stroke="#94a3b8"
              strokeWidth={3}
              dot={{
                r: 3,
              }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-5 text-xs">
        <div className="flex items-center gap-2 text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-900" />
          Tiket Masuk
        </div>

        <div className="flex items-center gap-2 text-slate-500">
          <span className="h-2.5 w-2.5 rounded-full bg-slate-400" />
          Tiket Selesai
        </div>
      </div>
    </div>
  )
}