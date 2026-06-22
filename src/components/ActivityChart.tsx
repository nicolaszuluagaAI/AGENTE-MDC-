'use client'

type DayData = {
  fecha: string
  leads: number
  citas: number
}

function formatFecha(fecha: string) {
  const d = new Date(fecha + 'T00:00:00')
  return d.toLocaleDateString('es-CO', { month: 'short', day: 'numeric' })
}

export default function ActivityChart({ data }: { data: DayData[] }) {
  const maxVal = Math.max(...data.flatMap((d) => [d.leads, d.citas]), 1)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-base font-semibold text-gray-700">Actividad últimos 14 días</h2>
        <div className="flex gap-4 text-xs text-gray-500">
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-blue-500 inline-block" /> Leads
          </span>
          <span className="flex items-center gap-1">
            <span className="w-3 h-3 rounded-sm bg-emerald-500 inline-block" /> Citas
          </span>
        </div>
      </div>
      <div className="flex items-end gap-1.5 h-32">
        {data.map((day) => (
          <div key={day.fecha} className="flex-1 flex flex-col items-center gap-0.5">
            <div className="w-full flex gap-0.5 items-end h-24">
              <div
                className="flex-1 bg-blue-400 rounded-t transition-all duration-500"
                style={{ height: `${(day.leads / maxVal) * 100}%`, minHeight: day.leads > 0 ? '4px' : '0' }}
                title={`${day.leads} leads`}
              />
              <div
                className="flex-1 bg-emerald-400 rounded-t transition-all duration-500"
                style={{ height: `${(day.citas / maxVal) * 100}%`, minHeight: day.citas > 0 ? '4px' : '0' }}
                title={`${day.citas} citas`}
              />
            </div>
            <span className="text-[9px] text-gray-400 rotate-45 origin-left mt-1 whitespace-nowrap">
              {formatFecha(day.fecha)}
            </span>
          </div>
        ))}
      </div>
      {data.every((d) => d.leads === 0 && d.citas === 0) && (
        <p className="text-center text-gray-400 text-sm mt-2">Sin actividad registrada</p>
      )}
    </div>
  )
}
