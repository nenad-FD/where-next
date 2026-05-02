import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { Alert, Box, Button, CircularProgress, TextField, Typography } from '@mui/material'
import { signIn } from '../services/auth'

interface LoginForm {
  email: string
  password: string
}

export default function Login() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const { register, handleSubmit, formState: { errors } } = useForm<LoginForm>()

  async function onSubmit({ email, password }: LoginForm) {
    setLoading(true)
    setError(null)
    try {
      await signIn(email, password)
      navigate('/gradovi')
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : 'Greška pri prijavi.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#f5f5f7',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: 400,
          bgcolor: '#fff',
          borderRadius: 4,
          p: 4,
          boxShadow: '0 4px 24px rgba(0,0,0,0.08)',
        }}
      >
        <Typography variant="h5" fontWeight={700} color="text.primary" mb={0.5}>
          Where Next
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={3}>
          Prijavi se na admin panel
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

        <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField
            label="Email"
            type="email"
            {...register('email', { required: 'Email je obavezan' })}
            error={!!errors.email}
            helperText={errors.email?.message}
            fullWidth
          />
          <TextField
            label="Lozinka"
            type="password"
            {...register('password', { required: 'Lozinka je obavezna' })}
            error={!!errors.password}
            helperText={errors.password?.message}
            fullWidth
          />
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            fullWidth
            sx={{
              mt: 1,
              bgcolor: '#aa3bff',
              borderRadius: 2,
              textTransform: 'none',
              fontWeight: 600,
              py: 1.25,
              '&:hover': { bgcolor: '#9333ea' },
            }}
          >
            {loading ? <CircularProgress size={20} color="inherit" /> : 'Prijavi se'}
          </Button>
        </Box>
      </Box>
    </Box>
  )
}
