import { useEffect, useState, type FormEvent, type ReactNode } from 'react'
import { Link, NavLink, useLocation, useNavigate } from 'react-router-dom'
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Check, ChevronDown, Heart, Menu, Plus, Scale, X, ZoomIn, ZoomOut } from 'lucide-react'
import { AnimatePresence, motion } from 'framer-motion'
import type { Vehicle } from './types'
import { formatNaira } from './data'
import { useStore } from './store'

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const { compare } = useStore()
  const location = useLocation()
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 24)
    update()
    window.addEventListener('scroll', update, { passive: true })
    return () => window.removeEventListener('scroll', update)
  }, [])
  useEffect(() => {
    if (location.pathname !== '/') { setActiveSection(''); return }
    const sections = ['collection', 'about', 'services', 'contact'].map(id => document.getElementById(id)).filter((section): section is HTMLElement => section !== null)
    if (!sections.length) { setActiveSection('home'); return }
    const observer = new IntersectionObserver(entries => {
      const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
      if (visible) setActiveSection(visible.target.id)
    }, { rootMargin: '-20% 0px -65% 0px', threshold: [0, .15, .35] })
    sections.forEach(section => observer.observe(section))
    const updateTop = () => { if (window.scrollY < 180) setActiveSection('home') }
    window.addEventListener('scroll', updateTop, { passive: true })
    updateTop()
    return () => { observer.disconnect(); window.removeEventListener('scroll', updateTop) }
  }, [location.pathname])
  const closeMenu = () => setMenuOpen(false)
  return (
    <header className={`site-header ${scrolled ? 'is-scrolled' : ''}`}>
      <Link to="/" className="brand" onClick={closeMenu} aria-label="Autoverse home">
        <span className="brand-mark">A</span><span className="brand-word">AUTOVÉRSE<small>ABUJA · NIGERIA</small></span>
      </Link>
      <button className="mobile-menu-button" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>{menuOpen ? <X /> : <Menu />}</button>
      <nav className={`nav-main ${menuOpen ? 'nav-open' : ''}`} aria-label="Main navigation">
        <NavLink to="/" onClick={closeMenu} end className={activeSection === 'home' ? 'active' : ''}>Home</NavLink>
        <a href="/#collection" onClick={closeMenu} className={activeSection === 'collection' ? 'active' : ''}>Our Collection</a>
        <a href="/#about" onClick={closeMenu} className={activeSection === 'about' ? 'active' : ''}>About Us</a>
        <a href="/#services" onClick={closeMenu} className={activeSection === 'services' ? 'active' : ''}>Our Services</a>
        <div className="mobile-nav-extra"><Link to="/compare" onClick={closeMenu}>Compare{compare.length > 0 ? ` (${compare.length})` : ''}</Link><Link to="/admin" onClick={closeMenu}>Administration</Link></div>
      </nav>
      <div className="nav-actions">
        <a href="/#contact" className={`nav-contact ${activeSection === 'contact' ? 'active' : ''}`}>Contact</a>
        <Link className="button button-outline button-small" to="/book">Book a viewing <ArrowUpRight size={14} /></Link>
        <Link to="/compare" className="compare-nav" aria-label={`Compare vehicles, ${compare.length} selected`}><Scale size={17} />{compare.length > 0 && <span>{compare.length}</span>}</Link>
      </div>
    </header>
  )
}

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-main">
        <div><Link to="/" className="brand footer-brand"><span className="brand-mark">A</span><span className="brand-word">AUTOVÉRSE<small>THE ART OF AUTOMOTIVE EXCELLENCE</small></span></Link><p>A considered collection, for those<br />who appreciate distinction.</p></div>
        <div className="footer-column"><span className="eyebrow">DISCOVER</span><a href="/#collection">Our collection</a><a href="/#about">Our story</a><a href="/#services">Private services</a><Link to="/compare">Compare vehicles</Link></div>
        <div className="footer-column"><span className="eyebrow">VISIT US</span><span>Central Business District</span><span>Abuja, FCT, Nigeria</span><a href="tel:+2348000002026">+234 800 000 2026</a><a href="mailto:concierge@autoverse.example">concierge@autoverse.example</a></div>
        <div className="footer-column"><span className="eyebrow">FOLLOW ALONG</span><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram ↗</a><a href="https://linkedin.com" target="_blank" rel="noreferrer">LinkedIn ↗</a><a href="https://wa.me/2348103312462" target="_blank" rel="noreferrer">WhatsApp ↗</a><Link to="/admin">Team portal</Link></div>
      </div>
      <div className="footer-bottom"><span>© {new Date().getFullYear()} AUTOVÉRSE. All rights reserved.</span><span>Demonstration experience · Vehicles, prices and contact details are illustrative. Designed by Abdulhaqq</span><a href="#top">Back to top ↑</a></div>
    </footer>
  )
}

