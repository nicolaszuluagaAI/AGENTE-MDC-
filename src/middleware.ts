import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/login') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return NextResponse.next()
    }

    const token = request.cookies.get('sb-access-token')?.value ||
        [...request.cookies.getAll()].find(c => c.name.includes('auth-token'))?.value

    if (!token) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}