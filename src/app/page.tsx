'use client'

import { useEffect, useState, useCallback } from 'react'
import MetricCard from '@/components/MetricCard'
import CloserChart from '@/components/CloserChart'
import ActivityChart from '@/components/ActivityChart'

type DashboardData = {
  totalLeads: number
  totalCitas: number
  tasaConversion: number
  citasPorCloser: { nombre: string; citas: number }[]
  leadsPorDia: { fecha: string; leads: number; citas: number }[]
}

const IconUsers = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6 5.87v-1a4 4 0 00-8 0v1M12 12a4 4 0 100-8 4 4 0 000 8z" />
  </svg>
)

const IconCalendar = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
  </svg>
)

const IconTrend = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
  </svg>
)

const IconTarget = () => (
  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
)

const IconRefresh = () => (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
)

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null)

  const fetchData = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/dashboard')
      const json = await res.json()
      if (!res.ok) throw new Error(json.error ?? 'Error al cargar datos')
      setData(json)
      setLastUpdate(new Date())
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Error desconocido')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchData()
    const interval = setInterval(fetchData, 60_000)
    return () => clearInterval(interval)
  }, [fetchData])

  const closerConMasCitas = data?.citasPorCloser.reduce((a, b) => (a.citas >= b.citas ? a : b))

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 bg-gradient-to-br from-blue-600 to-violet-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <div>
              <h1 className="text-lg font-bold text-gray-900">MDC Trading Academy</h1>
              <p className="text-xs text-gray-400">Dashboard · Agente IA</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            {lastUpdate && (
              <span className="text-xs text-gray-400">
                Actualizado {lastUpdate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}
              </span>
            )}
            <button
              onClick={fetchData}
              disabled={loading}
              className="flex items-center gap-1.5 text-sm text-blue-600 hover:text-blue-800 disabled:opacity-40 transition-colors"
            >
              <span className={loading ? 'animate-spin' : ''}><IconRefresh /></span>
              Actualizar
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Error */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-sm text-red-700">
            <strong>Error al conectar con Supabase:</strong> {error}
            <p className="mt-1 text-red-500 text-xs">
              Verifica que la ANON_KEY en .env.local esté completa y que las tablas existan.
            </p>
          </div>
        )}

        {/* Skeleton loader */}
        {loading && !data && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white rounded-2xl border border-gray-100 p-6 h-28 animate-pulse">
                <div className="flex gap-4">
                  <div className="w-11 h-11 bg-gray-200 rounded-xl" />
                  <div className="flex-1 space-y-2 pt-1">
                    <div className="h-3 bg-gray-200 rounded w-3/4" />
                    <div className="h-7 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {data && (
          <>
            {/* Métricas principales */}
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Resumen general
              </h2>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  titulo="Leads recibidos"
                  valor={data.totalLeads.toLocaleString('es-CO')}
                  subtitulo="Total acumulado"
                  icono={<IconUsers />}
                  color="azul"
                />
                <MetricCard
                  titulo="Citas agendadas"
                  valor={data.totalCitas.toLocaleString('es-CO')}
                  subtitulo="Total acumulado"
                  icono={<IconCalendar />}
                  color="verde"
                />
                <MetricCard
                  titulo="Tasa de conversión"
                  valor={`${data.tasaConversion}%`}
                  subtitulo="Citas / Leads"
                  icono={<IconTrend />}
                  color="naranja"
                />
                <MetricCard
                  titulo="Closer líder"
                  valor={closerConMasCitas?.citas ? closerConMasCitas.nombre : '—'}
                  subtitulo={closerConMasCitas?.citas ? `${closerConMasCitas.citas} cita(s)` : 'Sin datos'}
                  icono={<IconTarget />}
                  color="violeta"
                />
              </div>
            </section>

            {/* Gráficos */}
            <section className="grid lg:grid-cols-2 gap-6">
              <CloserChart data={data.citasPorCloser} />
              <ActivityChart data={data.leadsPorDia} />
            </section>

            {/* Tabla de closers */}
            <section>
              <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-4">
                Detalle por closer
              </h2>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-gray-100 bg-gray-50">
                      <th className="text-left px-6 py-3 font-semibold text-gray-500">Closer</th>
                      <th className="text-right px-6 py-3 font-semibold text-gray-500">Citas agendadas</th>
                      <th className="text-right px-6 py-3 font-semibold text-gray-500">% del total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.citasPorCloser.map((c, i) => (
                      <tr
                        key={c.nombre}
                        className={i < data.citasPorCloser.length - 1 ? 'border-b border-gray-50' : ''}
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full"
                              style={{ backgroundColor: ['#6366f1', '#10b981', '#f59e0b'][i] }}
                            />
                            <span className="font-medium text-gray-800">{c.nombre}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right font-semibold text-gray-900">{c.citas}</td>
                        <td className="px-6 py-4 text-right text-gray-500">
                          {data.totalCitas > 0
                            ? `${Math.round((c.citas / data.totalCitas) * 100)}%`
                            : '—'}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          </>
        )}
      </main>
    </div>
  )
}
