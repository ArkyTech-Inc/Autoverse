import type { ReactNode } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Footer, Header } from './components'
import Home from './pages/Home'
import VehiclePage from './pages/VehiclePage'
import BookingPage from './pages/BookingPage'
import ComparePage from './pages/ComparePage'
import AdminPage from './pages/AdminPage'

function PageFrame({ children }: { children: ReactNode }) {
  return <motion.main initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>{children}</motion.main>
}

export default function App() {
  const location = useLocation()
  const admin = location.pathname.startsWith('/admin')
  return <div className="min-h-screen bg-ink">
    {!admin && <Header />}
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<PageFrame><Home /></PageFrame>} />
        <Route path="/vehicle/:id" element={<PageFrame><VehiclePage /></PageFrame>} />
        <Route path="/book" element={<PageFrame><BookingPage /></PageFrame>} />
        <Route path="/compare" element={<PageFrame><ComparePage /></PageFrame>} />
        <Route path="/admin" element={<PageFrame><AdminPage /></PageFrame>} />
        <Route path="*" element={<PageFrame><Home /></PageFrame>} />
      </Routes>
    </AnimatePresence>
    {!admin && <Footer />}
  </div>
}
