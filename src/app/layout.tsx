import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';

export const metadata: Metadata = {
  title: 'Shelby Cortex | Autonomous Hot Storage & AI Agent Engine on Aptos',
  description:
    'High-performance decentralized hot storage orchestrator, AI agent memory vault, and developer studio built on Aptos L1 for Shelby Protocol with sub-second retrieval.',
  keywords: [
    'Shelby',
    'Shelby Protocol',
    'Aptos',
    'Decentralized Storage',
    'Hot Storage',
    'AI Agent',
    'Reed Solomon',
    'Erasure Coding',
    'Web3',
    'ShelbyUSD',
  ],
  authors: [{ name: 'Shelby Ecosystem' }],
  openGraph: {
    title: 'Shelby Cortex | Autonomous Hot Storage & AI Agent Engine',
    description:
      'Sub-second decentralized object storage and autonomous AI agent memory pipeline built for the Shelby Protocol on Aptos.',
    url: 'https://shelby.xyz',
    siteName: 'Shelby Cortex',
    type: 'website',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: '#06080f',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" data-theme="dark" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        {/* Disable automated extension overrides (like Dark Reader) in favor of our native dual theme */}
        <meta name="darkreader-lock" content="darkreader-lock" />
      </head>
      <body>{children}</body>
    </html>
  );
}
