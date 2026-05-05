import { FUNCTIONS_URL, fetchWithAuth } from './supabase'

export interface Category {
  id: string
  name: string
}

export async function getCategories(): Promise<Category[]> {
  const url = new URL(`${FUNCTIONS_URL}/get-categories`)

  const res = await fetchWithAuth(url)
  const body = await res.json() as { success: boolean; categories?: Category[]; error?: string }

  if (!res.ok) throw new Error(body.error ?? `Failed to fetch categories (${res.status})`)
  return body.categories ?? []
}
