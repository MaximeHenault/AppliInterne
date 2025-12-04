import React, { useState } from 'react';
import { AlertCircle, CheckCircle, XCircle, Mic, FileText, Search, ArrowRight, Lock } from 'lucide-react';

const Stage1_Director = ({ onComplete }) => {
    const [hasClue, setHasClue] = useState(false);
    const [showIntercom, setShowIntercom] = useState(false);
    const [feedback, setFeedback] = useState(null);
    const [inspectedItem, setInspectedItem] = useState(null);
    const [intercomCode, setIntercomCode] = useState('');

    // Logic Puzzle for Code:
    // "The code is 4 digits."
    // 1. First digit is 1.
    // 2. Second digit is First + 2 (3).
    // 3. Third digit is Second - 1 (2).
    // 4. Fourth digit is Third * 3 (6).
    // Code: 1326
    const CORRECT_CODE = "1326";

    const handleInspect = (item) => {
        setInspectedItem(item);
        if (item === 'notice') {
            setHasClue(true);
        }
    };

    const handleIntercomSubmit = (e) => {
        e.preventDefault();
        if (intercomCode !== CORRECT_CODE) {
            setFeedback({ type: 'error', text: "ACCÈS REFUSÉ. Code de sécurité incorrect." });
            setTimeout(() => setFeedback(null), 2000);
            return;
        }
        // If code is correct, show options
    };

    const handleIntercomAction = (action) => {
        if (action === 'coffee') {
            if (hasClue) {
                setFeedback({ type: 'success', text: "Parfait ! Vous saviez que le Directeur avait raté sa pause café. Il court vers la cafétéria !" });
                setTimeout(onComplete, 2500);
            } else {
                setFeedback({ type: 'error', text: "Vous annoncez du café gratuit, mais le Directeur l'ignore. Pourquoi s'en soucierait-il maintenant ?" });
            }
        } else if (action === 'alarm') {
            setFeedback({ type: 'error', text: "ALERTE SÉCURITÉ ! Les caméras vous ont repéré en train de déclencher l'alarme." });
        } else if (action === 'bait') {
            setFeedback({ type: 'error', text: "Le Directeur est au régime. Il ignore les snacks." });
        }

        if (action !== 'coffee' || !hasClue) {
            setTimeout(() => {
                setFeedback(null);
                if (action === 'alarm' || action === 'bait') {
                    // Keep intercom open or close it? Let's keep it open if code was entered
                }
            }, 2000);
        }
    };

    return (
        <div className="w-full max-w-5xl animate-fade-in-up">
            <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-brand-100 text-brand-700 rounded-full text-xs font-bold tracking-wide mb-2">
                    SALLE 101 : ZONE D'ATTENTE
                </span>
                <h2 className="text-3xl font-bold text-slate-800">L'Obstacle</h2>
                <p className="text-slate-500 mt-1">Le Directeur bloque la sortie. Vous devez utiliser l'interphone, mais il est verrouillé.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[550px]">
                {/* Interactive Scene */}
                <div className="lg:col-span-2 relative bg-slate-100 rounded-3xl overflow-hidden border border-slate-200 shadow-inner group">
                    <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_#cbd5e1_1px,_transparent_1px)] bg-[length:20px_20px]"></div>

                    {/* Notice Board */}
                    <button
                        onClick={() => handleInspect('notice')}
                        className="absolute top-10 left-10 p-4 bg-yellow-100 rounded-lg shadow-md hover:scale-105 transition-transform border border-yellow-200 group/item"
                    >
                        <FileText className="text-yellow-600 mb-1 mx-auto" />
                        <span className="text-xs font-bold text-yellow-700 block">Notes</span>
                        <div className="absolute -top-2 -right-2 bg-brand-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <Search size={12} />
                        </div>
                    </button>

                    {/* Sticky Note (Code Clue) */}
                    <button
                        onClick={() => handleInspect('sticky')}
                        className="absolute bottom-20 right-1/3 p-3 bg-pink-200 rounded shadow-sm hover:scale-110 transition-transform rotate-3 group/item"
                    >
                        <span className="text-[10px] font-mono text-pink-800 block leading-tight">CODE<br />ADMIN</span>
                        <div className="absolute -top-2 -right-2 bg-brand-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <Search size={12} />
                        </div>
                    </button>

                    {/* Intercom */}
                    <button
                        onClick={() => setShowIntercom(true)}
                        className="absolute top-1/2 right-10 -translate-y-1/2 p-3 bg-slate-200 rounded-xl shadow-lg border border-slate-300 hover:bg-slate-300 transition-colors group/item"
                    >
                        <div className="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center mb-2 mx-auto ring-4 ring-slate-300">
                            <Mic className="text-white" size={24} />
                        </div>
                        <span className="text-xs font-bold text-slate-600">Interphone</span>
                        <div className="absolute -top-2 -right-2 bg-brand-500 text-white rounded-full p-1 opacity-0 group-hover/item:opacity-100 transition-opacity">
                            <ArrowRight size={12} />
                        </div>
                    </button>

                    <div className="absolute bottom-0 right-1/3 w-32 h-64 bg-slate-900/10 rounded-t-full blur-sm pointer-events-none"></div>
                </div>

                {/* Info / Action Panel */}
                <div className="glass-panel p-6 rounded-3xl flex flex-col">
                    <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <Search size={18} className="text-brand-500" /> Investigation
                    </h3>

                    <div className="flex-grow bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100 overflow-y-auto">
                        {!inspectedItem && !showIntercom && (
                            <p className="text-slate-400 text-sm italic text-center mt-10">
                                Sélectionnez un objet dans la pièce pour l'inspecter.
                            </p>
                        )}

                        {inspectedItem === 'notice' && (
                            <div className="animate-fade-in-up">
                                <h4 className="font-bold text-yellow-700 mb-2">Planning Quotidien</h4>
                                <ul className="text-sm text-slate-600 space-y-2 list-disc pl-4">
                                    <li>09:00 - Réunion Matinale</li>
                                    <li>12:00 - Déjeuner (Salade uniquement)</li>
                                    <li className="font-bold text-red-500 bg-red-50 p-1 rounded">15:00 - PAUSE CAFÉ (ANNULÉE cause budget)</li>
                                    <li>17:00 - Patrouille Campus</li>
                                </ul>
                            </div>
                        )}

                        {inspectedItem === 'sticky' && (
                            <div className="animate-fade-in-up">
                                <h4 className="font-bold text-pink-700 mb-2">Rappel Code</h4>
                                <p className="text-sm font-mono text-slate-600 bg-white p-2 rounded border border-slate-200">
                                    "N'oublie pas la séquence :<br />
                                    1. Commence par 1.<br />
                                    2. Ajoute 2 pour le suivant.<br />
                                    3. Soustrait 1 à celui-là.<br />
                                    4. Multiplie par 3 pour le dernier."
                                </p>
                            </div>
                        )}

                        {showIntercom && (
                            <div className="animate-fade-in-up space-y-3">
                                <h4 className="font-bold text-slate-800 mb-2">Contrôles Interphone</h4>

                                {intercomCode !== CORRECT_CODE ? (
                                    <form onSubmit={handleIntercomSubmit} className="space-y-2">
                                        <p className="text-xs text-slate-500">Entrez le code de sécurité à 4 chiffres.</p>
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                maxLength={4}
                                                value={intercomCode}
                                                onChange={(e) => setIntercomCode(e.target.value)}
                                                className="w-full p-2 border rounded text-center font-mono tracking-widest"
                                                placeholder="0000"
                                            />
                                            <button type="submit" className="bg-slate-800 text-white px-4 rounded hover:bg-slate-700">
                                                <Lock size={16} />
                                            </button>
                                        </div>
                                    </form>
                                ) : (
                                    <div className="space-y-2 animate-fade-in-up">
                                        <p className="text-xs text-green-600 font-bold">ACCÈS AUTORISÉ</p>
                                        <button
                                            onClick={() => handleIntercomAction('bait')}
                                            className="w-full p-3 text-left text-sm bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors"
                                        >
                                            1. "Snacks gratuits dans le hall"
                                        </button>
                                        <button
                                            onClick={() => handleIntercomAction('alarm')}
                                            className="w-full p-3 text-left text-sm bg-white border border-slate-200 rounded-lg hover:bg-red-50 hover:border-red-200 transition-colors"
                                        >
                                            2. Test Alarme Incendie
                                        </button>
                                        <button
                                            onClick={() => handleIntercomAction('coffee')}
                                            className="w-full p-3 text-left text-sm bg-white border border-slate-200 rounded-lg hover:bg-brand-50 hover:border-brand-200 transition-colors font-medium"
                                        >
                                            3. "Café frais à la cafétéria"
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>

                    {feedback && (
                        <div className={`p-4 rounded-xl text-sm font-bold flex items-start gap-2 animate-fade-in-up ${feedback.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                            {feedback.type === 'success' ? <CheckCircle size={18} className="shrink-0 mt-0.5" /> : <AlertCircle size={18} className="shrink-0 mt-0.5" />}
                            {feedback.text}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stage1_Director;
