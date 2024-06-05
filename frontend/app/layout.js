'use client';
import 'regenerator-runtime/runtime';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from './Header';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className} suppressHydrationWarning={true}>
        <Header />
        {children}
      </body>
    </html>
  );
}
