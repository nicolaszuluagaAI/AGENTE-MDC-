'use client'

import { useEffect, useState } from 'react'

interface Cita {
    id: string
    created_at: string
    appointment_id: string
    contact_name: string
    phone: string
    email: string
    calendar_name: string
    start_time: string
    end_time: string
    status: string
    closer_email: string
    source: string
}

const SOURCES = ['Todos', 'whatsapp_mdc', 'instagram_dany', 'facebook_dany', 'instagram_sebas']
const CLOSERS = [
    { label: 'Todos', value: '' },
    { label: 'Maryory', value: 'maryory@mdctradingacademy.com' },
    { label: 'Felipe', value: 'felipe@mdctradingacademy.com' },
    { label: 'Nicolas', value: 'nicolas@mdctradingacademy.com' },
]

export default function CitasPage() {
    const [citas, setCitas] = useState<Cita[]>([])
    const [loading, setLoading] = useState(true)
    const [source, setSource] = useState('Todos')
    const [closer, setCloser] = useState('')

    useEffect(() => {
        const params = new URLSearchParams()
        if (source !== 'Todos') params.set('source', source)
        if (closer) params.set('closer', closer)

        fetch(`/api/citas?${params.toString()}`)
            .then(res => res.json())
            .then(data => {
                setCitas(data.citas || [])
                setLoading(false)
            })
    }, [source, closer])

    const formatDate = (str: string) => {
        if (!str) return '-'
        return new Date(str).toLocaleString('es-CO', { timeZone: 'America/Bogota' })
    }

    const closerName = (email: string) => {
        if (!email) return '-'
        if (email.includes('maryory')) return 'Maryory'
        if (email.includes('felipe')) return 'Felipe'
        if (email.includes('nicolas')) return 'Nicolas'
        return email
    }

    return (
        <div style={{ padding: '24px' }}>
            <h1 style={{ fontSize: '24px', fontWeight: 700, marginBottom: '24px', color: '#fff' }}>
                Citas Agendadas
            </h1>

            {/* Filtros */}
            <div style={{ display: 'flex', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
                <div>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Fuente</label>
                    <select
                        value={source}
                        onChange={e => { setSource(e.target.value); setLoading(true) }}
                        style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '8px', padding: '8px 12px', fontSize: '14px' }}
                    >
                        {SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>

                <div>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Closer</label>
                    <select
                        value={closer}
                        onChange={e => { setCloser(e.target.value); setLoading(true) }}
                        style={{ background: '#1f2937', color: '#fff', border: '1px solid #374151', borderRadius: '8px', padding: '8px 12px', fontSize: '14px' }}
                    >
                        {CLOSERS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                </div>
            </div>

            {/* Tabla */}
            {loading ? (
                <p style={{ color: '#9ca3af' }}>Cargando citas...</p>
            ) : (
                <div style={{ overflowX: 'auto' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px' }}>
                        <thead>
                            <tr style={{ borderBottom: '1px solid #374151' }}>
                                {['Contacto', 'Email', 'Teléfono', 'Calendario', 'Inicio', 'Estado', 'Closer', 'Fuente'].map(h => (
                                    <th key={h} style={{ textAlign: 'left', padding: '10px 12px', color: '#9ca3af', fontWeight: 600 }}>{h}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {citas.length === 0 ? (
                                <tr><td colSpan={8} style={{ padding: '24px', color: '#6b7280', textAlign: 'center' }}>No hay citas</td></tr>
                            ) : (
                                citas.map(c => (
                                    <tr key={c.id} style={{ borderBottom: '1px solid #1f2937' }}>
                                        <td style={{ padding: '10px 12px', color: '#fff' }}>{c.contact_name || '-'}</td>
                                        <td style={{ padding: '10px 12px', color: '#d1d5db' }}>{c.email || '-'}</td>
                                        <td style={{ padding: '10px 12px', color: '#d1d5db' }}>{c.phone || '-'}</td>
                                        <td style={{ padding: '10px 12px', color: '#d1d5db' }}>{c.calendar_name || '-'}</td>
                                        <td style={{ padding: '10px 12px', color: '#d1d5db' }}>{formatDate(c.start_time)}</td>
                                        <td style={{ padding: '10px 12px' }}>
                                            <span style={{
                                                background: c.status === 'booked' ? '#065f46' : '#374151',
                                                color: c.status === 'booked' ? '#6ee7b7' : '#9ca3af',
                                                padding: '2px 8px', borderRadius: '9999px', fontSize: '12px'
                                            }}>{c.status || '-'}</span>
                                        </td>
                                        <td style={{ padding: '10px 12px', color: '#d1d5db' }}>{closerName(c.closer_email)}</td>
                                        <td style={{ padding: '10px 12px', color: '#d1d5db' }}>{c.source || '-'}</td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                    <p style={{ color: '#6b7280', fontSize: '13px', marginTop: '12px' }}>{citas.length} citas encontradas</p>
                </div>
            )}
        </div>
    )
}