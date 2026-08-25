import type { Metadata, Viewport } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat';
import { FAQ_DATA } from '@/data/faqs';

export const viewport: Viewport = {
  themeColor: '#142334',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  title: 'Pavan Properties — CRDA & AP RERA Approved Open Plots & Luxury Villas in Vijayawada & Amaravati | Pavan Kumar',
  description: 'Verified residential open plots & luxury villas in Vijayawada & Amaravati. Official APCRDA layout sanctions (LP No. 30/2025), AP RERA approvals, 100ft Airport Road connectivity, and bank pre-approvals. Direct consultation with Pavan Kumar: +91 90304 44978.',
  keywords: [
    'Pavan Properties',
    'Pavan Properties Vijayawada',
    'Pavan Kumar real estate broker',
    'Anvi Homes Kesarapalli',
    'Anvi Homes open plots',
    'Anvi Homes LP No 30 2025',
    'APCRDA approved plots Vijayawada',
    'AP RERA approved layouts Amaravati',
    'Plots in Kesarapalli 100 feet road',
    'Plots near Vijayawada Airport Gannavaram',
    'Luxury villas in Vijayawada 1.20 crore',
    'Open plots for sale Vijayawada',
    'Residential plots near Medha Towers IT Park',
    'HCL Tech Vijayawada plots',
    'Capital Heights villas Guntur highway',
    'Mangalagiri open plots',
    'Best real estate agent in Vijayawada',
    'Verified land broker Amaravati capital region'
  ],
  authors: [{ name: 'Pavan Kumar - Lead Real Estate Advisor' }],
  creator: 'Pavan Properties',
  publisher: 'Pavan Properties Real Estate Advisory',
  metadataBase: new URL('https://pavan-properties.vercel.app'),
  alternates: {
    canonical: 'https://pavan-properties.vercel.app',
  },
  openGraph: {
    title: 'Pavan Properties — CRDA & AP RERA Verified Plots & Villas in Vijayawada',
    description: '100% verified APCRDA layout sanctions (LP No. 30/2025) & AP RERA registered ventures. Schedule an on-site inspection with Pavan Kumar.',
    url: 'https://pavan-properties.vercel.app',
    siteName: 'Pavan Properties Real Estate Advisory',
    images: [
      {
        url: '/projects/anvi-homes-1.jpg',
        width: 1200,
        height: 630,
        alt: 'Anvi Homes Kesarapalli - APCRDA Approved Open Plots & Luxury Villas',
      },
    ],
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pavan Properties — CRDA & AP RERA Verified Real Estate Vijayawada',
    description: 'Explore Anvi Homes Kesarapalli & Capital Heights. APCRDA approved plots and luxury villas with spot registration and bank loan facility.',
    images: ['/projects/anvi-homes-1.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'HUeJiVeao2X3EoKYdDNWVm3VudTm3MqodDnUH_Dbw2g',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Comprehensive RealEstateAgent + LocalBusiness JSON-LD
  const businessSchema = {
    '@context': 'https://schema.org',
    '@type': ['RealEstateAgent', 'LocalBusiness', 'ProfessionalService'],
    '@id': 'https://pavan-properties.vercel.app/#organization',
    name: 'Pavan Properties',
    legalName: 'Pavan Properties Real Estate Advisory',
    url: 'https://pavan-properties.vercel.app',
    logo: 'https://pavan-properties.vercel.app/pavan-kumar.png',
    image: 'https://pavan-properties.vercel.app/projects/anvi-homes-1.jpg',
    description: 'Premier real estate advisory specializing in APCRDA and AP RERA verified open residential plots, luxury villas, and commercial land across Vijayawada, Amaravati, and Kesarapalli.',
    telephone: '+919030444978',
    email: 'propertiespavan@gmail.com',
    priceRange: '₹₹₹',
    currenciesAccepted: 'INR',
    paymentAccepted: 'Cash, Cheque, Bank Transfer, Bank Home Loan',
    founder: {
      '@type': 'Person',
      name: 'Pavan Kumar',
      jobTitle: 'Principal Real Estate Advisor & Land Consultant',
      image: 'https://pavan-properties.vercel.app/pavan-kumar.png',
      telephone: '+919030444978',
      email: 'propertiespavan@gmail.com',
    },
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Door No. 40-1-12, 3rd Floor, Opposite PVP Square Mall, M.G. Road',
      addressLocality: 'Vijayawada',
      addressRegion: 'Andhra Pradesh',
      postalCode: '520010',
      addressCountry: 'IN',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 16.5062,
      longitude: 80.6480,
    },
    areaServed: [
      { '@type': 'City', name: 'Vijayawada' },
      { '@type': 'AdministrativeArea', name: 'Amaravati Capital Region' },
      { '@type': 'Place', name: 'Kesarapalli' },
      { '@type': 'Place', name: 'Gannavaram' },
      { '@type': 'Place', name: 'Mangalagiri' },
      { '@type': 'City', name: 'Guntur' },
    ],
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '08:00',
        closes: '20:00',
      },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: 'Verified Real Estate Portfolio',
      itemListElement: [
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Place',
            name: 'Anvi Homes — Open Plots & Luxury Villas',
            description: 'APCRDA Approved Layout (LP No. 30/2025) on 100 Feet Airport-West Bypass Road in Kesarapalli, Vijayawada.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Kesarapalli, Vijayawada',
              addressRegion: 'Andhra Pradesh',
              addressCountry: 'IN',
            },
          },
          price: '3250000',
          priceCurrency: 'INR',
        },
        {
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Place',
            name: 'Capital Heights — Gated Township',
            description: 'APCRDA approved premium villa plots on Vijayawada-Guntur Expressway.',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'Mangalagiri, Amaravati',
              addressRegion: 'Andhra Pradesh',
              addressCountry: 'IN',
            },
          },
          price: '4500000',
          priceCurrency: 'INR',
        },
      ],
    },
  };

  // Google Rich Snippet FAQPage Schema
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: FAQ_DATA.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  // WebSite Schema for Sitelinks Search Box
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://pavan-properties.vercel.app/#website',
    url: 'https://pavan-properties.vercel.app',
    name: 'Pavan Properties',
    description: 'CRDA & AP RERA Verified Real Estate Advisory in Vijayawada & Amaravati',
    publisher: {
      '@id': 'https://pavan-properties.vercel.app/#organization',
    },
    inLanguage: 'en-IN',
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <meta name="google-site-verification" content="HUeJiVeao2X3EoKYdDNWVm3VudTm3MqodDnUH_Dbw2g" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(businessSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-[#f9f6ee] text-[#142334] font-sans antialiased selection:bg-[#c9ad98] selection:text-[#142334]">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
