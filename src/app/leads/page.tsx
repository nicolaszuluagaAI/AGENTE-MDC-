'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Lead = {
    id: number
    created_at: string
    contact_name: string
    phone: string
    email: string
    country: string
    source: string
}

const FUENTES = [
    { label: 'Todo', value: 'all' },
    { label: 'WhatsApp MDC', value: 'whatsapp_mdc' },
    { label: 'Instagram Dany', value: 'instagram_dany' },
    { label: 'Facebook Dany', value: 'facebook_dany' },
    { label: 'Instagram Sebas', value: 'instagram_sebas' },
]

export default function LeadsPage() {
    const [leads, setLeads] = useState<Lead[]>([])
    const [loading, setLoading] = useState(true)
    const [source, setSource] = useState('all')

    useEffect(() => {
        setLoading(true)
        fetch(`/api/leads?source=${source}`)
            .then((r) => r.json())
            .then((data) => { setLeads(data); setLoading(false) })
    }, [source])

    return (
        <div className="min-h-screen" style={{ backgroundColor: '#0f0f0f', color: '#e5e5e5' }}>
            {/* Sidebar */}
            <div className="fixed left-0 top-0 h-full w-56 flex flex-col" style={{ backgroundColor: '#141414', borderRight: '1px solid #222' }}>
                <div className="flex items-center gap-3 px-5 py-6" style={{ borderBottom: '1px solid #222' }}>
                    <Image src="/logo_mdc.png" alt="MDC" width={36} height={36} className="rounded-lg object-contain" />
                    <div>
                        <p className="text-xs font-bold text-white leading-tight">MDC Trading</p>
                        <p className="text-xs" style={{ color: '#666' }}>Academy</p>
                    </div>
                </div>
                <nav className="flex-1 px-3 py-4 space-y-1">
                    <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm" style={{ color: '#666' }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>
                        Analíticas
                    </Link>
                    <Link href="/leads" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: '#1e1e1e', color: '#fff' }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87m6 5.87v-1a4 4 0 00-8 0v1M12 12a4 4 0 100-8 4 4 0 000 8z" /></svg>
                        Leads
                    </Link>
                    <Link href="/citas" className="flex items-center gap-3 px-3 py-2 rounded-lg text-sm" style={{ color: '#666' }}>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}><path strokeLinecap="round" strokeLinejoin="round" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                        Citas
                    </Link>
                </nav>
                <div className="px-5 py-4" style={{ borderTop: '1px solid #222' }}>
                    <p className="text-xs" style={{ color: '#444' }}>Powered by Inevo AI</p>
                </div>
            </div>

            {/* Main */}
            <div className="ml-56 min-h-screen">
                <header className="flex items-center justify-between px-8 py-5" style={{ borderBottom: '1px solid #1e1e1e' }}>
                    <div>
                        <h1 className="text-2xl font-bold text-white" style={{ fontStyle: 'italic' }}>Leads</h1>
                        <p className="text-sm" style={{ color: '#666' }}>Todos los leads registrados</p>
                    </div>
                </header>

                <div className="px-8 pt-6">
                    <div className="flex gap-2 flex-wrap">
                        {FUENTES.map((f) => (
                            <button key={f.value} onClick={() => setSource(f.value)} className="text-sm px-4 py-1.5 rounded-full transition-all"
                                style={{ backgroundColor: source === f.value ? '#c9a84c' : '#1e1e1e', color: source === f.value ? '#000' : '#888', border: '1px solid', borderColor: source === f.value ? '#c9a84c' : '#333', fontWeight: source === f.value ? 600 : 400 }}>
                                {f.label}
                            </button>
                        ))}
                    </div>
                </div>

                <main className="px-8 py-6">
                    {loading ? (
                        <div className="rounded-2xl p-6 animate-pulse" style={{ backgroundColor: '#1a1a1a', height: 200 }} />
                    ) : (
                        <div className="rounded-2xl overflow-hidden" style={{ backgroundColor: '#141414', border: '1px solid #222' }}>
                            <table className="w-full text-sm">
                                <thead>
                                    <tr style={{ borderBottom: '1px solid #222' }}>
                                        <th className="text-left px-6 py-3 font-semibold" style={{ color: '#555' }}>Nombre</th>
                                        <th className="text-left px-6 py-3 font-semibold" style={{ color: '#555' }}>Email</th>
                                        <th className="text-left px-6 py-3 font-semibold" style={{ color: '#555' }}>Teléfono</th>
                                        <th className="text-left px-6 py-3 font-semibold" style={{ color: '#555' }}>País</th>
                                        <th className="text-left px-6 py-3 font-semibold" style={{ color: '#555' }}>Fuente</th>
                                        <th className="text-left px-6 py-3 font-semibold" style={{ color: '#555' }}>Fecha</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leads.map((lead, i) => (
                                        <tr key={lead.id} style={{ borderBottom: i < leads.length - 1 ? '1px solid #1a1a1a' : 'none' }}>
                                            <td className="px-6 py-4 font-medium text-white">{lead.contact_name || '—'}</td>
                                            <td className="px-6 py-4" style={{ color: '#aaa' }}>{lead.email || '—'}</td>
                                            <td className="px-6 py-4" style={{ color: '#aaa' }}>{lead.phone || '—'}</td>
                                            <td className="px-6 py-4" style={{ color: '#aaa' }}>{lead.country || '—'}</td>
                                            <td className="px-6 py-4"><span className="text-xs px-2 py-1 rounded-full" style={{ backgroundColor: '#1e1e1e', color: '#c9a84c', border: '1px solid #333' }}>{lead.source || '—'}</span></td>
                                            <td className="px-6 py-4" style={{ color: '#666' }}>{new Date(lead.created_at).toLocaleDateString('es-CO')}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            {leads.length === 0 && <p className="text-center py-12" style={{ color: '#555' }}>No hay leads registrados</p>}
                        </div>
                    )}
                </main>
            </div>
        </div>
    )
}