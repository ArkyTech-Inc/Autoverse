import { useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, CalendarDays, Check, Clock3, MapPin } from 'lucide-react'
import { PageIntro } from '../components'
import { useStore } from '../store'
import type { Booking } from '../types'

const timeSlots = ['09:00', '10:30', '12:00', '14:00', '15:30', '17:00']
const localDate = () => {
  const date = new Date()
  date.setMinutes(date.getMinutes() - date.getTimezoneOffset())
  return date.toISOString().slice(0, 10)
}

export default function BookingPage() {
  const [params] = useSearchParams()
  const { vehicles, bookings, setBookings } = useStore()
  const [selectedTime, setSelectedTime] = useState('')
  const [confirmation, setConfirmation] = useState<Booking | null>(null)
  const [error, setError] = useState('')
  const selectedVehicle = vehicles.find(vehicle => vehicle.id === params.get('vehicle'))
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const form = event.currentTarget
    const data = new FormData(form)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const date = String(data.get('date') ?? '')
    const contactMethod = String(data.get('contactMethod') ?? '')
    if (!name || phone.replace(/\D/g, '').length < 7 || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !date || !selectedTime || !contactMethod) {
      setError('Please complete each field, choose a date and time, and provide valid contact details.')
      return
    }
    const chosenVehicleId = String(data.get('vehicleId') ?? '')
    const booking: Booking = { id: crypto.randomUUID(), name, phone, email, contactMethod, date, time: selectedTime, vehicleId: chosenVehicleId, status: 'Requested', createdAt: new Date().toISOString() }
    setBookings([booking, ...bookings])
    setConfirmation(booking)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }
  if (confirmation) return <div className="booking-confirmation"><div className="confirmation-mark"><Check size={28} /></div><span className="eyebrow"><i /> VIEWING REQUEST RECEIVED</span><h1>We look forward<br />to <em>meeting you.</em></h1><p>Thank you, {confirmation.name}. Our Abuja concierge team will be in touch by {confirmation.contactMethod.toLowerCase()} to confirm your preferred appointment.</p><div className="confirmation-details"><div><CalendarDays />{new Date(`${confirmation.date}T12:00:00`).toLocaleDateString('en-NG', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</div><div><Clock3 />{confirmation.time}</div><div><MapPin />Central Business District, Abuja</div><div><Check />{vehicles.find(vehicle => vehicle.id === confirmation.vehicleId)?.make ?? 'AUTOVÉRSE'} {vehicles.find(vehicle => vehicle.id === confirmation.vehicleId)?.model ?? 'private viewing'}</div></div><span className="confirmation-ref">REQUEST REF. AV-{confirmation.id.slice(0, 6).toUpperCase()}</span><div className="confirmation-actions"><Link className="button button-gold" to="/">Return to the collection <ArrowRight size={15} /></Link><a className="button button-outline" href="https://wa.me/2348000002026" target="_blank" rel="noreferrer">Message our concierge <ArrowUpRight size={15} /></a></div><p className="demo-caption">DEMONSTRATION BOOKING · SAVED LOCALLY ON THIS DEVICE</p></div>
  return <>
    <PageIntro label="BY PRIVATE APPOINTMENT" title="A closer look." subtitle="The best way to know a vehicle is to experience it. Tell us a little about your visit, and our Abuja concierge will take it from there." image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=1900&q=85" />
    <section className="booking-layout section"><div className="booking-sidebar"><span className="eyebrow"><i />YOUR VISIT, YOUR WAY</span><h2>An hour<br />well <em>spent.</em></h2><p>Our private viewings are arranged around you. Take your time with the details and meet our team at your own pace.</p><div className="visit-note"><CalendarDays /><div><strong>BY APPOINTMENT</strong><span>Monday – Saturday<br />09:00 – 17:00 WAT</span></div></div><div className="visit-note"><MapPin /><div><strong>ABUJA SHOWROOM</strong><span>Central Business District<br />Abuja, FCT, Nigeria</span></div></div><div className="visit-note"><Clock3 /><div><strong>A PERSONAL EXPERIENCE</strong><span>Please allow approximately<br />one hour for your visit.</span></div></div><div className="booking-privacy">Your details are stored in this browser for this demonstration and are not sent to a dealership.</div></div>
      <form className="booking-form" onSubmit={submit}>
        <div className="booking-step"><span>01</span><div><h3>Set the scene.</h3><p>Tell us which vehicle and when you would like to visit.</p></div></div>
        <label className="field-label">VEHICLE OF INTEREST<select name="vehicleId" defaultValue={selectedVehicle?.id ?? ''}><option value="">I’d like to explore the collection</option>{vehicles.map(vehicle => <option value={vehicle.id} key={vehicle.id}>{vehicle.year} {vehicle.make} {vehicle.model} · {vehicle.availability}</option>)}</select></label>
        <div className="form-row">        <label className="field-label">PREFERRED DATE<input type="date" name="date" min={localDate()} required /></label><div className="field-label"><span>PREFERRED TIME</span><span className="form-label-hint">ALL TIMES WAT</span></div></div>
            <input type="hidden" name="time" value={selectedTime} />
        <div className="time-slots">{timeSlots.map(time => <button type="button" className={selectedTime === time ? 'time-selected' : ''} key={time} onClick={() => setSelectedTime(time)}>{time}</button>)}</div>
        <div className="booking-step booking-step-spaced"><span>02</span><div><h3>A little about you.</h3><p>So we can make your visit feel personal from the start.</p></div></div>
        <div className="form-row"><label className="field-label">YOUR NAME<input name="name" autoComplete="name" required placeholder="Full name" /></label><label className="field-label">PHONE NUMBER<input name="phone" type="tel" autoComplete="tel" required placeholder="+234" /></label></div>
        <label className="field-label">EMAIL ADDRESS<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label>
        <fieldset className="contact-preference"><legend>HOW SHOULD WE REACH YOU?</legend><label><input type="radio" name="contactMethod" value="Phone" required /> Phone</label><label><input type="radio" name="contactMethod" value="WhatsApp" /> WhatsApp</label><label><input type="radio" name="contactMethod" value="Email" /> Email</label></fieldset>
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="button button-gold booking-submit" type="submit">Request a private viewing <ArrowRight size={15} /></button>
        <p className="booking-form-note">Your appointment is a request until confirmed by our concierge. No payment is required.</p>
      </form>
    </section>
  </>
}
