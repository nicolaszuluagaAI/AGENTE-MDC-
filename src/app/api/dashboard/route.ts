import { NextResponse } from 'next/server'
import { supabase } from '@/lib/supabase'

export async function GET() {
  try {
    const [leadsRes, agendamientosRes, closersRes] = await Promise.all([
      supabase.from('leads').select('*'),
      supabase.from('agendamientos').select('*'),
      supabase.from('closers').select('*'),
    ])

    if (leadsRes.error) throw new Error(`Leads: ${leadsRes.error.message}`)
    if (agendamientosRes.error) throw new Error(`Agendamientos: ${agendamientosRes.error.message}`)

    const leads = leadsRes.data ?? []
    const agendamientos = agendamientosRes.data ?? []
    const closers = closersRes.data ?? []

    const totalLeads = leads.length
    const totalCitas = agendamientos.length
    const tasaConversion = totalLeads > 0 ? (totalCitas / totalLeads) * 100 : 0

    const closerNames = ['Maryory', 'Felipe', 'Nicolas']
    const citasPorCloser = closerNames.map((nombre) => ({
      nombre,
      citas: agendamientos.filter(
        (a) => a.closer?.toLowerCase() === nombre.toLowerCase()
      ).length,
    }))

    // Agrupar leads por día (últimos 14 días)
    const hoy = new Date()
    const leadsPorDia = Array.from({ length: 14 }, (_, i) => {
      const fecha = new Date(hoy)
      fecha.setDate(hoy.getDate() - (13 - i))
      const fechaStr = fecha.toISOString().split('T')[0]
      return {
        fecha: fechaStr,
        leads: leads.filter((l) => l.created_at?.startsWith(fechaStr)).length,
        citas: agendamientos.filter((a) => a.created_at?.startsWith(fechaStr)).length,
      }
    })

    return NextResponse.json({
      totalLeads,
      totalCitas,
      tasaConversion: Math.round(tasaConversion * 10) / 10,
      citasPorCloser,
      leadsPorDia,
      closers,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Error desconocido'
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
