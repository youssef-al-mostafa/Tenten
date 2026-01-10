import NavBar from '@/Components/App/NavBar';
import Footer from '@/Components/App/Footer';
import WelcomeModal from '@/Components/App/WelcomeModal';
import { ReactNode } from 'react';

export default function AppLayout({ children }: { children: ReactNode }) {
    return (
        <div className="min-h-screen flex flex-col bg-base-200 overflow-hidden">
            <WelcomeModal />
            <NavBar />
            <main className="flex-grow">
                {children}
            </main>
            <Footer />
        </div>
    );
}
