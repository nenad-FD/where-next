import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const FUNCTIONS_URL = `${supabaseUrl}/functions/v1`

export async function fetchWithAuth(url: URL, options?: RequestInit): Promise<Response> {
  const { data: { session } } = await supabase.auth.getSession()
  return fetch(url.toString(), {
    ...options,
    headers: {
      apikey: supabaseAnonKey,
      ...(session?.access_token ? { Authorization: `Bearer ${session.access_token}` } : {}),
      ...options?.headers,
    },
  })
}
