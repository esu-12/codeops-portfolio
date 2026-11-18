import type { Metadata } from 'next';
import { Geist } from 'next/font/google';
import Navbar from '@/components/Navbar';
import './globals.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: {
    default: 'CampusConnect | Campus Events',
    template: '%s | CampusConnect',
  },
  description:
    'Discover campus events, explore sessions, and create events with CampusConnect.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={geistSans.variable}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
