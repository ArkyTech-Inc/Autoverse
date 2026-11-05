import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronRight, Fuel, Gauge, Settings2, Users } from 'lucide-react'
import { BackLink, ContactForm, ImageLightbox, SectionTitle, WhatsAppButton } from '../components'
import { useStore } from '../store'
import { formatNaira } from '../data'

export default function VehiclePage() {
  const { id } = useParams()
  const { vehicles } = useStore()
  const vehicle = vehicles.find(item => item.id === id)
  const navigate = useNavigate()
  const [active, setActive] = useState(0)
  const [lightbox, setLightbox] = useState(false)
  const [deposit, setDeposit] = useState(30)
  const [months, setMonths] = useState(12)
  if (!vehicle) return <div className="not-found"><span className="eyebrow">VEHICLE NOT FOUND</span><h1>This page has moved on.</h1><BackLink to="/">Return to the collection</BackLink></div>
  const balance = vehicle.price * (1 - deposit / 100)
  const nextImage = () => setActive(index => (index + 1) % vehicle.images.length)
  return <>
    <div className="vehicle-detail-top"><BackLink to="/">The collection</BackLink><span>AUTOVÉRSE / COLLECTION / {vehicle.make.toUpperCase()}</span></div>
    <section className="detail-layout">
      <div className="detail-gallery">
        <button className="detail-gallery-main" onClick={() => setLightbox(true)} aria-label="Open full-screen gallery"><img src={vehicle.images[active]} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}, gallery view ${active + 1}`} /><span className="gallery-expand"><ArrowUpRight size={17} /> VIEW GALLERY</span><span className="gallery-counter">0{active + 1} <i>/</i> 0{vehicle.images.length}</span></button>
        <div className="detail-thumbnails">{vehicle.images.map((image, index) => <button key={image} className={index === active ? 'thumbnail-active' : ''} onClick={() => setActive(index)} aria-label={`View image ${index + 1}`}><img src={image} alt="" /></button>)}<button className="thumbnail-next" onClick={nextImage} aria-label="Next image"><ArrowRight size={16} /></button></div>
      </div>
      <aside className="detail-summary">
        <span className="eyebrow"><i /> {vehicle.year} · {vehicle.category.toUpperCase()}</span>
        <h1>{vehicle.make}<br /><em>{vehicle.model}</em></h1>
        <div className="detail-price">{formatNaira(vehicle.price)}<small>ILLUSTRATIVE DEMONSTRATION PRICE</small></div>
        <div className="detail-summary-status"><span className={`availability availability-${vehicle.availability.toLowerCase()}`}><i />{vehicle.availability}</span><span>REF. AV-{vehicle.id.slice(0, 5).toUpperCase()}</span></div>
        <p className="detail-description">{vehicle.description}</p>
        <div className="detail-quick-specs"><span><Gauge />{vehicle.mileage.toLocaleString('en-NG')} km</span><span><Settings2 />{vehicle.transmission}</span><span><Fuel />{vehicle.fuel}</span><span><Users />{vehicle.seats} seats</span></div>
        <div className="detail-actions"><Link className="button button-gold" to={`/book?vehicle=${vehicle.id}`}>Book an inspection <ArrowUpRight size={15} /></Link><a className="button button-outline" href="#enquire">Request information <ArrowDown size={14} /></a><WhatsAppButton vehicle={vehicle} /></div>
        <p className="detail-note"><Check size={14} /> Independent inspection welcome by appointment.</p>
      </aside>
    </section>
    <section className="section detail-information"><div className="detail-specs-column"><SectionTitle kicker="THE DETAILS" title={<>Thoughtfully<br /><em>considered.</em></>} copy={vehicle.description} /><div className="spec-table">
      {[['Make & model', `${vehicle.make} ${vehicle.model}`], ['Model year', String(vehicle.year)], ['Mileage', `${vehicle.mileage.toLocaleString('en-NG')} km`], ['Engine', vehicle.engine], ['Power', `${vehicle.horsepower} hp`], ['Transmission', vehicle.transmission], ['Fuel', vehicle.fuel], ['Seating', `${vehicle.seats} occupants`], ['Exterior', vehicle.exterior], ['Interior', vehicle.interior], ['Condition', vehicle.condition], ['Availability', vehicle.availability]].map(([label, value]) => <div className="spec-row" key={label}><span>{label}</span><strong>{value}</strong></div>)}
    </div><div className="history-note"><span className="eyebrow"><i /> VEHICLE HISTORY</span><p>{vehicle.history}</p><small>Vehicle information and history shown are demonstration content; please confirm all details directly.</small></div></div>
      <div className="detail-features-column"><div className="features-image"><img src={vehicle.images[1]} alt={`${vehicle.make} interior and details`} loading="lazy" /><span>MADE TO MOVE YOU</span></div><div className="features-list"><span className="eyebrow">A FEW CONSIDERED DETAILS</span>{vehicle.features.map((feature, index) => <div key={feature}><span>0{index + 1}</span>{feature}<ChevronRight size={15} /></div>)}</div></div>
    </section>
    <section className="payment-section"><div className="payment-intro"><span className="eyebrow"><i /> AN ILLUSTRATIVE GUIDE</span><h2>A little clarity<br />for the <em>journey.</em></h2><p>Explore an indicative payment illustration. This is not a finance offer and is subject to dealership review and approval.</p><span className="payment-disclaimer">Illustrative only · No guaranteed financing · Subject to approval</span></div><div className="payment-calculator"><div className="calculator-top"><span>PAYMENT ILLUSTRATION</span><span>{vehicle.year} {vehicle.make} {vehicle.model}</span></div><div className="calculator-price"><span>VEHICLE PRICE</span><strong>{formatNaira(vehicle.price)}</strong></div><label className="calculator-range"><span>PROPOSED DOWN PAYMENT <b>{deposit}%</b></span><input type="range" min="10" max="80" step="5" value={deposit} onChange={event => setDeposit(Number(event.target.value))} /><div><span>10%</span><span>80%</span></div></label><div className="calculator-output"><div><span>ILLUSTRATIVE DEPOSIT</span><strong>{formatNaira(vehicle.price * deposit / 100)}</strong></div><div><span>REMAINING BALANCE</span><strong>{formatNaira(balance)}</strong></div></div><div className="calculator-duration"><span>PROPOSED DURATION</span><div>{[6, 12, 24].map(duration => <button className={months === duration ? 'duration-active' : ''} key={duration} onClick={() => setMonths(duration)}>{duration} months</button>)}</div></div><div className="calculator-monthly"><span>ILLUSTRATIVE MONTHLY PAYMENT <small>BEFORE ANY FEES OR INTEREST</small></span><strong>{formatNaira(Math.round(balance / months))}<small>/ MONTH</small></strong></div></div></section>
    <section className="detail-enquiry section" id="enquire"><div><SectionTitle kicker="YOUR NEXT STEP" title={<>Let’s talk<br /><em>possibilities.</em></>} copy="Ask us a question, arrange a private viewing or simply start a conversation about this vehicle." /><Link className="back-link" to="/compare">Add a vehicle to your comparison <ArrowRight size={14} /></Link></div><div><ContactForm vehicle={vehicle} /></div></section>
    <section className="detail-next"><div><span className="eyebrow">CONTINUE EXPLORING</span><h2>The next <em>discovery.</em></h2></div><button className="button button-outline" onClick={() => navigate('/')}>Return to the collection <ArrowLeft size={15} /></button></section>
    <AnimatePresence>{lightbox && <ImageLightbox images={vehicle.images} startAt={active} onClose={() => setLightbox(false)} />}</AnimatePresence>
  </>
}
