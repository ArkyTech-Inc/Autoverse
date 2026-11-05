export type Availability = 'Available' | 'Reserved' | 'Sold'
export type EnquiryStatus = 'New' | 'Contacted' | 'Qualified' | 'Closed'
export type BookingStatus = 'Requested' | 'Confirmed' | 'Rescheduled' | 'Cancelled'

export interface Vehicle {
  id: string
  make: string
  model: string
  year: number
  price: number
  mileage: number
  category: string
  availability: Availability
  engine: string
  horsepower: number
  transmission: string
  fuel: string
  seats: number
  condition: string
  exterior: string
  interior: string
  description: string
  features: string[]
  images: string[]
  history: string
}

export interface Booking {
  id: string
  name: string
  phone: string
  email: string
  contactMethod: string
  date: string
  time: string
  vehicleId: string
  status: BookingStatus
  createdAt: string
}

export interface Enquiry {
  id: string
  name: string
  phone: string
  email: string
  message: string
  vehicleId?: string
  status: EnquiryStatus
  note: string
  createdAt: string
}
