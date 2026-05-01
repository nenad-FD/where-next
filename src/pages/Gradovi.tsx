import { useEffect, useState } from 'react'
import { Box, Button, Card, CardMedia, CircularProgress, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { getCities, type City } from '../services/cities'

export default function Gradovi() {
  const navigate = useNavigate()
  const [cities, setCities] = useState<City[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    getCities()
      .then(setCities)
      .finally(() => setLoading(false))
  }, [])

  return (
    <Box>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 4 }}>
        <Typography variant="h5" fontWeight={700} color="text.primary">
          Gradovi
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => navigate('/gradovi/novi')}
          sx={{
            bgcolor: '#aa3bff',
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 600,
            '&:hover': { bgcolor: '#9333ea' },
          }}
        >
          Kreiraj grad
        </Button>
      </Box>

      {loading && <CircularProgress />}

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 2.5,
        }}
      >
        {cities.map((city) => (
          <Card
            key={city.id}
            onClick={() => navigate(`/gradovi/${city.id}`)}
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
            {city.image_url && (
              <CardMedia
                component="img"
                image={city.image_url}
                alt={city.name}
                sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
              />
            )}
            <Box sx={{ p: 1.5 }}>
              <Typography fontWeight={600} fontSize={14} color="text.primary">
                {city.name}
              </Typography>
            </Box>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
