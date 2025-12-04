import React from 'react';
import { School, Play, MapPin } from 'lucide-react';

const StageWelcome = ({ onStart }) => {
    return (
        <div className="text-center space-y-8 animate-fade-in-up">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-white rounded-3xl shadow-xl mb-4 rotate-3 hover:rotate-6 transition-transform duration-300">
                <School size={48} className="text-brand-600" />
            </div>

            <div className="space-y-2">
                <h2 className="text-5xl font-bold text-slate-800 tracking-tight">
                    Escape Campus
                </h2>
                <p className="text-slate-500 text-lg">
                    Pourrez-vous sortir avant le retour du Directeur ?
                </p>
            </div>

            <div className="glass-panel p-8 rounded-2xl max-w-2xl mx-auto text-left relative overflow-hidden group">
                <div className="absolute top-0 left-0 w-1 h-full bg-brand-500"></div>
                <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                    <MapPin size={20} className="text-brand-500" /> Briefing de Mission
                </h3>
                <p className="text-slate-600 mb-4 leading-relaxed">
                    Vous êtes enfermé dans le bâtiment principal. Les protocoles de sécurité sont actifs.
                    Vous avez <span className="font-bold text-brand-600">30 minutes</span> pour franchir 3 points de contrôle.
                </p>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Étape 1</span>
                        <span className="font-medium text-slate-700">Distraire le Directeur</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Étape 2</span>
                        <span className="font-medium text-slate-700">Débloquer le Wi-Fi</span>
                    </div>
                    <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                        <span className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-1">Étape 3</span>
                        <span className="font-medium text-slate-700">Désactiver les Caméras</span>
                    </div>
                </div>
            </div>

            <button
                onClick={onStart}
                className="group relative px-8 py-4 bg-brand-600 hover:bg-brand-700 text-white font-bold text-lg rounded-xl shadow-lg shadow-brand-200 transition-all hover:-translate-y-1 active:translate-y-0"
            >
                <span className="flex items-center gap-2">
                    Commencer l'Évasion <Play size={20} className="fill-current" />
                </span>
            </button>
        </div>
    );
};

export default StageWelcome;