export function SectionTitle({ kicker, title, copy, light = false }: { kicker: string; title: ReactNode; copy?: string; light?: boolean }) {
  return <div className={`section-title ${light ? 'section-title-light' : ''}`}><span className="eyebrow"><i />{kicker}</span><h2>{title}</h2>{copy && <p>{copy}</p>}</div>
}

export function VehicleCard({ vehicle, index = 0 }: { vehicle: Vehicle; index?: number }) {
  const { compare, setCompare } = useStore()
  const included = compare.includes(vehicle.id)
  const navigate = useNavigate()
  const toggleCompare = () => {
    if (included) setCompare(compare.filter(id => id !== vehicle.id))
    else if (compare.length < 3) setCompare([...compare, vehicle.id])
    else window.alert('You can compare up to three vehicles. Remove one to add another.')
  }
  return (
    <motion.article className="vehicle-card" initial={{ opacity: 0, y: 22 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.1 }} transition={{ duration: 0.5, delay: (index % 4) * 0.055 }}>
      <Link to={`/vehicle/${vehicle.id}`} className="vehicle-image-link" aria-label={`View ${vehicle.year} ${vehicle.make} ${vehicle.model}`}>
        <img className="vehicle-image" src={vehicle.images[0]} alt={`${vehicle.year} ${vehicle.make} ${vehicle.model}`} loading="lazy" />
        <span className={`availability availability-${vehicle.availability.toLowerCase()}`}><i />{vehicle.availability}</span>
        <span className="vehicle-year">{vehicle.year}</span>
      </Link>
      <div className="vehicle-card-body">
        <div className="vehicle-meta"><span>{vehicle.make}</span><button className={`compare-toggle ${included ? 'selected' : ''}`} onClick={toggleCompare} aria-label={included ? 'Remove from comparison' : 'Add to comparison'} title={included ? 'Remove from compare' : 'Add to compare'}>{included ? <Check size={15} /> : <Scale size={15} />}</button></div>
        <Link to={`/vehicle/${vehicle.id}`} className="vehicle-name">{vehicle.model}</Link>
        <div className="vehicle-card-specs"><span>{vehicle.category}</span><span>{vehicle.mileage.toLocaleString('en-NG')} km</span><span>{vehicle.transmission.split(' ')[0]}</span></div>
        <div className="vehicle-card-bottom"><span className="vehicle-price">{formatNaira(vehicle.price)}</span><button onClick={() => navigate(`/vehicle/${vehicle.id}`)} className="text-arrow">Discover <ArrowUpRight size={14} /></button></div>
      </div>
    </motion.article>
  )
}

export function WhatsAppButton({ vehicle }: { vehicle?: Vehicle }) {
  const text = encodeURIComponent(`Hello AUTOVÉRSE, I would like to enquire${vehicle ? ` about the ${vehicle.year} ${vehicle.make} ${vehicle.model}` : ' about your collection'}.`)
  return <a className="button button-whatsapp" href={`https://wa.me/2348103312462?text=${text}`} target="_blank" rel="noreferrer">Enquire on WhatsApp <ArrowUpRight size={15} /></a>
}

export function ContactForm({ vehicle }: { vehicle?: Vehicle }) {
  const { setEnquiries, enquiries } = useStore()
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setError('')
    const data = new FormData(event.currentTarget)
    const name = String(data.get('name') ?? '').trim()
    const phone = String(data.get('phone') ?? '').trim()
    const email = String(data.get('email') ?? '').trim()
    const message = String(data.get('message') ?? '').trim()
    if (!name || !phone || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || message.length < 10) {
      setError('Please complete each field and include a valid email address and a message of at least 10 characters.')
      return
    }
    setEnquiries([{ id: crypto.randomUUID(), name, phone, email, message, vehicleId: vehicle?.id, status: 'New', note: '', createdAt: new Date().toISOString() }, ...enquiries])
    setSent(true)
    event.currentTarget.reset()
  }
  if (sent) return <div className="form-success"><span className="success-icon"><Check /></span><h3>Thank you, {vehicle ? 'we have your enquiry' : 'we’ll be in touch'}.</h3><p>Your note is safely with our Abuja concierge team. We’ll respond using your preferred contact details.</p><button className="text-arrow" onClick={() => setSent(false)}>Send another message <ArrowRight size={15} /></button></div>
  return <form className="contact-form" onSubmit={submit}>
    <label>Your name<input name="name" autoComplete="name" required placeholder="How should we address you?" /></label>
    <div className="form-row"><label>Phone number<input name="phone" type="tel" autoComplete="tel" required placeholder="+234" /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="you@example.com" /></label></div>
    <label>Your message<textarea name="message" rows={3} minLength={10} required defaultValue={vehicle ? `I would like to know more about the ${vehicle.year} ${vehicle.make} ${vehicle.model}.` : ''} placeholder="Tell us what you have in mind..." /></label>
    {error && <p className="form-error" role="alert">{error}</p>}
    <button className="button button-gold" type="submit">Send an enquiry <ArrowUpRight size={15} /></button>
    <p className="form-privacy">Your details are used only to respond to this enquiry.</p>
  </form>
}

