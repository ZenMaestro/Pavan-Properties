export interface LuxuryHotspot {
  id: string;
  name: string;
  dimensions: string;
  areaSqFt: string;
  finishes: string;
  description: string;
  coordinates: { x: number; y: number }; // Percentage relative to floor plan
}

export interface FloorLevel {
  level: string;
  title: string;
  subtitle: string;
  areaSqFt: string;
  planImage: string;
  hotspots: LuxuryHotspot[];
}

export interface NeighborhoodLocation {
  id: string;
  name: string;
  category: 'AVIATION' | 'DINING_CLUBS' | 'EDUCATION' | 'WELLNESS';
  driveTime: string;
  distance: string;
  description: string;
}

export interface LuxuryEstateData {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  address: {
    street: string;
    neighborhood: string;
    city: string;
    state: string;
    pincode: string;
    country: string;
  };
  pricing: {
    inr: string;
    usd: string;
    pricePerSqFt: string;
  };
  legalVerification: {
    crdaLpNumber: string;
    reraRegistration: string;
    titleStatus: string;
    bankApprovals: string[];
  };
  specs: {
    builtUpArea: string;
    lotSize: string;
    bedrooms: string;
    bathrooms: string;
    garage: string;
    pool: string;
    levels: string;
    architectureStyle: string;
    furnishing: string;
    smartAutomation: string;
  };
  keyFeatures: {
    icon: string;
    title: string;
    description: string;
  }[];
  gallery: {
    id: string;
    url: string;
    title: string;
    category: 'TWILIGHT' | 'INTERIOR' | 'ARCHITECTURE' | 'POOLSIDE' | 'CINEMA';
    aspect: string;
  }[];
  floorPlans: FloorLevel[];
  neighborhood: NeighborhoodLocation[];
}

