import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Pavan Properties | CRDA & AP RERA Verified Real Estate Advisory in Amaravati & Vijayawada',
  description: 'Verified residential plots and townships in Amaravati & Vijayawada. Official CRDA sanction orders (LP numbers), AP RERA registration certificates, and nationalized bank pre-approvals.',
  keywords: [
    'Pavan Properties',
    'Amaravati plots',
    'Vijayawada real estate',
    'CRDA approved plots',
    'AP RERA registered township',
    'Mangalagiri open plots',
    'Real estate broker Vijayawada'
  ],
  authors: [{ name: 'Pavan Kumar - Pavan Properties' }],
  metadataBase: new URL('https://pavanproperties.in'),
  openGraph: {
    title: 'Pavan Properties — Verified Real Estate in Amaravati & Vijayawada',
    description: '100% verified CRDA layout sanctions & AP RERA registrations. Schedule a direct site visit with Pavan Kumar.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Pavan Properties'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    name: 'Pavan Properties',
    image: 'https://pavanproperties.in/pavan-kumar.png',
    '@id': 'https://pavanproperties.in',
    url: 'https://pavanproperties.in',
    telephone: '+919030444978',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Door No. 40-1-12, 3rd Floor, Opposite PVP Square Mall, M.G. Road',
      addressLocality: 'Vijayawada',
      addressRegion: 'Andhra Pradesh',
      postalCode: '520010',
      addressCountry: 'IN'
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 16.5062,
      longitude: 80.6480
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday'
      ],
      opens: '09:00',
      closes: '19:00'
    },
    areaServed: ['Vijayawada', 'Amaravati', 'Guntur', 'Mangalagiri']
  };

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
