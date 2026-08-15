import type { Metadata } from 'next';
import './globals.css';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { WhatsAppFloat } from '@/components/common/WhatsAppFloat';

export const metadata: Metadata = {
  title: 'Pavan Properties | CRDA & RERA Verified Real Estate Brokerage',
  description: 'Lead generation portal for verified CRDA sanctioned layouts, AP RERA registered townships, and bank loan approved plots in Amaravati, Vijayawada & Guntur.',
  keywords: ['Pavan Properties', 'CRDA approved plots', 'AP RERA township', 'Amaravati real estate', 'Vijayawada open plots', 'Verified real estate broker'],
  authors: [{ name: 'Pavan Kumar - Pavan Properties' }],
  openGraph: {
    title: 'Pavan Properties | Verified Paperwork Real Estate Listings',
    description: '100% Verified CRDA & RERA layouts. Bank loan facilities pre-approved. Book a free site visit slot in under 3 taps.',
    type: 'website',
    locale: 'en_IN',
    siteName: 'Pavan Properties'
  }
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className="min-h-screen flex flex-col bg-slate-950 text-slate-100 antialiased selection:bg-emerald-500 selection:text-white">
        <Navbar />
        <main className="flex-grow">{children}</main>
        <Footer />
        <WhatsAppFloat />
      </body>
    </html>
  );
}
