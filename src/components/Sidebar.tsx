import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from '@mui/material'
import LocationCityIcon from '@mui/icons-material/LocationCity'
import PrivacyTipIcon from '@mui/icons-material/PrivacyTip'
import { useNavigate, useLocation } from 'react-router-dom'

const navItems = [
  { label: 'Gradovi', icon: <LocationCityIcon />, path: '/gradovi' },
  { label: 'Politika privatnosti', icon: <PrivacyTipIcon />, path: '/politika-privatnosti' },
]

export default function Sidebar() {
  const navigate = useNavigate()
  const location = useLocation()

  return (
    <Box
      component="nav"
      sx={{
        width: 260,
        flexShrink: 0,
        bgcolor: '#1e1e2e',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ px: 3, py: 3, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
        <Typography variant="h6" sx={{ color: '#fff', fontWeight: 700, letterSpacing: 0.5 }}>
          Where Next
        </Typography>
        <Typography variant="caption" sx={{ color: 'rgba(255,255,255,0.4)' }}>
          Admin Panel
        </Typography>
      </Box>

      <List sx={{ px: 1, pt: 2, flexGrow: 1 }}>
        {navItems.map(({ label, icon, path }) => {
          const active = location.pathname.startsWith(path)
          return (
            <ListItemButton
              key={label}
              selected={active}
              onClick={() => navigate(path)}
              sx={{
                borderRadius: 2,
                mb: 0.5,
                color: 'rgba(255,255,255,0.75)',
                '&.Mui-selected': {
                  bgcolor: 'rgba(170,59,255,0.18)',
                  color: '#c084fc',
                  '& .MuiListItemIcon-root': { color: '#c084fc' },
                },
                '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
              }}
            >
              <ListItemIcon sx={{ minWidth: 36, color: 'rgba(255,255,255,0.4)' }}>
                {icon}
              </ListItemIcon>
              <ListItemText
                primary={label}
                slotProps={{ primary: { fontSize: 14, fontWeight: 500 } }}
              />
            </ListItemButton>
          )
        })}
      </List>
    </Box>
  )
}
