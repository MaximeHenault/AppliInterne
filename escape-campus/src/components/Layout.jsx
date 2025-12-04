import React from 'react';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-100 to-slate-300 relative overflow-hidden">
            {/* Abstract Background Shapes */}
            <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-brand-200/50 rounded-full blur-3xl animate-float"></div>
            <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-200/50 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>

            {/* Main Content */}
            <div className="relative z-10 container mx-auto px-4 py-8 min-h-screen flex flex-col">
                <header className="flex justify-between items-center mb-12">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-brand-600 rounded-lg flex items-center justify-center text-white font-bold shadow-lg">
                            E
                        </div>
                        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
                            Escape Campus
                        </h1>
                    </div>
                    <div className="px-3 py-1 bg-white/50 backdrop-blur rounded-full text-xs font-medium text-slate-500 border border-white/50">
                        Portail Étudiant
                    </div>
                </header>

                <main className="flex-grow flex flex-col items-center justify-center w-full max-w-5xl mx-auto">
                    {children}
                </main>

                <footer className="mt-12 text-center text-xs text-slate-400">
                    &copy; 2025 Système d'Administration du Campus
                </footer>
            </div>
        </div>
    );
};

export default Layout;
