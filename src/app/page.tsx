'use client'

import { useEffect, useState, useCallback } from 'react'
import Image from 'next/image'
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

const FUENTES = [
  { label: 'Todo', value: 'all' },
  { label: 'WhatsApp MDC', value: 'whatsapp_mdc' },
  { label: 'Instagram Dany', value: 'instagram_dany' },
  { label: 'Facebook Dany', value: 'facebook_dany' },
  { label: 'Instagram Sebas', value: 'instagram_sebas' },
]

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
  const [source, setSource] = useState('all')

  const fetchData = useCallback(async (src: string) => {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/dashboard?source=${src}`)
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
    fetchData(source)
    const interval = setInterval(() => fetchData(source), 60_000)
    return () => clearInterval(interval)
  }, [fetchData, source])

  const handleSource = (val: string) => {
    setSource(val)
    fetchData(val)
  }

  const closerConMasCitas = data?.citasPorCloser.reduce((a, b) => (a.citas >= b.citas ? a : b))

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f', color: '#e5e5e5' }}>
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-56 flex flex-col" style={{ backgroundColor: '#141414', borderRight: '1px solid #222' }}>
        <div className="flex items-center gap-3 px-5 py-6" style={{ borderBottom: '1px solid #222' }}>
          <Image src="/logo_mdc.png" alt="MDC Trading Academy" width={36} height={36} className="rounded-lg object-contain" />
          <div>
            <p className="text-xs font-bold text-white leading-tight">MDC Trading</p>
            <p className="text-xs" style={{ color: '#666' }}>Academy</p>
          </div>
        </div>
        <nav className="flex-1 px-3 py-4 space-y-1">
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
            Analíticas
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm" style={{ color: '#666' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6 5.87v-1a4 4 0 00-8 0v1M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg>
            Leads
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm" style={{ color: '#666' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
            Citas
          </div>
          <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm" style={{ color: '#666' }}>
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>
            Configuración
          </div>
        </nav>
        <div className="px-5 py-4" style={{ borderTop: '1px solid #222' }}>
          <p className="text-xs" style={{ color: '#444' }}>Powered by Inevo AI</p>
        </div>
      </div>

      {/* Main */}
      <div className="ml-56 min-h-screen">
        <header className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #1e1e1e' }}>
          <div>
            <h1 className="text-2xl font-bold text-white" style={{ fontStyle: 'italic' }}>Panel de Control</h1>
            <p className="text-sm" style={{ color: '#666' }}>Resumen de actividad del agente setter</p>
          </div>
          <div className="flex items-center gap-4">
            {lastUpdate && <span className="text-xs" style={{ color: '#555' }}>Actualizado {lastUpdate.toLocaleTimeString('es-CO', { hour: '2-digit', minute: '2-digit' })}</span>}
            <button onClick={() => fetchData(source)} disabled={loading} className="flex items-center gap-2 text-sm px-3 py-1.5 rounded-lg" style={{ color: '#c9a84c', border: '1px solid #333', backgroundColor: 'transparent' }}>
              <span className={loading ? 'animate-spin' : ''}><IconRefresh /></span>
              Actualizar
            </button>
          </div>
        </header>

        {/* Filtro por fuente */}
        <div className="px-8 pt-6">
          <div className="flex gap-2 flex-wrap">
            {FUENTES.map((f) => (
              <button
                key={f.value}
                onClick={() => handleSource(f.value)}
                className="text-sm px-4 py-1.5 rounded-full transition-all"
                style={{
                  backgroundColor: source === f.value ? '#c9a84c' : '#1e1e1e',
                  color: source === f.value ? '#000' : '#888',
                  border: '1px solid',
                  borderColor: source === f.value ? '#c9a84c' : '#333',
                  fontWeight: source === f.value ? 600 : 400,
                }}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <main className="px-8 py-6 space-y-8">
          {error && <div className="rounded-xl p-4 text-sm" style={{ backgroundColor: '#1a0a0a', border: '1px solid #3d1515', color: '#f87171' }}><strong>Error:</strong> {error}</div>}
          {loading && !data && <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">{[...Array(4)].map((_, i) => <div key={i} className="rounded-2xl p-6 h-28 animate-pulse" style={{ backgroundColor: '#1a1a1a' }} />)}</div>}
          {data && (
            <>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard titulo="Leads recibidos" valor={data.totalLeads.toLocaleString('es-CO')} subtitulo="Total acumulado" icono={<IconUsers />} color="azul" />
                <MetricCard titulo="Citas agendadas" valor={data.totalCitas.toLocaleString('es-CO')} subtitulo="Total acumulado" icono={<IconCalendar />} color="verde" />
                <MetricCard titulo="Tasa de conversión" valor={`${data.tasaConversion}%`} subtitulo="Citas / Leads" icono={<IconTrend />} color="naranja" />
                <MetricCard titulo="Closer líder" valor={closerConMasCitas?.citas ? closerConMasCitas.nombre : '—'} subtitulo={closerConMasCitas?.citas ? `${closerConMasCitas.citas} cita(s)` : 'Sin datos'} icono={<IconTarget />} color="violeta" />
              </div>
              <div className="grid lg:grid-cols-2 gap-6">
                <CloserChart data={data.citasPorCloser} />
                <ActivityChart data={data.leadsPorDia} />
              </div>
              <section>
                <h2 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#555' }}>Detalle por closer</h2>
                <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#141414', border: '1px solid #222' }}>
                  <table className="w-full text-sm">
                    <thead>
                      <tr style={{ borderBottom: '1px solid #222' }}>
                        <th className="text-left px-6 py-3 font-semibold" style={{ color: '#555' }}>Closer</th>
                        <th className="text-right px-6 py-3 font-semibold" style={{ color: '#555' }}>Citas agendadas</th>
                        <th className="text-right px-6 py-3 font-semibold" style={{ color: '#555' }}>% del total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data.citasPorCloser.map((c, i) => (
                        <tr key={c.nombre} style={{ borderBottom: i < data.citasPorCloser.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                          <td className="px-6 py-4"><div className="flex items-center gap-2"><div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#6366f1', '#10b981', '#c9a84c'][i] }} /><span className="font-medium text-white">{c.nombre}</span></div></td>
                          <td className="px-6 py-4 text-right font-bold text-white">{c.citas}</td>
                          <td className="px-6 py-4 text-right" style={{ color: '#666' }}>{data.totalCitas > 0 ? `${Math.round((c.citas / data.totalCitas) * 100)}%` : '—'}</td>
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
    </div>
  )
}