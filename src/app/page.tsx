import { redirect } from 'next/navigation';

export default function HomePage() {
    redirect('/create');
    return null;
}
