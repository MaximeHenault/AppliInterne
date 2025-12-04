import React, { useEffect } from 'react';
import { Clock, AlertTriangle } from 'lucide-react';

const Timer = ({ timeLeft, setTimeLeft, onTimeUp, isActive }) => {
    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((prevTime) => {
                    if (prevTime <= 1) {
                        clearInterval(interval);
                        onTimeUp();
                        return 0;
                    }
                    return prevTime - 1;
                });
            }, 1000);
        } else if (timeLeft === 0) {
            onTimeUp();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft, setTimeLeft, onTimeUp]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const isCritical = timeLeft < 300; // Less than 5 minutes

    return (
        <div className={`fixed top-6 right-6 z-40 flex items-center gap-3 px-5 py-2.5 rounded-full shadow-lg backdrop-blur-md transition-all duration-300 ${isCritical ? 'bg-red-50 text-red-600 border border-red-100 animate-pulse' : 'bg-white/80 text-slate-700 border border-white/50'}`}>
            {isCritical ? <AlertTriangle size={18} /> : <Clock size={18} className="text-brand-500" />}
            <span className="font-bold font-mono text-lg tabular-nums">{formatTime(timeLeft)}</span>
        </div>
    );
};

export default Timer;