export function Accordion({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0)
  return <div className="accordion">{items.map((item, index) => <div className={`accordion-item ${open === index ? 'is-open' : ''}`} key={item.question}>
    <button className="accordion-trigger" aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}><span className="accordion-number">0{index + 1}</span><span>{item.question}</span><ChevronDown size={17} /></button>
    <AnimatePresence initial={false}>{open === index && <motion.div className="accordion-content" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.25 }}><p>{item.answer}</p></motion.div>}</AnimatePresence>
  </div>)}</div>
}

export function PageIntro({ label, title, subtitle, image }: { label: string; title: string; subtitle: string; image?: string }) {
  return <section className={`page-intro ${image ? 'page-intro-image' : ''}`} style={image ? { backgroundImage: `linear-gradient(90deg, rgba(8,10,13,.95), rgba(8,10,13,.56)), url("${image}")` } : undefined}>
    <div className="page-intro-inner"><span className="eyebrow"><i />{label}</span><h1>{title}</h1><p>{subtitle}</p></div>
    <div className="intro-index">AUTOVÉRSE <span>/</span> ABUJA, NIGERIA</div>
  </section>
}

export function LoadingLink({ to, children, className }: { to: string; children: ReactNode; className?: string }) {
  return <Link className={className} to={to}>{children}</Link>
}

export function BackLink({ to, children = 'Back to collection' }: { to: string; children?: string }) {
  return <Link className="back-link" to={to}><ArrowLeft size={15} />{children}</Link>
}

export function BookingQuickLink({ vehicleId }: { vehicleId?: string }) {
  return <Link className="button button-gold" to={vehicleId ? `/book?vehicle=${vehicleId}` : '/book'}>Book a private viewing <ArrowUpRight size={15} /></Link>
}

export function ImageLightbox({ images, startAt, onClose }: { images: string[]; startAt: number; onClose: () => void }) {
  const [active, setActive] = useState(startAt)
  const [zoomed, setZoomed] = useState(false)
  useEffect(() => {
    const keydown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'ArrowRight') { setActive(index => (index + 1) % images.length); setZoomed(false) }
      if (event.key === 'ArrowLeft') { setActive(index => (index - 1 + images.length) % images.length); setZoomed(false) }
    }
    window.addEventListener('keydown', keydown)
    return () => window.removeEventListener('keydown', keydown)
  }, [images.length, onClose])
  return <motion.div className="lightbox" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} role="dialog" aria-modal="true" aria-label="Full-screen vehicle gallery">
    <button className="lightbox-close" onClick={onClose} aria-label="Close gallery"><X /></button>
    <button className="lightbox-arrow prev" onClick={event => { event.stopPropagation(); setActive((active - 1 + images.length) % images.length); setZoomed(false) }} aria-label="Previous image"><ArrowLeft /></button>
    <button className={`lightbox-zoom ${zoomed ? 'is-zoomed' : ''}`} onClick={event => { event.stopPropagation(); setZoomed(!zoomed) }} aria-label={zoomed ? 'Zoom out' : 'Zoom in'}>{zoomed ? <ZoomOut /> : <ZoomIn />}</button>
    <img className={zoomed ? 'lightbox-image-zoomed' : ''} src={images[active]} alt={`Vehicle gallery image ${active + 1}`} onClick={event => { event.stopPropagation(); setZoomed(!zoomed) }} />
    <button className="lightbox-arrow next" onClick={event => { event.stopPropagation(); setActive((active + 1) % images.length); setZoomed(false) }} aria-label="Next image"><ArrowRight /></button>
    <span className="lightbox-count">0{active + 1} <i>/</i> 0{images.length}</span>
  </motion.div>
}

export function getVehicleLabel(vehicle?: Vehicle) {
  return vehicle ? `${vehicle.year} ${vehicle.make} ${vehicle.model}` : 'Any vehicle'
}

export const BookingIcon = Plus
export const FavoriteIcon = Heart
export const ScrollIcon = ArrowDown
