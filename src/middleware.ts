import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    // Rutas públicas — no requieren login
    if (pathname.startsWith('/login') || pathname.startsWith('/api')) {
        return NextResponse.next()
    }

    // Verificar sesión
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
    const supabaseKey = process.env.NEXT_PUBLIC_SU_BASE_ANON_KEY!

    const accessToken = request.cookies.get('sb-access-token')?.value ||
        request.cookies.get(`sb-${supabaseUrl.split('//')[1].split('.')[0]}-auth-token`)?.value

    if (!accessToken) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data: { user }, error } = await supabase.auth.getUser(accessToken)

    if (error || !user) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}