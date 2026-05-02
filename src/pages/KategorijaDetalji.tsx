import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Card,
  CardMedia,
  CircularProgress,
  IconButton,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getPlacesByCityAndCategory, type Place } from '../services/places'
import { getCategories, type Category } from '../services/categories'

export default function KategorijaDetalji() {
  const { id: cityId, categoryId } = useParams<{ id: string; categoryId: string }>()
  const navigate = useNavigate()
  const [places, setPlaces] = useState<Place[]>([
    {
      id: 'mock-1',
      city_id: '',
      category_id: null,
      name: 'Test Restoran',
      address: 'Knez Mihailova 1, Beograd',
      description: null,
      image_url: null,
      latitude: null,
      longitude: null,
      zoom: null,
      tips: null,
      highlights: null,
      average_rating: null,
      created_at: '',
      updated_at: '',
    },
    {
      id: 'mock-2',
      city_id: '',
      category_id: null,
      name: 'Kafić Centrala',
      address: 'Terazije 5, Beograd',
      description: 'Odličan kafić u centru grada.',
      image_url: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop',
      latitude: null,
      longitude: null,
      zoom: null,
      tips: null,
      highlights: null,
      average_rating: 4.5,
      created_at: '',
      updated_at: '',
    },
  ])
  const [category, setCategory] = useState<Category | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!cityId || !categoryId) return
    Promise.all([
      getPlacesByCityAndCategory(cityId, categoryId),
      getCategories(),
    ])
      .then(([placesData, categoriesData]) => {
        setPlaces((prev) => [...placesData, ...prev.filter((p) => p.id.startsWith('mock-'))])
        setCategory(categoriesData.find((c) => c.id === categoryId) ?? null)
      })
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Greška pri učitavanju.'))
      .finally(() => setLoading(false))
  }, [cityId, categoryId])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <IconButton onClick={() => navigate(`/gradovi/${cityId}`)} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {category?.name ?? 'Kategorija'}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {!loading && !error && places.length === 0 && (
        <Typography color="text.secondary">Nema mesta u ovoj kategoriji.</Typography>
      )}

      <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 2.5 }}>
        {places.map((place) => (
          <Card
            key={place.id}
            onClick={() => navigate(`/gradovi/${cityId}/kategorije/${categoryId}/mesta/${place.id}`)}
            sx={{
              borderRadius: 3,
              overflow: 'hidden',
              cursor: 'pointer',
              boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
              transition: 'transform 0.15s, box-shadow 0.15s',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
              },
            }}
          >
            {place.image_url ? (
              <CardMedia
                component="img"
                image={place.image_url}
                alt={place.name}
                sx={{ width: '100%', aspectRatio: '4 / 3', objectFit: 'cover' }}
              />
            ) : (
              <Box sx={{ width: '100%', aspectRatio: '4 / 3', bgcolor: '#f0edf5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography fontSize={12} color="text.secondary">Nema slike</Typography>
              </Box>
            )}
            <Box sx={{ p: 1.5 }}>
              <Typography fontWeight={600} fontSize={14} color="text.primary">
                {place.name}
              </Typography>
              {place.address && (
                <Typography fontSize={12} color="text.secondary" mt={0.25} noWrap>
                  {place.address}
                </Typography>
              )}
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
