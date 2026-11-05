import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowDown, ArrowRight, ArrowUpRight, MapPin, ShieldCheck, Sparkles, Wrench } from 'lucide-react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Accordion, ContactForm, SectionTitle, VehicleCard, WhatsAppButton } from '../components'
import { useStore } from '../store'

const faqs = [
  { question: 'How are vehicles selected for the collection?', answer: 'Each vehicle is considered individually for provenance, condition, specification and overall character. Demonstration listings on this experience are illustrative, and vehicle records can be discussed directly with our team.' },
  { question: 'May I arrange an independent inspection?', answer: 'Absolutely. We welcome independent inspections by appointment and can coordinate a suitable time with our Abuja concierge.' },
  { question: 'Can you source a particular vehicle?', answer: 'Our private sourcing service starts with a conversation about the vehicle, specification and timeline you have in mind. We will outline the process and keep you informed at every step.' },
  { question: 'Are the displayed prices and vehicles real offers?', answer: 'No. Vehicle listings, prices, contact details, reviews and booking records are demonstration content for this digital experience. Nothing displayed constitutes a verified offer or guarantee.' },
]

function Hero() {
  const { scrollY } = useScroll()
  const imageY = useTransform(scrollY, [0, 900], [0, 140])
  return <section className="hero" id="top">
    <motion.div className="hero-image" style={{ y: imageY }} />
    <div className="hero-shade" />
    <div className="hero-caption"><span>THE AUTOVÉRSE EDITION</span><i />01 — 08</div>
    <motion.div className="hero-content" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 0.18 }}>
      <span className="hero-overline"><i /> ABUJA · NIGERIA <i /></span>
      <h1>Beyond<br />the <em>ordinary.</em></h1>
      <p>Discover an exceptional collection of automobiles curated for those who appreciate distinction.</p>
      <div className="hero-actions"><a className="button button-gold" href="#collection">Explore collection <ArrowUpRight size={15} /></a><Link className="button button-light-outline" to="/book">Book a private viewing <ArrowRight size={15} /></Link></div>
    </motion.div>
    <div className="hero-bottom"><span>THE ART OF AUTOMOTIVE EXCELLENCE</span><a href="#collection" aria-label="Scroll to collection">SCROLL TO DISCOVER <ArrowDown size={14} /></a><span>09°04′N&nbsp; 07°29′E</span></div>
  </section>
}

