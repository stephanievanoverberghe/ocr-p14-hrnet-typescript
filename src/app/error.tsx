'use client';

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
    return (
        <div className="text-center p-4">
            <h2 className="text-lg font-semibold text-red-600">Une erreur s’est produite 😢</h2>
            <p className="my-4">{error.message}</p>
            <button onClick={reset} className="mt-4 px-4 py-2 bg-[#5a6f07] text-white rounded">
                Réessayer
            </button>
        </div>
    );
}
