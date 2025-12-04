import React, { useState, useEffect } from 'react';
import { Camera, ShieldCheck, RefreshCw, Power } from 'lucide-react';

const Stage3_Camera = ({ onComplete }) => {
    // 5x5 Grid. True = ON (Red/Danger), False = OFF (Green/Safe)
    // Initial state must be solvable.
    // A simple way to ensure solvability is to start with all OFF, then simulate random clicks.
    const GRID_SIZE = 5;

    const createEmptyGrid = () => Array(GRID_SIZE).fill().map(() => Array(GRID_SIZE).fill(false));

    const toggle = (grid, r, c) => {
        const newGrid = grid.map(row => [...row]);
        const moves = [[0, 0], [0, 1], [0, -1], [1, 0], [-1, 0]];
        moves.forEach(([dr, dc]) => {
            const nr = r + dr;
            const nc = c + dc;
            if (nr >= 0 && nr < GRID_SIZE && nc >= 0 && nc < GRID_SIZE) {
                newGrid[nr][nc] = !newGrid[nr][nc];
            }
        });
        return newGrid;
    };

    const generateLevel = () => {
        let g = createEmptyGrid();
        // Simulate 10 random clicks to create a solvable puzzle
        for (let i = 0; i < 10; i++) {
            const r = Math.floor(Math.random() * GRID_SIZE);
            const c = Math.floor(Math.random() * GRID_SIZE);
            g = toggle(g, r, c);
        }
        return g;
    };

    const [grid, setGrid] = useState(generateLevel());
    const [solved, setSolved] = useState(false);

    useEffect(() => {
        const isSolved = grid.every(row => row.every(cell => !cell));
        if (isSolved && !solved) {
            setSolved(true);
            setTimeout(onComplete, 2000);
        }
    }, [grid, solved, onComplete]);

    const handleCellClick = (r, c) => {
        if (solved) return;
        setGrid(toggle(grid, r, c));
    };

    const resetGrid = () => {
        setGrid(generateLevel());
    };

    return (
        <div className="w-full max-w-4xl animate-fade-in-up">
            <div className="text-center mb-6">
                <span className="inline-block px-3 py-1 bg-rose-100 text-rose-700 rounded-full text-xs font-bold tracking-wide mb-2">
                    SALLE 305 : TERMINAL DE SÉCURITÉ
                </span>
                <h2 className="text-3xl font-bold text-slate-800">Contournement Avancé</h2>
                <p className="text-slate-500 mt-1">
                    Le système a été mis à jour. Grille 5x5. Éteignez tous les nœuds (Vert).
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                {/* Puzzle Grid */}
                <div className="bg-slate-900 p-6 rounded-3xl shadow-2xl relative overflow-hidden">
                    <div className="absolute inset-0 bg-[linear-gradient(45deg,transparent_25%,rgba(255,255,255,0.05)_50%,transparent_75%,transparent_100%)] bg-[length:20px_20px]"></div>

                    <div className="relative z-10 grid grid-cols-5 gap-3 max-w-xs mx-auto">
                        {grid.map((row, r) => (
                            row.map((isOn, c) => (
                                <button
                                    key={`${r}-${c}`}
                                    onClick={() => handleCellClick(r, c)}
                                    className={`
                    aspect-square rounded-lg transition-all duration-300 shadow-lg flex items-center justify-center
                    ${isOn
                                            ? 'bg-rose-500 shadow-[0_0_10px_rgba(244,63,94,0.6)] scale-100 hover:bg-rose-400'
                                            : 'bg-emerald-900/50 border border-emerald-500/30 scale-95'}
                  `}
                                >
                                    {/* Small dot for visual clarity */}
                                    <div className={`w-1.5 h-1.5 rounded-full ${isOn ? 'bg-white' : 'bg-emerald-500/30'}`}></div>
                                </button>
                            ))
                        ))}
                    </div>

                    <div className="mt-6 flex justify-center">
                        <button
                            onClick={resetGrid}
                            className="text-slate-400 hover:text-white text-sm flex items-center gap-2 transition-colors"
                        >
                            <RefreshCw size={14} /> Réinitialiser / Nouveau Puzzle
                        </button>
                    </div>
                </div>

                {/* Status Panel */}
                <div className="glass-panel p-8 rounded-3xl text-center">
                    {!solved ? (
                        <div className="space-y-6">
                            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-rose-100 text-rose-500 animate-pulse">
                                <Camera size={40} />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">Caméra Active</h3>
                                <p className="text-slate-500">
                                    Passez tous les nœuds sur <span className="font-bold text-rose-500">OFF</span> (Rouge) pour désactiver le flux.
                                </p>
                            </div>
                            <div className="p-4 bg-slate-50 rounded-xl border border-slate-100 text-left text-sm text-slate-600">
                                <p className="font-bold mb-1">Protocole de Contournement :</p>
                                <ul className="list-disc pl-4 space-y-1">
                                    <li>Cibler un nœud affecte les nœuds adjacents.</li>
                                    <li>État Vert = Sûr (Désactivé).</li>
                                    <li>État Rouge = Actif (Danger).</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-6 animate-fade-in-up">
                            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 text-emerald-600 shadow-lg shadow-emerald-200">
                                <ShieldCheck size={48} />
                            </div>
                            <div>
                                <h3 className="text-3xl font-bold text-slate-800 mb-2">Système Hors Ligne</h3>
                                <p className="text-emerald-600 font-medium">
                                    Surveillance désactivée. Voie libre.
                                </p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Stage3_Camera;