function Collection() {
  const { vehicles, compare, setCompare } = useStore()
  const [make, setMake] = useState('All marques')
  const [category, setCategory] = useState('All categories')
  const [budget, setBudget] = useState('Any price')
  const [year, setYear] = useState('All years')
  const [availability, setAvailability] = useState('All availability')
  const [sort, setSort] = useState('Curated')
  const brands = useMemo(() => Array.from(new Set(vehicles.map(vehicle => vehicle.make))).sort(), [vehicles])
  const years = useMemo(() => Array.from(new Set(vehicles.map(vehicle => vehicle.year))).sort((a, b) => b - a), [vehicles])
  const filtered = useMemo(() => {
    let items = vehicles
    if (make !== 'All marques') items = items.filter(vehicle => vehicle.make === make)
    if (category !== 'All categories') items = items.filter(vehicle => vehicle.category === category)
    if (budget === 'Under ₦100m') items = items.filter(vehicle => vehicle.price < 100_000_000)
    if (budget === '₦100m – ₦160m') items = items.filter(vehicle => vehicle.price >= 100_000_000 && vehicle.price <= 160_000_000)
    if (budget === 'Over ₦160m') items = items.filter(vehicle => vehicle.price > 160_000_000)
    if (year !== 'All years') items = items.filter(vehicle => vehicle.year === Number(year))
    if (availability !== 'All availability') items = items.filter(vehicle => vehicle.availability === availability)
    return items.sort((a, b) => sort === 'Price: low to high' ? a.price - b.price : sort === 'Price: high to low' ? b.price - a.price : b.year - a.year)
  }, [vehicles, make, category, budget, year, availability, sort])
  return <section id="collection" className="section collection-section">
    <div className="section-heading-row"><SectionTitle kicker="THE COLLECTION · 01" title={<>A finer kind<br />of <em>selection.</em></>} copy="Every automobile has a point of view. Discover a considered edit of vehicles chosen for the way they move you." /><Link className="text-arrow section-heading-link" to="/compare">Compare vehicles <ArrowUpRight size={15} /></Link></div>
    <div className="collection-toolbar">
      <div className="filter-group"><label className="filter-select"><span className="eyebrow">MARQUE</span><select value={make} onChange={event => setMake(event.target.value)}><option>All marques</option>{brands.map(brand => <option key={brand}>{brand}</option>)}</select></label>
        <label className="filter-select"><span className="eyebrow">BODY STYLE</span><select value={category} onChange={event => setCategory(event.target.value)}><option>All categories</option><option>SUV</option><option>Saloon</option></select></label>
        <label className="filter-select"><span className="eyebrow">PRICE GUIDE</span><select value={budget} onChange={event => setBudget(event.target.value)}><option>Any price</option><option>Under ₦100m</option><option>₦100m – ₦160m</option><option>Over ₦160m</option></select></label>
        <label className="filter-select"><span className="eyebrow">MODEL YEAR</span><select value={year} onChange={event => setYear(event.target.value)}><option>All years</option>{years.map(value => <option key={value}>{value}</option>)}</select></label>
        <label className="filter-select"><span className="eyebrow">AVAILABILITY</span><select value={availability} onChange={event => setAvailability(event.target.value)}><option>All availability</option><option>Available</option><option>Reserved</option><option>Sold</option></select></label></div>
      <label className="sort-select">SORT BY <select value={sort} onChange={event => setSort(event.target.value)}><option>Curated</option><option>Price: low to high</option><option>Price: high to low</option></select></label>
    </div>
    <div className="collection-count"><span>SHOWING <b>{String(filtered.length).padStart(2, '0')}</b> OF {String(vehicles.length).padStart(2, '0')} VEHICLES</span><span>ALL PRICES IN NGN · DEMONSTRATION LISTINGS</span></div>
    {filtered.length ? <div className="vehicle-grid">{filtered.map((vehicle, index) => <VehicleCard key={vehicle.id} vehicle={vehicle} index={index} />)}</div> : <div className="empty-results"><span>No vehicles match that selection.</span><button className="text-arrow" onClick={() => { setMake('All marques'); setCategory('All categories'); setBudget('Any price'); setYear('All years'); setAvailability('All availability') }}>Clear filters <ArrowRight size={15} /></button></div>}
    {compare.length > 0 && <div className="compare-ribbon"><div><span className="eyebrow">YOUR SHORTLIST</span><strong>{compare.length} of 3 vehicles selected</strong></div><p>{compare.map(id => vehicles.find(vehicle => vehicle.id === id)?.model).filter(Boolean).join(' · ')}</p><div className="compare-ribbon-actions"><button className="text-arrow" onClick={() => setCompare([])}>Clear</button><Link className="button button-gold button-small" to="/compare">Compare now <ArrowRight size={14} /></Link></div></div>}
  </section>
}

function Manifesto() {
  return <section id="about" className="manifesto">
    <div className="manifesto-image"><img src="https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?auto=format&fit=crop&w=1400&q=85" alt="Sculptural luxury vehicle detail in a warmly lit studio" loading="lazy" /><span>FORM, FINESSE, FEELING.</span></div>
    <div className="manifesto-copy"><span className="eyebrow"><i />A DIFFERENT POINT OF VIEW · 02</span><h2>More than<br />automobiles.<br /><em>An experience.</em></h2><p className="manifesto-lede">Some things are measured in more than miles. In the feeling of a door closing. The hush of a considered cabin. The quiet confidence of knowing it is right.</p><p>We bring a more personal kind of automotive discovery to Abuja. A thoughtful collection, a considered process and a team that understands the details matter just as much as the drive.</p><a className="text-arrow" href="#services">Discover our approach <ArrowUpRight size={15} /></a></div>
  </section>
}

function Services() {
  const items = [
    { n: '01', icon: Sparkles, title: 'Private sourcing', copy: 'A discreet, considered search shaped around your brief, from first conversation to final handover.' },
    { n: '02', icon: ShieldCheck, title: 'Considered assurance', copy: 'Clear conversations about condition and provenance. Independent inspections are always welcome.' },
    { n: '03', icon: Wrench, title: 'Ownership, made simple', copy: 'Thoughtful guidance through your next steps, with practical support tailored to your vehicle.' },
  ]
  return <section id="services" className="section services-section"><div className="section-heading-row"><SectionTitle kicker="THE AUTOVÉRSE DIFFERENCE · 03" title={<>Considered at<br />every <em>turn.</em></>} copy="A more personal approach to discovering and owning an exceptional automobile." /><span className="section-aside-note">OUR SERVICES<br />ABUJA · NIGERIA</span></div><div className="service-grid">{items.map(item => <article key={item.n} className="service-card"><div className="service-card-top"><span>{item.n} / 03</span><item.icon size={22} strokeWidth={1.2} /></div><h3>{item.title}</h3><p>{item.copy}</p><span className="service-rule" /></article>)}</div></section>
}

