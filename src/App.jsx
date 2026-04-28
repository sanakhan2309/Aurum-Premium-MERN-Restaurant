import { Routes, Route } from 'react-router-dom'
import { MainLayout } from './layout/MainLayout'
import { Home } from './pages/Home'
import { AdminPage } from './admin/AdminPage.jsx'

function App() {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <MainLayout>
            <Home />
          </MainLayout>
        }
      />
      <Route path="/admin" element={<AdminPage />} />
    </Routes>
  )
}

export default App
