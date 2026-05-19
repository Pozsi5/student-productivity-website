import React, { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import toast, { Toaster } from 'react-hot-toast';
import { useAuth } from 'react-oidc-context';
import AppRouter from './router/AppRouter'; // <-- Fontos, hogy ez az import megmaradjon!

const App: React.FC = () => {
    const auth = useAuth();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        if (searchParams.get('logout') === 'success') {
            toast.success('Sikeresen kijelentkeztél!', {
                style: {
                    borderRadius: '10px',
                    background: '#333',
                    color: '#fff',
                },
            });

            searchParams.delete('logout');
            setSearchParams(searchParams, { replace: true });
        }
    }, [searchParams, setSearchParams]);

    if (auth.isLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-[#EBF4FA]">
                <div className="text-xl font-semibold text-[#4A90E2] animate-pulse">
                    Rendszer betöltése...
                </div>
            </div>
        );
    }

    if (auth.error) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-red-50">
                <p className="text-red-500">Hiba történt: {auth.error.message}</p>
            </div>
        );
    }

    return (
        <>
            <Toaster position="top-center" reverseOrder={false} />

            {!auth.isAuthenticated ? (
                <div className="flex flex-col items-center justify-center min-h-screen bg-[#EBF4FA]">
                    <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-[#4A90E2]">
                        Student Productivity
                    </h1>
                    <p className="mb-10 text-lg font-medium text-gray-600 max-w-md text-center">
                        Jelentkezz be a fókuszált tanulás megkezdéséhez és a feladataid rendszerezéséhez!
                    </p>
                    <button
                        onClick={() => void auth.signinRedirect()}
                        className="px-10 py-4 text-xl font-bold text-white transition-all transform bg-[#4A90E2] rounded-xl shadow-lg hover:bg-blue-600 hover:scale-105"
                    >
                        Bejelentkezés
                    </button>
                </div>
            ) : (
                <AppRouter />
            )}
        </>
    );
};

export default App;