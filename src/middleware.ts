import { NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (pathname.startsWith('/login') || pathname.startsWith('/api') || pathname.startsWith('/_next')) {
        return NextResponse.next()
    }

    const session = request.cookies.get('mdc-session')?.value

    if (!session) {
        return NextResponse.redirect(new URL('/login', request.url))
    }

    return NextResponse.next()
}

export const config = {
    matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
}