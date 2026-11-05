import { Link } from 'react-router-dom'
import { ArrowRight, ArrowUpRight, Check, Plus, Scale, Trash2 } from 'lucide-react'
import { PageIntro } from '../components'
import { useStore } from '../store'
import { formatNaira } from '../data'

const comparisonRows: { label: string; value: (vehicle: import('../types').Vehicle) => string }[] = [
  { label: 'Price · illustrative', value: vehicle => formatNaira(vehicle.price) },
  { label: 'Manufacturer', value: vehicle => vehicle.make },
  { label: 'Model year', value: vehicle => String(vehicle.year) },
  { label: 'Engine', value: vehicle => vehicle.engine },
  { label: 'Horsepower', value: vehicle => `${vehicle.horsepower} hp` },
  { label: 'Transmission', value: vehicle => vehicle.transmission },
  { label: 'Mileage', value: vehicle => `${vehicle.mileage.toLocaleString('en-NG')} km` },
  { label: 'Fuel type', value: vehicle => vehicle.fuel },
  { label: 'Seating', value: vehicle => `${vehicle.seats} seats` },
  { label: 'Condition', value: vehicle => vehicle.condition },
  { label: 'Availability', value: vehicle => vehicle.availability },
  { label: 'Features', value: vehicle => vehicle.features.join(' · ') },
]

export default function ComparePage() {
  const { vehicles, compare, setCompare } = useStore()
  const selected = compare.map(id => vehicles.find(vehicle => vehicle.id === id)).filter((vehicle): vehicle is NonNullable<typeof vehicle> => Boolean(vehicle))
  const available = vehicles.filter(vehicle => !compare.includes(vehicle.id) && vehicle.availability !== 'Sold')
  const addVehicle = (id: string) => {
    if (compare.length < 3) setCompare([...compare, id])
  }
  return <>
    <PageIntro label="SIDE BY SIDE · YOUR SHORTLIST" title="A clearer comparison." subtitle="Set the details beside one another and discover which character feels most like yours." />
    <section className="section comparison-section">
      {selected.length === 0 ? <div className="compare-empty"><Scale size={28} /><span className="eyebrow">YOUR COMPARISON IS READY</span><h2>Begin with a <em>possibility.</em></h2><p>Add up to three vehicles to see their details side by side.</p><Link className="button button-gold" to="/#collection">Explore the collection <ArrowRight size={15} /></Link></div> :
      <div className="comparison-table-wrap"><div className="comparison-grid comparison-head" style={{ '--columns': selected.length } as React.CSSProperties}><div className="comparison-row-label"><span className="eyebrow">THE DETAILS</span><span>{selected.length} OF 3 SELECTED</span></div>{selected.map(vehicle => <div className="comparison-vehicle" key={vehicle.id}><div className="comparison-photo"><img src={vehicle.images[0]} alt={`${vehicle.make} ${vehicle.model}`} /><button aria-label={`Remove ${vehicle.model}`} onClick={() => setCompare(compare.filter(id => id !== vehicle.id))}><Trash2 size={15} /></button></div><span className="eyebrow">{vehicle.year} · {vehicle.make}</span><h3>{vehicle.model}</h3><Link to={`/vehicle/${vehicle.id}`} className="text-arrow">Discover vehicle <ArrowUpRight size={14} /></Link></div>)}
        {selected.length < 3 && <div className="comparison-add"><div className="comparison-add-icon"><Plus /></div><span className="eyebrow">ADD A VEHICLE</span><select aria-label="Select a vehicle to compare" value="" onChange={event => addVehicle(event.target.value)}><option value="" disabled>Choose from collection</option>{available.map(vehicle => <option value={vehicle.id} key={vehicle.id}>{vehicle.year} {vehicle.make} {vehicle.model}</option>)}</select><small>{3 - selected.length} {selected.length === 2 ? 'place' : 'places'} remaining</small></div>}</div>
      {comparisonRows.map(row => <div className="comparison-grid comparison-data-row" style={{ '--columns': selected.length } as React.CSSProperties} key={row.label}><div className="comparison-row-label">{row.label}</div>{selected.map(vehicle => <div className={`comparison-data-cell ${row.label === 'Availability' && vehicle.availability === 'Available' ? 'positive' : ''}`} key={vehicle.id}>{row.label === 'Availability' && vehicle.availability === 'Available' && <Check size={14} />}{row.value(vehicle)}</div>)}{selected.length < 3 && <div className="comparison-data-cell comparison-empty-cell"><span>—</span></div>}</div>)}
      {selected.length > 0 && <div className="comparison-grid comparison-actions" style={{ '--columns': selected.length } as React.CSSProperties}><div /><div className="comparison-action-span"><span>All information is demonstration content. Please confirm details directly.</span><button className="text-arrow" onClick={() => setCompare([])}>Clear comparison <Trash2 size={14} /></button></div></div>}</div>}
    </section>
    {selected.length > 0 && <section className="compare-next section"><div><span className="eyebrow"><i />WHEN ONE FEELS RIGHT</span><h2>Take the next <em>step.</em></h2></div><Link className="button button-gold" to="/book">Arrange a private viewing <ArrowUpRight size={15} /></Link></section>}
  </>
}
