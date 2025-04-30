import { redirect } from 'next/navigation';

/**
 * Page d'accueil qui redirige automatiquement vers /create.
 *
 * @returns {null} - Aucune sortie visuelle (redirection immédiate).
 */
export default function HomePage() {
    redirect('/create');
    return null;
}