function Interlude() {
  return <section className="interlude"><div className="interlude-image" /><div className="interlude-copy"><span className="eyebrow">A PRIVATE MOMENT, IN PERSON</span><h2>The next chapter<br />is <em>yours.</em></h2><p>Take your time. Ask every question. Experience a vehicle in a way no photograph can capture.</p><Link className="button button-gold" to="/book">Arrange a private viewing <ArrowUpRight size={15} /></Link></div><div className="interlude-caption">ABUJA, NIGERIA <i /> BY APPOINTMENT</div></section>
}

function Experience() {
  const testimonials = [
    { quote: '“The whole experience felt refreshingly personal. Every detail was handled with thought and care.”', author: 'A. O.', role: 'DEMONSTRATION REVIEW · ABUJA' },
    { quote: '“Unhurried, considered and genuinely attentive. The conversation was as good as the car.”', author: 'K. M.', role: 'DEMONSTRATION REVIEW · ABUJA' },
    { quote: '“A beautifully different way to discover a vehicle. Discreet, knowledgeable and effortless.”', author: 'T. I.', role: 'DEMONSTRATION REVIEW · ABUJA' },
  ]
  const [active, setActive] = useState(0)
  return <section className="testimonial-section"><span className="eyebrow"><i /> WORDS THAT MATTER</span><div className="testimonial-content" key={active}><span className="quote-mark">“</span><p>{testimonials[active].quote.replace(/[“”]/g, '')}</p><span className="testimonial-author">{testimonials[active].author}</span><span className="testimonial-role">{testimonials[active].role}</span></div><div className="testimonial-controls"><button onClick={() => setActive((active + 2) % 3)} aria-label="Previous review"><ArrowRight className="rotate-arrow" size={17} /></button><span>0{active + 1} <i>/</i> 03</span><button onClick={() => setActive((active + 1) % 3)} aria-label="Next review"><ArrowRight size={17} /></button></div><span className="demo-caption">DEMONSTRATION TESTIMONIALS · NOT REAL CUSTOMER REVIEWS</span></section>
}

function Contact() {
  return <section id="contact" className="section contact-section"><div className="contact-copy"><SectionTitle kicker="YOUR CONCIERGE · 05" title={<>A conversation<br />starts <em>here.</em></>} copy="Whether there is a particular vehicle on your mind or you are simply exploring, our Abuja team would be pleased to hear from you." /><div className="contact-details"><a href="tel:+2348000002026"><span>TELEPHONE</span>+234 810 331 2462 <ArrowUpRight size={14} /></a><a href="mailto:concierge@autoverse.example"><span>EMAIL</span>concierge@autoverse.example <ArrowUpRight size={14} /></a><div><span>SHOWROOM</span><MapPin size={14} /> Central Business District, Abuja, FCT</div></div><div className="map-placeholder"><div className="map-grid" /><span className="map-pin"><MapPin size={20} /></span><span className="map-label">ABUJA · FCT <small>SHOWROOM LOCATION · DEMONSTRATION</small></span><a href="https://maps.google.com/?q=Central+Business+District+Abuja" target="_blank" rel="noreferrer">OPEN MAP <ArrowUpRight size={13} /></a></div></div><div className="contact-form-wrap"><span className="eyebrow">SEND A PRIVATE ENQUIRY</span><ContactForm /></div></section>
}

export default function Home() {
  return <>
    <Hero />
    <div className="intro-strip"><span>AN EXCEPTIONAL AUTOMOTIVE EXPERIENCE</span><i /><span>CURATED IN ABUJA, FOR EVERYWHERE</span><i /><span>THE AUTOVÉRSE EDITION</span></div>
    <Collection />
    <Manifesto />
    <Services />
    <Interlude />
    <Experience />
    <section className="faq-section section"><div><SectionTitle kicker="A FEW THOUGHTS, ANSWERED" title={<>The finer <em>details.</em></>} copy="A few helpful notes before we begin." /><WhatsAppButton /></div><Accordion items={faqs} /></section>
    <Contact />
    <div className="demo-disclaimer"><span>IMPORTANT INFORMATION</span><p>AUTOVÉRSE is a fictional dealership concept. All vehicles, specifications, availability, pricing, testimonials and contact information on this site are for demonstration purposes only and do not represent verified listings or offers. Prices are illustrative and shown in NGN.</p></div>
  </>
}
