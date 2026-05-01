import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  IconButton,
  MenuItem,
  TextField,
  Typography,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { createPlace, type CreatePlacePayload } from '../services/places'
import { getCategories, type Category } from '../services/categories'

export default function KreirajMesto() {
  const { id: cityId } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, control, formState: { errors } } = useForm<CreatePlacePayload>({
    defaultValues: {
      city_id: cityId ?? '',
      category_id: null,
      name: '',
      address: null,
      description: null,
      image_url: null,
      latitude: null,
      longitude: null,
      zoom: null,
      tips: null,
      highlights: null,
    },
  })

  useEffect(() => {
    getCategories().then(setCategories).catch(() => {})
  }, [])

  async function onSubmit(values: CreatePlacePayload) {
    setLoading(true)
    setError(null)
    try {
      await createPlace(values)
      navigate(`/gradovi/${cityId}`)
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri kreiranju mesta.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <IconButton onClick={() => navigate(`/gradovi/${cityId}`)} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Kreiraj mesto
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Naziv *"
          {...register('name', { required: 'Naziv je obavezan' })}
          error={!!errors.name}
          helperText={errors.name?.message}
          fullWidth
        />

        <Controller
          name="category_id"
          control={control}
          render={({ field }) => (
            <TextField
              select
              label="Kategorija"
              value={field.value ?? ''}
              onChange={field.onChange}
              fullWidth
            >
              <MenuItem value="">—</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat.id} value={cat.id}>{cat.name}</MenuItem>
              ))}
            </TextField>
          )}
        />

        <TextField
          label="Adresa"
          {...register('address')}
          fullWidth
        />

        <TextField
          label="Opis"
          {...register('description')}
          multiline
          rows={3}
          fullWidth
        />

        <TextField
          label="URL slike"
          {...register('image_url')}
          fullWidth
        />

        <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2 }}>
          <TextField
            label="Latitude"
            type="number"
            slotProps={{ htmlInput: { step: 'any' } }}
            {...register('latitude', { valueAsNumber: true })}
            fullWidth
          />
          <TextField
            label="Longitude"
            type="number"
            slotProps={{ htmlInput: { step: 'any' } }}
            {...register('longitude', { valueAsNumber: true })}
            fullWidth
          />
        </Box>

        <TextField
          label="Zoom"
          type="number"
          {...register('zoom', { valueAsNumber: true })}
          fullWidth
        />

        <TextField
          label="Tips"
          {...register('tips')}
          multiline
          rows={2}
          fullWidth
        />

        <TextField
          label="Highlights"
          {...register('highlights')}
          multiline
          rows={2}
          fullWidth
        />

        <Button
          type="submit"
          variant="contained"
          disabled={loading}
          sx={{
            mt: 1,
            alignSelf: 'flex-start',
            bgcolor: '#aa3bff',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            px: 4,
            '&:hover': { bgcolor: '#9333ea' },
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Kreiraj mesto'}
        </Button>
      </Box>
    </Box>
  )
}
