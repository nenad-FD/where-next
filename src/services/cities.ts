import { FUNCTIONS_URL, fetchWithAuth, supabase } from './supabase'

export interface City {
  id: string
  name: string
  description: string | null
  latitude: number | null
  longitude: number | null
  zoom: number | null
  image_url: string | null
  is_popular: boolean | null
  created_at: string
  updated_at: string
}

export type CreateCityPayload = Omit<City, 'id' | 'created_at' | 'updated_at'>

export async function getCityById(id: string): Promise<City> {
  const url = new URL(`${FUNCTIONS_URL}/get-city`)
  url.searchParams.set('id', id)

  const res = await fetchWithAuth(url)
  const body = await res.json() as { success: boolean; city?: City; error?: string }

  if (!res.ok) throw new Error(body.error ?? `Failed to fetch city (${res.status})`)
  return body.city!
}

// TODO: no get-cities edge function — needs to be created
export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase.from('cities').select('*')
  if (error) throw error
  return data
}

// TODO: no delete-city edge function — needs to be created
export async function deleteCity(id: string): Promise<void> {
  const { error } = await supabase.from('cities').delete().eq('id', id)
  if (error) throw error
}

export async function createCity(city: CreateCityPayload): Promise<City> {
  const url = new URL(`${FUNCTIONS_URL}/create-city`)

  const res = await fetchWithAuth(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(city),
  })
  const body = await res.json() as { success: boolean; city?: City; error?: string }

  if (!res.ok) throw new Error(body.error ?? `Failed to create city (${res.status})`)
  return body.city!
}
