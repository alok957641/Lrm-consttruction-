import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// Debug ke liye (baad me hata dena)
console.log('Supabase URL:', supabaseUrl)
console.log('Supabase Key:', supabaseAnonKey ? 'Loaded ✓' : 'MISSING ✗')

export const supabase = createClient(supabaseUrl, supabaseAnonKey)