'use client'

type CloserData = {
  nombre: string
  citas: number
}

const COLORES = ['#6366f1', '#10b981', '#f59e0b']

export default function CloserChart({ data }: { data: CloserData[] }) {
  const max = Math.max(...data.map((d) => d.citas), 1)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-base font-semibold text-gray-700 mb-5">Citas por closer</h2>
      <div className="space-y-4">
        {data.map((item, i) => (
          <div key={item.nombre}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium text-gray-700">{item.nombre}</span>
              <span className="text-sm font-bold text-gray-900">{item.citas}</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3">
              <div
                className="h-3 rounded-full transition-all duration-700"
                style={{
                  width: `${(item.citas / max) * 100}%`,
                  backgroundColor: COLORES[i % COLORES.length],
                  minWidth: item.citas > 0 ? '8px' : '0',
                }}
              />
            </div>
          </div>
        ))}
      </div>
      {data.every((d) => d.citas === 0) && (
        <p className="text-center text-gray-400 text-sm mt-4">Sin datos de citas aún</p>
      )}
    </div>
  )
}
