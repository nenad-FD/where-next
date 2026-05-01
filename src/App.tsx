import { Box } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Gradovi from './pages/Gradovi'
import KreirajGrad from './pages/KreirajGrad'
import GradDetalji from './pages/GradDetalji'
import KreirajMesto from './pages/KreirajMesto'
import PolitikaPrivatnosti from './pages/PolitikaPrivatnosti'

function App() {
  return (
    <BrowserRouter>
      <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f7' }}>
        <Sidebar />
        <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
          <Routes>
            <Route path="/" element={<Navigate to="/gradovi" replace />} />
            <Route path="/gradovi" element={<Gradovi />} />
            <Route path="/gradovi/novi" element={<KreirajGrad />} />
            <Route path="/gradovi/:id" element={<GradDetalji />} />
            <Route path="/gradovi/:id/mesta/novo" element={<KreirajMesto />} />
            <Route path="/politika-privatnosti" element={<PolitikaPrivatnosti />} />
          </Routes>
        </Box>
      </Box>
    </BrowserRouter>
  )
}

export default App