export const LUXURY_ESTATE: LuxuryEstateData = {
  id: 'estate-grand-horizon-01',
  slug: 'the-grand-horizon-estate',
  title: 'The Grand Horizon Waterfront Estate',
  tagline: 'An Architectural Masterpiece on Amaravati Prime Waterfront',
  address: {
    street: '742 Grand Horizon Promenade',
    neighborhood: 'Capital Waterfront Enclave, Mangalagiri-Amaravati',
    city: 'Amaravati / Vijayawada',
    state: 'Andhra Pradesh',
    pincode: '522503',
    country: 'India'
  },
  pricing: {
    inr: '₹14,85,00,000',
    usd: '$1,790,000 USD',
    pricePerSqFt: '₹12,913 / Sq.Ft'
  },
  legalVerification: {
    crdaLpNumber: 'LP No. 08/2025/LUX/CRDA',
    reraRegistration: 'AP RERA P072200889',
    titleStatus: '100% Freehold Clear Title with 30-Year EC Warranty',
    bankApprovals: ['State Bank of India Wealth', 'HDFC Bank Super-HNI', 'ICICI Private Banking']
  },
  specs: {
    builtUpArea: '11,500 Sq.Ft (1,068 m²)',
    lotSize: '1.25 Acres (600 Sq.Yds Super-Plot)',
    bedrooms: '5 Ultra-Luxury En-Suite Bedrooms',
    bathrooms: '7 Statuario Marble Bathrooms',
    garage: '6-Car Climate Showroom Garage with EV Superchargers',
    pool: '60-Foot Cantilevered Heated Infinity Pool',
    levels: '3 Tri-Level Architectural Floors with Private Elevator',
    architectureStyle: 'Modern Tropical Minimalist with Italian Travertine',
    furnishing: 'Custom Poliform, Minotti & B&B Italia Curated',
    smartAutomation: 'Full Crestron Home Automation with Biometric Security'
  },
  keyFeatures: [
    {
      icon: 'Waves',
      title: '60-Foot Cantilevered Horizon Pool',
      description: 'Zero-edge temperature regulated infinity pool floating seamlessly over riverfront views with jacuzzi and sunken fire-pit lounge.'
    },
    {
      icon: 'Building2',
      title: 'Double-Height 24ft Glass Grand Foyer',
      description: 'Curved glass architectural facades offering panoramic sunset views framed in anodized brushed bronze frames.'
    },
    {
      icon: 'Tv',
      title: '14-Seat Dolby Atmos Cinema Room',
      description: 'Private acoustically calibrated screening room with 4K laser projection and motorized reclining Italian leather seats.'
    },
    {
      icon: 'Wine',
      title: '1,200-Bottle Climate Wine Cellar',
      description: 'Glass-encased sommelier tasting room with precision temperature and humidity control.'
    },
    {
      icon: 'Plane',
      title: 'Private Rooftop Helipad Access',
      description: 'Engineered rooftop touchdown pad for private charters and executive transfers directly to the state capital.'
    },
    {
      icon: 'ShieldCheck',
      title: 'CRDA & AP RERA Verified Legality',
      description: 'Immediate registration readiness backed by official government layout sanction order LP No. 08/2025/LUX.'
    }
  ],
  gallery: [
    {
      id: 'img-1',
      url: 'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1800&q=90',
      title: 'Twilight Infinity Pool & Architectural Elevation',
      category: 'TWILIGHT',
      aspect: '16/9'
    },
    {
      id: 'img-2',
      url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1800&q=90',
      title: 'Double-Height Great Room with Floating Staircase',
      category: 'INTERIOR',
      aspect: '16/9'
    },
    {
      id: 'img-3',
      url: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1800&q=90',
      title: 'Master Presidential Suite Sanctuary with River Terrace',
      category: 'INTERIOR',
      aspect: '16/9'
    },
    {
      id: 'img-4',
      url: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1800&q=90',
      title: 'Minimalist Outdoor Dining Terrace & Sunken Fire-Pit',
      category: 'POOLSIDE',
      aspect: '16/9'
    },
    {
      id: 'img-5',
      url: 'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1800&q=90',
      title: 'Gourmet Chef Show Kitchen with Calacatta Gold Marble',
      category: 'INTERIOR',
      aspect: '16/9'
    },
    {
      id: 'img-6',
      url: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1800&q=90',
      title: 'Aerial View of 1.25-Acre Gated Estate Perimeter',
      category: 'ARCHITECTURE',
      aspect: '16/9'
    },
    {
      id: 'img-7',
      url: 'https://images.unsplash.com/photo-1507652313519-d4e9174996dd?auto=format&fit=crop&w=1800&q=90',
      title: 'Spa Bathroom with Freestanding Soaking Tub & Steam Shower',
      category: 'INTERIOR',
      aspect: '16/9'
    },
    {
      id: 'img-8',
      url: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1800&q=90',
      title: 'Private 14-Seat 4K Dolby Atmos Screening Theater',
      category: 'CINEMA',
      aspect: '16/9'
    }
  ],
  floorPlans: [
    {
      level: 'Level 01',
      title: 'Ground Floor & Waterfront Oasis',
      subtitle: 'Living, Culinary Arts, Infinity Pool & Guest Pavilion',
      areaSqFt: '5,200 Sq.Ft',
      planImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        {
          id: 'hs-1',
          name: 'Double-Height Living Salon',
          dimensions: '34\' x 24\' (816 Sq.Ft)',
          areaSqFt: '816 Sq.Ft',
          finishes: 'Italian Silver Travertine, Floor-to-Ceiling Anodized Bronze Glass',
          description: 'Soaring 24ft ceiling with suspended custom bocci chandelier and automated recessed motorized shades.',
          coordinates: { x: 35, y: 45 }
        },
        {
          id: 'hs-2',
          name: 'Gourmet Chef Kitchen & Scullery',
          dimensions: '22\' x 18\' (396 Sq.Ft)',
          areaSqFt: '396 Sq.Ft',
          finishes: 'Calacatta Gold Quartz, Sub-Zero & Wolf Professional Suites',
          description: 'Monolithic waterfall marble island with concealed preparation kitchen and temperature-controlled walk-in pantry.',
          coordinates: { x: 70, y: 35 }
        },
        {
          id: 'hs-3',
          name: 'Cantilevered Infinity Pool Deck',
          dimensions: '60\' x 18\' (1,080 Sq.Ft)',
          areaSqFt: '1,080 Sq.Ft',
          finishes: 'Indonesian Sukabumi Stone, Brazilian Ipe Hardwood Decking',
          description: 'Zero-edge heated horizon pool with integrated 8-person spa and underwater surround sound.',
          coordinates: { x: 50, y: 80 }
        }
      ]
    },
    {
      level: 'Level 02',
      title: 'Upper Private Residence & Family Suites',
      subtitle: 'Master Presidential Wing & 3 En-Suite Bedrooms',
      areaSqFt: '4,100 Sq.Ft',
      planImage: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        {
          id: 'hs-4',
          name: 'Presidential Master Suite Sanctuary',
          dimensions: '28\' x 20\' (560 Sq.Ft)',
          areaSqFt: '560 Sq.Ft',
          finishes: 'Smoked European White Oak, Statuario Marble Fireplace',
          description: 'Private river-facing terrace, dual walk-in dressing boutiques by Poliform, and morning espresso bar.',
          coordinates: { x: 30, y: 40 }
        },
        {
          id: 'hs-5',
          name: 'Primary Spa Bathroom',
          dimensions: '18\' x 16\' (288 Sq.Ft)',
          areaSqFt: '288 Sq.Ft',
          finishes: 'Bookmatched Arabescato Marble, Dornbracht Platinum Fixtures',
          description: 'Sculpted stone soaking tub, chromotherapy rain shower, and heated private steam room.',
          coordinates: { x: 20, y: 70 }
        },
        {
          id: 'hs-6',
          name: 'Floating Glass Sky Bridge & Library',
          dimensions: '20\' x 12\' (240 Sq.Ft)',
          areaSqFt: '240 Sq.Ft',
          finishes: 'Structural Glass Floors, Backlit Walnut Bookshelves',
          description: 'Suspended architectural gallery connecting the primary wing to guest residential suites.',
          coordinates: { x: 65, y: 45 }
        }
      ]
    },
    {
      level: 'Level 03',
      title: 'Rooftop Sky Lounge & Entertainment',
      subtitle: 'Private 4K Screening Room, Cigar Deck & Helipad',
      areaSqFt: '2,200 Sq.Ft',
      planImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1400&q=80',
      hotspots: [
        {
          id: 'hs-7',
          name: '14-Seat 4K Dolby Atmos Cinema',
          dimensions: '26\' x 18\' (468 Sq.Ft)',
          areaSqFt: '468 Sq.Ft',
          finishes: 'Acoustic Velvet Paneling, Motorized Italian Leather Recliners',
          description: 'Barco 4K laser cinema system with 180-inch micro-perforated acoustic screen.',
          coordinates: { x: 40, y: 35 }
        },
        {
          id: 'hs-8',
          name: 'Riverfront Sky Deck & Stargazing Lounge',
          dimensions: '40\' x 25\' (1,000 Sq.Ft)',
          areaSqFt: '1,000 Sq.Ft',
          finishes: 'Flamed Basalt Tile, Anodized Titanium Fire Table',
          description: 'Unobstructed 360-degree views of Amaravati capital riverfront skyline.',
          coordinates: { x: 75, y: 65 }
        }
      ]
    }
  ],
  neighborhood: [
    {
      id: 'n-1',
      name: 'Amaravati Executive Heliport & Transit Hub',
      category: 'AVIATION',
      driveTime: '3 Mins',
      distance: '1.8 km',
      description: 'Private charter flights and direct executive helicopter connections to Hyderabad & Chennai.'
    },
    {
      id: 'n-2',
      name: 'Vijayawada International Airport (Gannavaram)',
      category: 'AVIATION',
      driveTime: '18 Mins',
      distance: '24 km',
      description: 'Non-stop international and domestic flights via 6-lane elevated expressway.'
    },
    {
      id: 'n-3',
      name: 'Royal Amaravati Yacht Club & Marina',
      category: 'DINING_CLUBS',
      driveTime: '4 Mins',
      distance: '2.5 km',
      description: 'Exclusive private member marina with boat slips, fine waterfront dining, and sunset lounge.'
    },
    {
      id: 'n-4',
      name: 'Capital Championship 18-Hole Golf Resort',
      category: 'DINING_CLUBS',
      driveTime: '7 Mins',
      distance: '5.2 km',
      description: 'PGA-standard 18-hole championship course designed by Greg Norman.'
    },
    {
      id: 'n-5',
      name: 'International Baccalaureate (IB) World Academy',
      category: 'EDUCATION',
      driveTime: '8 Mins',
      distance: '6.0 km',
      description: 'Top-tier accredited global K-12 campus with Cambridge & IB diplomas.'
    },
    {
      id: 'n-6',
      name: 'AIIMS Super-Specialty Medical & Wellness Center',
      category: 'WELLNESS',
      driveTime: '6 Mins',
      distance: '4.5 km',
      description: 'State-of-the-art quaternary healthcare hospital with dedicated VIP wellness pavilions.'
    }
  ]
};
