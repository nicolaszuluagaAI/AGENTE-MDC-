type Props = {
  titulo: string
  valor: string | number
  subtitulo?: string
  icono: React.ReactNode
  color: 'azul' | 'verde' | 'naranja' | 'violeta'
}

const colores = {
  azul: 'from-blue-500 to-blue-600',
  verde: 'from-emerald-500 to-emerald-600',
  naranja: 'from-orange-500 to-orange-600',
  violeta: 'from-violet-500 to-violet-600',
}

export default function MetricCard({ titulo, valor, subtitulo, icono, color }: Props) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex items-start gap-4">
      <div className={`bg-gradient-to-br ${colores[color]} p-3 rounded-xl text-white flex-shrink-0`}>
        {icono}
      </div>
      <div>
        <p className="text-sm text-gray-500 font-medium">{titulo}</p>
        <p className="text-3xl font-bold text-gray-900 mt-0.5">{valor}</p>
        {subtitulo && <p className="text-xs text-gray-400 mt-1">{subtitulo}</p>}
      </div>
    </div>
  )
}
