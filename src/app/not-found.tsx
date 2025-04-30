/**
 * Composant de fallback pour les routes non trouvées (404).
 *
 * @returns {JSX.Element} - Message d'erreur 404.
 */
export default function NotFound() {
    return (
        <div className="text-center p-10">
            <h1 className="text-2xl font-bold text-red-500">404 - Page non trouvée</h1>
        </div>
    );
}
