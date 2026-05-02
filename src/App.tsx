import { Box } from '@mui/material'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Login from './pages/Login'
import Gradovi from './pages/Gradovi'
import KreirajGrad from './pages/KreirajGrad'
import GradDetalji from './pages/GradDetalji'
import KreirajMesto from './pages/KreirajMesto'
import KategorijaDetalji from './pages/KategorijaDetalji'
import MestoDetalji from './pages/MestoDetalji'
import PolitikaPrivatnosti from './pages/PolitikaPrivatnosti'

function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', bgcolor: '#f5f5f7' }}>
      <Sidebar />
      <Box component="main" sx={{ flexGrow: 1, p: 4 }}>
        {children}
      </Box>
    </Box>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/gradovi" replace />} />
        <Route path="/gradovi" element={<AdminLayout><Gradovi /></AdminLayout>} />
        <Route path="/gradovi/novi" element={<AdminLayout><KreirajGrad /></AdminLayout>} />
        <Route path="/gradovi/:id" element={<AdminLayout><GradDetalji /></AdminLayout>} />
        <Route path="/gradovi/:id/mesta/novo" element={<AdminLayout><KreirajMesto /></AdminLayout>} />
        <Route path="/gradovi/:id/kategorije/:categoryId" element={<AdminLayout><KategorijaDetalji /></AdminLayout>} />
        <Route path="/gradovi/:id/kategorije/:categoryId/mesta/:placeId" element={<AdminLayout><MestoDetalji /></AdminLayout>} />
        <Route path="/politika-privatnosti" element={<AdminLayout><PolitikaPrivatnosti /></AdminLayout>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
