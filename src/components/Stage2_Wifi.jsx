import React, { useState } from 'react';
import { Wifi, Lock, ArrowRight, Search, FileText, Trash2, Monitor, Key } from 'lucide-react';

const Stage2_Wifi = ({ onComplete }) => {
    const [input, setInput] = useState('');
    const [error, setError] = useState(false);
    const [foundItems, setFoundItems] = useState([]);
    const [activeItem, setActiveItem] = useState(null);

    // Puzzle: Caesar Cipher Shift +3
    // "ESCAPE" -> "HVFDSH"
    // Clue 1: "Shift +3"
    // Clue 2: Encrypted text "HVFDSH"

    const items = [
        { id: 'note', label: 'Note Chiffrée', content: 'PASS: "HVFDSH"', icon: FileText, x: '80%', y: '70%' },
        { id: 'cipher', label: 'Clé de Chiffrement', content: 'DÉCALAGE: +3 (A->D)', icon: Key, x: '20%', y: '40%' },
        { id: 'chart', label: 'Tableau Alphabet', content: 'A B C D E F G...', icon: Monitor, x: '50%', y: '30%' },
    ];

    const handleItemClick = (item) => {
        setActiveItem(item);
        if (!foundItems.includes(item.id)) {
            setFoundItems([...foundItems, item.id]);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (input.toUpperCase() === "ESCAPE") {
            onComplete();
        } else {
            setError(true);
            setInput('');
            setTimeout(() => setError(false), 1000);
        }
    };

    return (
        <div className="w-full max-w-5xl animate-fade-in-up">
            <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold tracking-wide mb-2">
                    SALLE 204 : SALLE DES SERVEURS
                </span>
                <h2 className="text-3xl font-bold text-slate-800">Le Réseau Chiffré</h2>
                <p className="text-slate-500 mt-1">Le mot de passe est chiffré. Trouvez la clé pour le déchiffrer.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[500px]">
                {/* Hidden Object Scene */}
                <div className="lg:col-span-2 relative bg-slate-800 rounded-3xl overflow-hidden border border-slate-700 shadow-2xl">
                    <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_center,_#4f46e5_1px,_transparent_1px)] bg-[length:30px_30px]"></div>

                    {items.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => handleItemClick(item)}
                            style={{ top: item.y, left: item.x }}
                            className={`absolute p-3 rounded-full transition-all duration-300 hover:scale-110 group ${foundItems.includes(item.id)
                                    ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]'
                                    : 'bg-slate-700 text-slate-300 hover:bg-brand-500 hover:text-white'
                                }`}
                        >
                            <item.icon size={24} />
                            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 bg-black/80 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                                {item.label}
                            </div>
                        </button>
                    ))}
                </div>

                {/* Inventory & Input */}
                <div className="glass-panel p-6 rounded-3xl flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Search size={18} className="text-brand-500" /> Outils de Déchiffrement
                    </h3>

                    <div className="flex-grow space-y-3 mb-6">
                        {items.map((item) => (
                            <div
                                key={item.id}
                                className={`p-3 rounded-xl border transition-all ${foundItems.includes(item.id)
                                        ? 'bg-white border-brand-200 shadow-sm'
                                        : 'bg-slate-50 border-slate-100 opacity-50'
                                    }`}
                            >
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg ${foundItems.includes(item.id) ? 'bg-brand-100 text-brand-600' : 'bg-slate-200 text-slate-400'}`}>
                                        <item.icon size={16} />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-500 uppercase">{item.label}</p>
                                        <p className="font-mono font-bold text-slate-800">
                                            {foundItems.includes(item.id) ? item.content : '???'}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-3 mt-auto">
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Entrez le mot de passe"
                                className={`w-full bg-white border-2 ${error ? 'border-red-300 bg-red-50' : 'border-slate-200 focus:border-brand-500'} rounded-xl p-3 pl-10 font-mono font-bold outline-none transition-all`}
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 rounded-xl transition-all flex items-center justify-center gap-2"
                        >
                            Déverrouiller <ArrowRight size={18} />
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Stage2_Wifi;
