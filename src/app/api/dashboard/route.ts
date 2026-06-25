import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [leadsRes, citasRes] = await Promise.all([
      supabase.from('leads_ghl').select('*'),
      supabase.from('citas_ghl').select('*'),
    ])

    if (leadsRes.error) throw new Error(`Leads: ${leadsRes.error.message}`)
    if (citasRes.error) throw new Error(`Citas: ${citasRes.error.message}`)

    const leads = leadsRes.data ?? []
    const citas = citasRes.data ?? []

    const totalLeads = leads.length
    const totalCitas = citas.length
    const tasaConversion = totalLeads > 0 ? (totalCitas / totalLeads) * 100 : 0

    const closerNames = ['Maryory', 'Felipe', 'Nicolas']
    const citasPorCloser = closerNames.map((nombre) => ({
      nombre,
      citas: citas.filter((c) =>
        c.calendar_name?.toLowerCase().includes(nombre.toLowerCase())
      ).length,
    }))

    const hoy = new Date()
    const leadsPorDia = Array.from({ length: 14 }, (_, i) => {
      const fecha = new Date(hoy)
      fecha.setDate(hoy.getDate() - (13 - i))
      const fechaStr = fecha.toISOString().split('T')[0]
      return {
        fecha: fechaStr,
        leads: leads.filter((l) => l.created_at?.startsWith(fechaStr)).length,
        citas: citas.filter((c) => c.created_at?.startsWith(fechaStr)).length,
      }
    })

    return NextResponse.json({
      totalLeads,
      totalCitas,
      tasaConversion: Math.round(tasaConversion * 10) / 10,
      citasPorCloser,
      leadsPorDia,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}