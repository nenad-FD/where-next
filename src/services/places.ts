import { supabase } from './supabase'

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

export async function getPlacesByCityAndCategory(cityId: string, categoryId: string): Promise<Place[]> {
  const { data, error } = await supabase
    .from('places')
    .select('*')
    .eq('city_id', cityId)
    .eq('category_id', categoryId)
  if (error) throw error
  return data
}

export async function createPlace(place: CreatePlacePayload): Promise<Place> {
  const { data, error } = await supabase.from('places').insert(place).select().single()
  if (error) throw error
  return data
}
