import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  IconButton,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline'
import { getPlaceById, deletePlace, type Place } from '../services/places'

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
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [deleting, setDeleting] = useState(false)

  async function handleDelete() {
    if (!placeId || placeId.startsWith('mock-')) return
    setDeleting(true)
    try {
      await deletePlace(placeId)
      navigate(`/gradovi/${cityId}/kategorije/${categoryId}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri brisanju.')
      setConfirmOpen(false)
    } finally {
      setDeleting(false)
    }
  }

  useEffect(() => {
    if (!placeId) return
    if (placeId.startsWith('mock-')) {
      setPlace({
        id: placeId,
        city_id: '',
        category_id: null,
        name: placeId === 'mock-1' ? 'Test Restoran' : 'Kafić Centrala',
        address: placeId === 'mock-1' ? 'Knez Mihailova 1, Beograd' : 'Terazije 5, Beograd',
        description: placeId === 'mock-2' ? 'Odličan kafić u centru grada.' : null,
        image_url: placeId === 'mock-2' ? 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=400&h=300&fit=crop' : null,
        latitude: null,
        longitude: null,
        zoom: null,
        tips: null,
        highlights: null,
        average_rating: placeId === 'mock-2' ? 4.5 : null,
        created_at: '',
        updated_at: '',
      })
      setLoading(false)
      return
    }
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

          <Box mt={4} pt={3} sx={{ borderTop: '1px solid #e5e4e7' }}>
            <Button
              variant="outlined"
              color="error"
              startIcon={<DeleteOutlineIcon />}
              onClick={() => setConfirmOpen(true)}
              sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}
            >
              Obriši mesto
            </Button>
          </Box>
        </Box>
      )}

      <Dialog open={confirmOpen} onClose={() => setConfirmOpen(false)}>
        <DialogTitle>Obriši mesto</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Da li si siguran da želiš da obrišeš mesto <strong>{place?.name}</strong>? Ova akcija se ne može poništiti.
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={() => setConfirmOpen(false)} sx={{ textTransform: 'none' }}>
            Otkaži
          </Button>
          <Button
            variant="contained"
            color="error"
            disabled={deleting}
            onClick={handleDelete}
            sx={{ textTransform: 'none', fontWeight: 600 }}
          >
            {deleting ? <CircularProgress size={18} color="inherit" /> : 'Obriši'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}
