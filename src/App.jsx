import React, { useState } from 'react';
import Layout from './components/Layout';
import Timer from './components/Timer';
import StageWelcome from './components/StageWelcome';
import Stage1_Director from './components/Stage1_Director';
import Stage2_Wifi from './components/Stage2_Wifi';
import Stage3_Camera from './components/Stage3_Camera';
import Stage4_Twist from './components/Stage4_Twist';
import StageSuccess from './components/StageSuccess';
import { Skull } from 'lucide-react';

function App() {
  const [stage, setStage] = useState(0); // 0: Welcome, 1: Director, 2: Wifi, 3: Camera, 4: Twist, 5: Success
  const [timeLeft, setTimeLeft] = useState(30 * 60); // 30 minutes in seconds
  const [isActive, setIsActive] = useState(false);
  const [gameOver, setGameOver] = useState(false);

  const startGame = () => {
    setStage(1);
    setIsActive(true);
  };

  const nextStage = () => {
    setStage((prev) => prev + 1);
  };

  const handleTimeUp = () => {
    setIsActive(false);
    setGameOver(true);
  };

  const restartGame = () => {
    setStage(0);
    setTimeLeft(30 * 60);
    setIsActive(false);
    setGameOver(false);
  };

  if (gameOver) {
    return (
      <Layout>
        <div className="text-center space-y-6 animate-in zoom-in duration-500">
          <Skull size={100} className="mx-auto text-red-600 animate-pulse" />
          <h1 className="text-6xl font-bold text-red-600 glitch-text" data-text="GAME OVER">
            GAME OVER
          </h1>
          <p className="text-2xl text-red-400">
            Le Directeur vous a attrapé. Retenue... POUR TOUJOURS.
          </p>
          <button
            onClick={restartGame}
            className="mt-8 px-8 py-3 bg-red-900/50 border-2 border-red-600 text-red-500 hover:bg-red-600 hover:text-white font-bold rounded transition-all"
          >
            RÉESSAYER
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      {stage > 0 && stage < 5 && (
        <Timer
          timeLeft={timeLeft}
          setTimeLeft={setTimeLeft}
          onTimeUp={handleTimeUp}
          isActive={isActive}
        />
      )}

      {stage === 0 && <StageWelcome onStart={startGame} />}
      {stage === 1 && <Stage1_Director onComplete={nextStage} />}
      {stage === 2 && <Stage2_Wifi onComplete={nextStage} />}
      {stage === 3 && <Stage3_Camera onComplete={nextStage} />}
      {stage === 4 && <Stage4_Twist onComplete={nextStage} />}
      {stage === 5 && <StageSuccess onRestart={restartGame} />}
    </Layout>
  );
}

export default App;
