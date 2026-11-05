import type { Vehicle } from './types'

const photo = (id: string, width = 1400) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const initialVehicles: Vehicle[] = [
  {
    id: 'mercedes-gle-450-2023', make: 'Mercedes-Benz', model: 'GLE 450', year: 2023, price: 145_000_000, mileage: 12_400, category: 'SUV', availability: 'Available',
    engine: '3.0L inline-6 turbo', horsepower: 362, transmission: '9-speed automatic', fuel: 'Petrol', seats: 5, condition: 'Pristine · locally inspected', exterior: 'Obsidian Black', interior: 'Macchiato Beige leather',
    description: 'A serene, assured expression of modern luxury. The GLE 450 balances effortless long-distance comfort with intuitive technology and the quietly capable presence the city demands.',
    features: ['Panoramic sunroof', 'Burmester® surround sound', '360° camera', 'Air suspension', 'MBUX with navigation', 'Heated & ventilated front seats'],
    images: [photo('photo-1492144534655-ae79c964c9d7'), photo('photo-1606664515524-ed2f786a0bd6'), photo('photo-1503376780353-7e6692767b70')], history: 'Vehicle provenance reviewed by our sourcing team. Full documentation available for viewing.'
  },
  {
    id: 'range-rover-sport-autobiography-2022', make: 'Land Rover', model: 'Range Rover Sport Autobiography', year: 2022, price: 185_000_000, mileage: 18_200, category: 'SUV', availability: 'Available',
    engine: '3.0L inline-6 mild hybrid', horsepower: 395, transmission: '8-speed automatic', fuel: 'Petrol hybrid', seats: 5, condition: 'Excellent · locally inspected', exterior: 'Santorini Black', interior: 'Ebony Windsor leather',
    description: 'Sculpted restraint meets unmistakable authority. This Autobiography edition brings composed performance, a sumptuous cabin and all-terrain confidence into rare balance.',
    features: ['Meridian™ 3D surround sound', 'Adaptive dynamics', 'Panoramic roof', 'Pixel LED headlights', 'Terrain Response 2', 'Climate-controlled seats'],
    images: [photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1511919884226-fd3cad34687c'), photo('photo-1606664515524-ed2f786a0bd6')], history: 'Sourcing and ownership documents reviewed. Inspection summary available on request.'
  },
  {
    id: 'bmw-x5-xdrive40i-2023', make: 'BMW', model: 'X5 xDrive40i', year: 2023, price: 120_000_000, mileage: 9_800, category: 'SUV', availability: 'Available',
    engine: '3.0L inline-6 turbo', horsepower: 335, transmission: '8-speed automatic', fuel: 'Petrol', seats: 5, condition: 'Pristine · locally inspected', exterior: 'Mineral White', interior: 'Coffee Sensafin',
    description: 'An elegant study in everyday versatility. Responsive, composed and beautifully appointed, the X5 makes every journey feel considered.',
    features: ['Live Cockpit Professional', 'Harman Kardon audio', 'Panoramic glass roof', 'Parking Assistant Plus', 'Adaptive LED lighting', 'Wireless Apple CarPlay'],
    images: [photo('photo-1555215695-3004980ad54e'), photo('photo-1552519507-da3b142c6e3d'), photo('photo-1503376780353-7e6692767b70')], history: 'Mileage and vehicle records checked at sourcing. Independent inspection welcome.'
  },
  {
    id: 'lexus-lx-600-2022', make: 'Lexus', model: 'LX 600', year: 2022, price: 210_000_000, mileage: 14_600, category: 'SUV', availability: 'Reserved',
    engine: '3.5L twin-turbo V6', horsepower: 409, transmission: '10-speed automatic', fuel: 'Petrol', seats: 7, condition: 'Excellent · locally inspected', exterior: 'Sonic Titanium', interior: 'Black semi-aniline leather',
    description: 'Unmistakable craftsmanship, enduring capability. The LX 600 offers a quietly exceptional sanctuary, whether the road is familiar or not.',
    features: ['Mark Levinson® Reference audio', 'Adaptive Variable Suspension', 'Multi-Terrain Select', 'Four-zone climate', 'Panoramic view monitor', 'Rear-seat entertainment'],
    images: [photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1503376780353-7e6692767b70'), photo('photo-1606664515524-ed2f786a0bd6')], history: 'Reservation status is a demonstration record. Full documentation available on enquiry.'
  },
  {
    id: 'porsche-cayenne-s-2023', make: 'Porsche', model: 'Cayenne S', year: 2023, price: 195_000_000, mileage: 7_200, category: 'SUV', availability: 'Available',
    engine: '2.9L twin-turbo V6', horsepower: 434, transmission: '8-speed Tiptronic S', fuel: 'Petrol', seats: 5, condition: 'Pristine · locally inspected', exterior: 'Crayon', interior: 'Black leather',
    description: 'A sporting instinct, expressed with uncommon refinement. A confident stance and rewarding drive meet Cayenne comfort in one beautifully resolved SUV.',
    features: ['Sport Chrono Package', 'BOSE® surround sound', 'Panoramic roof system', 'Adaptive air suspension', 'Porsche InnoDrive', 'Heated multifunction steering wheel'],
    images: [photo('photo-1503376780353-7e6692767b70'), photo('photo-1492144534655-ae79c964c9d7'), photo('photo-1552519507-da3b142c6e3d')], history: 'Sourcing records available. Vehicle inspection details shared during a private viewing.'
  },
  {
    id: 'mercedes-s580-2021', make: 'Mercedes-Benz', model: 'S 580', year: 2021, price: 175_000_000, mileage: 21_500, category: 'Saloon', availability: 'Available',
    engine: '4.0L V8 biturbo mild hybrid', horsepower: 496, transmission: '9-speed automatic', fuel: 'Petrol hybrid', seats: 5, condition: 'Excellent · locally inspected', exterior: 'Selenite Grey', interior: 'Nappa leather, black',
    description: 'A flagship designed around the art of arriving. The S 580 pairs elegant restraint with an exceptionally quiet cabin and effortless V8 power.',
    features: ['Rear-axle steering', 'Burmester® 4D surround sound', 'Energizing Air Control', 'Executive rear seating', 'Digital Light', 'AIRMATIC suspension'],
    images: [photo('photo-1563720223185-11003d516935'), photo('photo-1492144534655-ae79c964c9d7'), photo('photo-1552519507-da3b142c6e3d')], history: 'Ownership documentation reviewed at sourcing. Independent verification encouraged.'
  },
  {
    id: 'toyota-land-cruiser-300-2022', make: 'Toyota', model: 'Land Cruiser 300', year: 2022, price: 165_000_000, mileage: 16_100, category: 'SUV', availability: 'Available',
    engine: '3.5L twin-turbo V6', horsepower: 409, transmission: '10-speed automatic', fuel: 'Petrol', seats: 7, condition: 'Excellent · locally inspected', exterior: 'Attitude Black', interior: 'Dark red leather',
    description: 'Legendary composure, renewed for the long horizon. The 300 pairs formidable capability with the thoughtful comfort of a contemporary luxury cabin.',
    features: ['Multi-Terrain Monitor', 'Crawl Control', 'JBL® premium audio', 'Adaptive Variable Suspension', 'Four-zone climate control', 'Power tailgate'],
    images: [photo('photo-1519641471654-76ce0107ad1b'), photo('photo-1606664515524-ed2f786a0bd6'), photo('photo-1511919884226-fd3cad34687c')], history: 'Vehicle details supplied for demonstration. Full records shared during an appointment.'
  },
  {
    id: 'bmw-530i-2023', make: 'BMW', model: '530i', year: 2023, price: 85_000_000, mileage: 8_600, category: 'Saloon', availability: 'Available',
    engine: '2.0L turbocharged inline-4', horsepower: 248, transmission: '8-speed automatic', fuel: 'Petrol', seats: 5, condition: 'Pristine · locally inspected', exterior: 'Phytonic Blue', interior: 'Canberra Beige leather',
    description: 'An assured, modern interpretation of the executive saloon: beautifully balanced, intuitively connected and made for the rhythm of the city.',
    features: ['BMW Live Cockpit Plus', 'Harman Kardon audio', 'Adaptive suspension', 'Parking Assistant', 'Ambient lighting', 'Wireless device charging'],
    images: [photo('photo-1555215695-3004980ad54e'), photo('photo-1552519507-da3b142c6e3d'), photo('photo-1563720223185-11003d516935')], history: 'Inspection summary available upon request. Independent assessment welcome.'
  },
]

export const formatNaira = (value: number) => `₦${new Intl.NumberFormat('en-NG').format(value)}`
