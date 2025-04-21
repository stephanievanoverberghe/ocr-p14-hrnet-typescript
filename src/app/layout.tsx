import Script from 'next/script';
import type { Metadata } from 'next';
import Header from 'components/Header/Header';
import Footer from 'components/Footer/Footer';
import './globals.css';
import { Providers } from 'store/Providers';

export const metadata: Metadata = {
    title: 'HRnet',
    description: 'Application de gestion des employés',
    icons: {
        icon: '/favicon.ico',
    },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <head />

            <body className="bg-gray-100 text-gray-900">
                {/* Font Awesome Kit */}
                <Script src="https://kit.fontawesome.com/e5228146fd.js" crossOrigin="anonymous" strategy="beforeInteractive" />
                <Providers>
                    <Header />
                    <main className="container mx-auto px-4 py-6">{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
