import React from 'react';
import { Trophy, RefreshCw, PartyPopper } from 'lucide-react';

const StageSuccess = ({ onRestart }) => {
    return (
        <div className="text-center space-y-8 animate-fade-in-up">
            <div className="relative inline-block">
                <div className="absolute inset-0 bg-yellow-400 blur-2xl opacity-20 rounded-full"></div>
                <div className="relative inline-flex items-center justify-center w-32 h-32 bg-gradient-to-br from-yellow-100 to-yellow-50 rounded-full shadow-xl mb-4 border-4 border-white">
                    <Trophy size={64} className="text-yellow-500" />
                </div>
                <div className="absolute -top-2 -right-2 bg-white p-2 rounded-full shadow-lg animate-bounce">
                    <PartyPopper size={24} className="text-yellow-500" />
                </div>
            </div>

            <div className="space-y-4">
                <h2 className="text-5xl font-bold text-slate-800 tracking-tight">
                    Vous Vous Êtes Échappé !
                </h2>
                <p className="text-xl text-slate-500 max-w-lg mx-auto leading-relaxed">
                    Félicitations ! Vous avez réussi à déjouer tous les protocoles de sécurité et à sortir du campus.
                </p>
            </div>

            <div className="pt-8">
                <button
                    onClick={onRestart}
                    className="px-8 py-4 bg-slate-900 hover:bg-slate-800 text-white font-bold rounded-xl transition-all flex items-center gap-2 mx-auto shadow-xl hover:shadow-2xl hover:-translate-y-1"
                >
                    <RefreshCw size={20} /> Rejouer
                </button>
            </div>
        </div>
    );
};

export default StageSuccess;
