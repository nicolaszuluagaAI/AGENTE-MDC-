'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const router = useRouter()

    const handleLogin = async () => {
        setLoading(true)
        setError('')

        const supabase = createClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL!,
            process.env.NEXT_PUBLIC_SU_BASE_ANON_KEY!
        )

        const { error } = await supabase.auth.signInWithPassword({ email, password })

        if (error) {
            setError('Email o contraseña incorrectos')
            setLoading(false)
        } else {
            router.push('/')
        }
    }

    return (
        <div style={{
            minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center',
            background: '#0f1117'
        }}>
            <div style={{
                background: '#1a1d27', borderRadius: '16px', padding: '40px',
                width: '100%', maxWidth: '400px', border: '1px solid #2d3148'
            }}>
                <h1 style={{ color: '#fff', fontSize: '22px', fontWeight: 700, marginBottom: '8px' }}>
                    MDC Trading Academy
                </h1>
                <p style={{ color: '#6b7280', fontSize: '14px', marginBottom: '32px' }}>
                    Panel de control — Agente IA
                </p>

                <div style={{ marginBottom: '16px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                        placeholder="tu@email.com"
                        style={{
                            width: '100%', background: '#0f1117', border: '1px solid #374151',
                            borderRadius: '8px', padding: '10px 12px', color: '#fff',
                            fontSize: '14px', boxSizing: 'border-box'
                        }}
                    />
                </div>

                <div style={{ marginBottom: '24px' }}>
                    <label style={{ color: '#9ca3af', fontSize: '13px', display: 'block', marginBottom: '6px' }}>Contraseña</label>
                    <input
                        type="password"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        placeholder="••••••••"
                        onKeyDown={e => e.key === 'Enter' && handleLogin()}
                        style={{
                            width: '100%', background: '#0f1117', border: '1px solid #374151',
                            borderRadius: '8px', padding: '10px 12px', color: '#fff',
                            fontSize: '14px', boxSizing: 'border-box'
                        }}
                    />
                </div>

                {error && (
                    <p style={{ color: '#f87171', fontSize: '13px', marginBottom: '16px' }}>{error}</p>
                )}

                <button
                    onClick={handleLogin}
                    disabled={loading}
                    style={{
                        width: '100%', background: '#6366f1', color: '#fff', border: 'none',
                        borderRadius: '8px', padding: '12px', fontSize: '15px', fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1
                    }}
                >
                    {loading ? 'Ingresando...' : 'Ingresar'}
                </button>
            </div>
        </div>
    )
}