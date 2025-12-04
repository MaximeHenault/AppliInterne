import React, { useState, useEffect } from 'react';
import { UserX, Lock, ArrowRight, AlertTriangle, HelpCircle } from 'lucide-react';

const Stage4_Twist = ({ onComplete }) => {
    // Mastermind Logic
    // Code: 4 digits, unique or not? Let's say unique for standard difficulty, or allow duplicates for harder.
    // Let's go with 4 unique digits for fair difficulty.
    const [secretCode, setSecretCode] = useState([]);
    const [guess, setGuess] = useState('');
    const [history, setHistory] = useState([]); // Array of { guess, correctPos, correctNum }
    const [attempts, setAttempts] = useState(0);
    const MAX_ATTEMPTS = 10;

    useEffect(() => {
        // Generate random 4 digit code (unique digits)
        const digits = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];
        const code = [];
        while (code.length < 4) {
            const index = Math.floor(Math.random() * digits.length);
            code.push(digits[index]);
            digits.splice(index, 1);
        }
        setSecretCode(code);
        console.log("Secret Code (Cheating is bad!):", code.join(''));
    }, []);

    const checkGuess = (e) => {
        e.preventDefault();
        if (guess.length !== 4) return;

        const guessArr = guess.split('');
        let correctPos = 0;
        let correctNum = 0;

        guessArr.forEach((digit, i) => {
            if (digit === secretCode[i]) {
                correctPos++;
            } else if (secretCode.includes(digit)) {
                correctNum++;
            }
        });

        const newHistory = [{ guess, correctPos, correctNum }, ...history];
        setHistory(newHistory);
        setAttempts(prev => prev + 1);
        setGuess('');

        if (correctPos === 4) {
            setTimeout(onComplete, 2000);
        }
    };

    return (
        <div className="w-full max-w-4xl animate-fade-in-up">
            <div className="text-center mb-8">
                <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-xs font-bold tracking-wide mb-2">
                    EXAMEN FINAL : BUREAU DU DOYEN
                </span>
                <h2 className="text-4xl font-bold text-slate-800">Le Rebondissement</h2>
                <p className="text-slate-500 mt-2 text-lg">
                    Vous pensiez être libre ? Le Doyen a un dernier test.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
                {/* Interaction Panel */}
                <div className="glass-panel p-8 rounded-3xl flex flex-col justify-center">
                    <div className="text-center mb-8">
                        <div className="inline-block p-4 bg-slate-100 rounded-full mb-4">
                            <UserX size={48} className="text-slate-700" />
                        </div>
                        <h3 className="text-xl font-bold text-slate-800">Contournement Biométrique</h3>
                        <p className="text-sm text-slate-500 mt-2">
                            Craquez le code à 4 chiffres. Les chiffres sont uniques.
                            <br />
                            <span className="font-bold text-red-500">{MAX_ATTEMPTS - attempts} Essais Restants</span>
                        </p>
                    </div>

                    <form onSubmit={checkGuess} className="space-y-4">
                        <div className="flex justify-center gap-2">
                            <input
                                type="text"
                                maxLength={4}
                                value={guess}
                                onChange={(e) => setGuess(e.target.value.replace(/[^0-9]/g, ''))}
                                placeholder="0000"
                                className="w-full max-w-[200px] text-center text-3xl font-mono font-bold tracking-[0.5em] p-4 rounded-xl border-2 border-slate-200 focus:border-purple-500 outline-none"
                                autoFocus
                                disabled={attempts >= MAX_ATTEMPTS}
                            />
                        </div>
                        <button
                            type="submit"
                            disabled={guess.length !== 4 || attempts >= MAX_ATTEMPTS}
                            className="w-full bg-purple-600 hover:bg-purple-700 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all shadow-lg"
                        >
                            Soumettre le Code
                        </button>
                    </form>

                    {attempts >= MAX_ATTEMPTS && (
                        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded-xl text-center font-bold animate-pulse">
                            <AlertTriangle className="inline mr-2" /> VERROUILLAGE INITIÉ
                        </div>
                    )}
                </div>

                {/* History Panel */}
                <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200 h-[400px] overflow-y-auto">
                    <h4 className="font-bold text-slate-700 mb-4 flex items-center gap-2">
                        <HelpCircle size={18} /> Historique des Essais
                    </h4>

                    <div className="space-y-2">
                        {history.length === 0 && (
                            <p className="text-slate-400 text-center italic mt-10">Aucun essai pour le moment.</p>
                        )}
                        {history.map((entry, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-white rounded-xl shadow-sm border border-slate-100 animate-fade-in-up">
                                <span className="font-mono font-bold text-lg text-slate-800 tracking-widest">
                                    {entry.guess}
                                </span>
                                <div className="flex gap-2 text-xs font-bold">
                                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded">
                                        {entry.correctPos} Bien Placé
                                    </span>
                                    <span className="px-2 py-1 bg-yellow-100 text-yellow-700 rounded">
                                        {entry.correctNum} Mal Placé
                                    </span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Stage4_Twist;
