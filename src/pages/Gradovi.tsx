import { useEffect } from 'react'
import { Box, Button, Card, CardMedia, Typography } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { useNavigate } from 'react-router-dom'
import { getCities } from '../services/cities'

const mockCities = [
  { id: 1, name: 'Beograd', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9a/Belgrade_-_panoramio_%28396%29.jpg/640px-Belgrade_-_panoramio_%28396%29.jpg' },
  { id: 2, name: 'Novi Sad', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Petrovaradin_fortress_2.jpg/640px-Petrovaradin_fortress_2.jpg' },
  { id: 3, name: 'Niš', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Nis_fortress_panorama.jpg/640px-Nis_fortress_panorama.jpg' },
]

export default function Gradovi() {
  const navigate = useNavigate()

  useEffect(() => {
    getCities()
      .then((data) => console.log('cities:', data))
      .catch((err) => console.error('cities error:', err))
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

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
          gap: 2.5,
        }}
      >
        {mockCities.map((city) => (
          <Card
            key={city.id}
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
            <CardMedia
              component="img"
              image={city.image}
              alt={city.name}
              sx={{ width: '100%', aspectRatio: '1 / 1', objectFit: 'cover' }}
            />
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
