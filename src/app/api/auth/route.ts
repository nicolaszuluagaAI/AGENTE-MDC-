import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function POST(request: NextRequest) {
    const { email, password } = await request.json()

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
        return NextResponse.json({ error: 'Credenciales incorrectas' }, { status: 401 })
    }

    const response = NextResponse.json({ success: true })
    response.cookies.set('mdc-session', 'authenticated', {
        httpOnly: true,
        secure: true,
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7
    })

    return response
}