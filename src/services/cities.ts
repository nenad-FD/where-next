import { supabase } from './supabase'

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

export async function getCities(): Promise<City[]> {
  const { data, error } = await supabase.from('cities').select('*')
  if (error) throw error
  return data
}

export async function createCity(city: CreateCityPayload): Promise<City> {
  const { data, error } = await supabase.from('cities').insert(city).select().single()
  if (error) throw error
  return data
}
