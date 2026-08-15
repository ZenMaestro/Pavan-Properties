export interface VerifiedDoc {
  id: string;
  title: string;
  type: 'CRDA' | 'RERA' | 'BANK' | 'LAYOUT_PLAN' | 'TITLE_DEED';
  documentNumber: string;
  issuedBy: string;
  issuedDate?: string;
  previewUrl: string;
  summary: string;
}

export interface ProjectSpecification {
  category: string;
  details: string[];
}

export interface Project {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  location: string;
  city: string;
  priceFrom: string;
  pricePerSqYd?: string;
  totalArea: string;
  plotSizes: string;
  lpNumber: string; // e.g. "LP No. 30/2025/CRDA"
  reraId: string;   // e.g. "P072200192"
  highlights: string[]; // "3.5 km airport", "40 ft CC roads"
  approvals: string[];  // "CRDA approved", "AP RERA approved", "Bank loan facility"
  verifiedDocs: VerifiedDoc[];
  images: string[];
  overview: string;
  specifications: ProjectSpecification[];
  bankTieUps: string[];
  googleMapEmbedUrl?: string;
}

export interface Lead {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  projectInterest?: string;
  preferredDate?: string;
  message?: string;
  createdAt?: string;
}
