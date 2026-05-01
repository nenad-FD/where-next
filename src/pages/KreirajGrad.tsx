import { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
  Typography,
  CircularProgress,
  Alert,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { createCity, type CreateCityPayload } from '../services/cities'

export default function KreirajGrad() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, control, formState: { errors } } = useForm<CreateCityPayload>({
    defaultValues: {
      name: '',
      description: null,
      latitude: null,
      longitude: null,
      zoom: null,
      image_url: null,
      is_popular: false,
    },
  })

  async function onSubmit(values: CreateCityPayload) {
    setLoading(true)
    setError(null)
    try {
      await createCity(values)
      navigate('/gradovi')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri kreiranju grada.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{ maxWidth: 600 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 4 }}>
        <IconButton onClick={() => navigate('/gradovi')} size="small">
          <ArrowBackIcon />
        </IconButton>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Kreiraj grad
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}

      <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
        <TextField
          label="Naziv *"
          {...register('name', { required: 'Naziv je obavezan' })}
          error={!!errors.name}
          helperText={errors.name?.message}
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

        <Controller
          name="is_popular"
          control={control}
          render={({ field }) => (
            <FormControlLabel
              control={<Checkbox checked={!!field.value} onChange={field.onChange} />}
              label="Popularan grad"
            />
          )}
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
          {loading ? <CircularProgress size={20} color="inherit" /> : 'Kreiraj grad'}
        </Button>
      </Box>
    </Box>
  )
}
