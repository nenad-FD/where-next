import { FUNCTIONS_URL, fetchWithAuth, supabase } from './supabase'

export interface Place {
  id: string
  city_id: string
  category_id: string | null
  name: string
  address: string | null
  description: string | null
  image_url: string | null
  latitude: number | null
  longitude: number | null
  zoom: number | null
  tips: string | null
  highlights: string | null
  average_rating: number | null
  created_at: string
  updated_at: string
}

export type CreatePlacePayload = Omit<Place, 'id' | 'created_at' | 'updated_at' | 'average_rating'>

export async function getPlaceById(id: string): Promise<Place> {
  const url = new URL(`${FUNCTIONS_URL}/get-place`)
  url.searchParams.set('id', id)

  const res = await fetchWithAuth(url)
  const body = await res.json() as { success: boolean; place?: Place; error?: string }

  if (!res.ok) throw new Error(body.error ?? `Failed to fetch place (${res.status})`)
  return body.place!
}

export async function getPlacesByCityAndCategory(cityId: string, categoryId: string): Promise<Place[]> {
  const url = new URL(`${FUNCTIONS_URL}/get-places-by-city-and-category`)
  url.searchParams.set('city_id', cityId)
  url.searchParams.set('category_id', categoryId)

  const res = await fetchWithAuth(url)
  const body = await res.json() as { success: boolean; places?: Place[]; error?: string }

  if (!res.ok) throw new Error(body.error ?? `Failed to fetch places (${res.status})`)
  return body.places ?? []
}

// TODO: no delete-place edge function — needs to be created
export async function deletePlace(id: string): Promise<void> {
  const { error } = await supabase.from('places').delete().eq('id', id)
  if (error) throw error
}

// TODO: no create-place edge function — needs to be created
export async function createPlace(place: CreatePlacePayload): Promise<Place> {
  const { data, error } = await supabase.from('places').insert(place).select().single()
  if (error) throw error
  return data
}
