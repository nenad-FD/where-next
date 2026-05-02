import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  CircularProgress,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { getPlaceById, type Place } from '../services/places'

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

export default function MestoDetalji() {
  const { id: cityId, categoryId, placeId } = useParams<{ id: string; categoryId: string; placeId: string }>()
  const navigate = useNavigate()
  const [place, setPlace] = useState<Place | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!placeId) return
    getPlaceById(placeId)
      .then(setPlace)
      .catch((e: unknown) => setError(e instanceof Error ? e.message : 'Greška pri učitavanju.'))
      .finally(() => setLoading(false))
  }, [placeId])

  return (
    <Box sx={{ maxWidth: 680 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <IconButton onClick={() => navigate(`/gradovi/${cityId}/kategorije/${categoryId}`)} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          {place?.name ?? 'Detalji mesta'}
        </Typography>
      </Box>

      {loading && <CircularProgress />}
      {error && <Alert severity="error">{error}</Alert>}

      {place && (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {place.image_url && (
            <Box
              component="img"
              src={place.image_url}
              alt={place.name}
              sx={{ width: '100%', maxHeight: 280, objectFit: 'cover', borderRadius: 3, mb: 1 }}
            />
          )}

          <DetailRow label="Naziv" value={place.name} />
          <DetailRow label="Adresa" value={place.address} />
          <DetailRow label="Opis" value={place.description} />
          <DetailRow label="URL slike" value={place.image_url} />
          <DetailRow label="Latitude" value={place.latitude} />
          <DetailRow label="Longitude" value={place.longitude} />
          <DetailRow label="Zoom" value={place.zoom} />
          <DetailRow label="Tips" value={place.tips} />
          <DetailRow label="Highlights" value={place.highlights} />
          <DetailRow label="Prosečna ocena" value={place.average_rating} />
        </Box>
      )}
    </Box>
  )
}
