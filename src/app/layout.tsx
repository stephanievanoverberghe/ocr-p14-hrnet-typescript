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

/**
 * Layout racine de l'application. Contient l'en-tête, le pied de page, les styles globaux, et les providers.
 *
 * @param {Object} props - Propriétés du composant.
 * @param {React.ReactNode} props.children - Contenu principal à afficher entre le header et le footer.
 * @returns {JSX.Element} - Layout global de l'application.
 */
export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="fr">
            <head />

            <body className="bg-gray-100 text-gray-900 min-h-screen flex flex-col justify-between">
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
