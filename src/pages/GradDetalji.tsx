import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getCityById, type City } from '../services/cities'

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <Box>
      <Typography variant="caption" color="text.secondary" fontWeight={600} textTransform="uppercase" letterSpacing={0.8}>
        {label}
      </Typography>
      <Typography variant="body1" color="text.primary" mt={0.25}>
        {value ?? <span style={{ color: '#aaa' }}>—</span>}
      </Typography>
      <Divider sx={{ mt: 1.5 }} />
    </Box>
  )
}

export default function GradDetalji() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [city, setCity] = useState<City | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getCityById(id)
      .then(setCity)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Greška pri učitavanju.'))
      .finally(() => setLoading(false))
  }, [id])

  return (
    <Box sx={{ maxWidth: 680 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <IconButton onClick={() => navigate('/gradovi')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {city?.name ?? 'Detalji grada'}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {city && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {city.image_url && (
            <Box
              component="img"
              src={city.image_url}
              alt={city.name}
              sx={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 3, mb: 1 }}
            />
          )}

          <DetailRow label="Naziv" value={city.name} />
          <DetailRow label="Opis" value={city.description} />
          <DetailRow label="URL slike" value={city.image_url} />
          <DetailRow label="Latitude" value={city.latitude} />
          <DetailRow label="Longitude" value={city.longitude} />
          <DetailRow label="Zoom" value={city.zoom} />
          <DetailRow
            label="Popularan"
            value={
              city.is_popular != null
                ? <Chip label={city.is_popular ? 'Da' : 'Ne'} size="small" color={city.is_popular ? 'success' : 'default'} />
                : null
            }
          />
        </Box>
      )}
    </Box>
  )
}
