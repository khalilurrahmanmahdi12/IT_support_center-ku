import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'

import { prioritasTiket } from '../../data/dashboard'

const warna = [
  '#cbd5e1',
  '#94a3b8',
  '#475569',
  '#0f172a',
]

export default function GrafikPrioritas() {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
      <div>
        <h2 className="text-base font-bold text-slate-900">
          Prioritas Tiket
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Persentase tiket berdasarkan tingkat prioritas.
        </p>
      </div>

      <div className="mt-5 h-56">
        <ResponsiveContainer
          width="100%"
          height="100%"
        >
          <PieChart>
            <Pie
              data={prioritasTiket}
              dataKey="jumlah"
              nameKey="nama"
              innerRadius={55}
              outerRadius={82}
              paddingAngle={3}
            >
              {prioritasTiket.map((item, index) => (
                <Cell
                  key={item.nama}
                  fill={warna[index]}
                />
              ))}
            </Pie>

            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-3">
        {prioritasTiket.map((item, index) => (
          <div
            key={item.nama}
            className="flex items-center justify-between gap-2 text-sm"
          >
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{
                  backgroundColor: warna[index],
                }}
              />

              <span className="text-slate-500">
                {item.nama}
              </span>
            </div>

            <span className="font-semibold text-slate-800">
              {item.jumlah}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}