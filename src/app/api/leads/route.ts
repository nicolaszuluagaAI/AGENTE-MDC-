import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SU_BASE_ANON_KEY!
)

export async function GET(req: NextRequest) {
    const source = req.nextUrl.searchParams.get('source') ?? 'all'

    let query = supabase
        .from('leads_ghl')
        .select('*')
        .order('created_at', { ascending: false })

    if (source !== 'all') {
        query = query.eq('source', source)
    }

    const { data, error } = await query

    if (error) return NextResponse.json({ error: error.message }, { status: 500 })

    return NextResponse.json(data)
}