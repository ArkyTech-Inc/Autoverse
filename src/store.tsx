import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { initialVehicles } from './data'
import type { Booking, Enquiry, Vehicle } from './types'

interface Store {
  vehicles: Vehicle[]
  bookings: Booking[]
  enquiries: Enquiry[]
  compare: string[]
  setVehicles: (items: Vehicle[]) => void
  setBookings: (items: Booking[]) => void
  setEnquiries: (items: Enquiry[]) => void
  setCompare: (items: string[]) => void
}

const readStored = <T,>(key: string, fallback: T): T => {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) as T : fallback
  } catch (error) {
    console.warn(`Could not read ${key} from local storage; using demonstration defaults.`, error)
    return fallback
  }
}

const StoreContext = createContext<Store | null>(null)

export function StoreProvider({ children }: { children: ReactNode }) {
  const [vehicles, setVehicles] = useState<Vehicle[]>(() => readStored('autoverse-vehicles', initialVehicles))
  const [bookings, setBookings] = useState<Booking[]>(() => readStored('autoverse-bookings', []))
  const [enquiries, setEnquiries] = useState<Enquiry[]>(() => readStored('autoverse-enquiries', []))
  const [compare, setCompare] = useState<string[]>(() => readStored('autoverse-compare', []))

  useEffect(() => { localStorage.setItem('autoverse-vehicles', JSON.stringify(vehicles)) }, [vehicles])
  useEffect(() => { localStorage.setItem('autoverse-bookings', JSON.stringify(bookings)) }, [bookings])
  useEffect(() => { localStorage.setItem('autoverse-enquiries', JSON.stringify(enquiries)) }, [enquiries])
  useEffect(() => { localStorage.setItem('autoverse-compare', JSON.stringify(compare.slice(0, 3))) }, [compare])

  const value = useMemo(() => ({ vehicles, bookings, enquiries, compare, setVehicles, setBookings, setEnquiries, setCompare }), [vehicles, bookings, enquiries, compare])
  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>
}

export function useStore() {
  const value = useContext(StoreContext)
  if (!value) throw new Error('useStore must be used within StoreProvider')
  return value
}
