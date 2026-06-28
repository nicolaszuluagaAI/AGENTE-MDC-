import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export async function GET(request: NextRequest) {
    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_ROLE_KEY!
    )

    const { searchParams } = new URL(request.url)
    const source = searchParams.get('source')
    const closer = searchParams.get('closer')

    let query = supabase
        .from('citas_ghl')
        .select('*')
        .order('created_at', { ascending: false })

    if (source) {
        query = query.eq('source', source)
    }

    if (closer) {
        query = query.eq('closer_email', closer)
    }

    const { data, error } = await query

    if (error) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }

    return NextResponse.json({ citas: data })
}