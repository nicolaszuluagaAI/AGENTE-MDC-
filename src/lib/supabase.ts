import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type Lead = {
  id: string
  nombre?: string
  email?: string
  telefono?: string
  created_at: string
  estado?: string
}

export type Agendamiento = {
  id: string
  lead_id?: string
  closer?: string
  fecha?: string
  estado?: string
  created_at: string
}

export type Closer = {
  id: string
  nombre: string
  email?: string
}
