import { supabase } from './supabase'

export interface Category {
  id: string
  name: string
}

export async function getCategories(): Promise<Category[]> {
  const { data, error } = await supabase.from('categories').select('*')
  if (error) throw error
  return data
}
