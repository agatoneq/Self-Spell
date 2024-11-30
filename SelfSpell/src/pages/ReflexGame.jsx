import React, { useState} from "react";
import "../styles/ReflexGame.css";

const ReflexGame = () => {
  const [stage, setStage] = useState(1); // Początkowy etap (1 = kwadrat, 2 = koło, 3 = trójkąt)
  const [startTime, setStartTime] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [shape, setShape] = useState(null); // Aktualny kształt
  const [position, setPosition] = useState({ top: "50%", left: "50%" }); // Pozycja elementu

  const shapes = ["square", "circle", "triangle"]; // Dostępne kształty

  const startGame = () => {
    console.log("Game started");
    setStage(1); // Ustaw etap na początek
    setReactionTimes([]); // Reset wyników
    nextRound(1); // Rozpocznij pierwszą próbę
  };

  const nextRound = (currentStage) => {
    if (currentStage > 3) return; // Zakończenie gry po trzeciej próbie

    setIsVisible(false); // Ukryj kształt przed pokazaniem nowego
    const randomDelay = Math.floor(Math.random() * 4000) + 1000; // Losowe opóźnienie 1-5 sekund

    console.log(`Stage: ${currentStage}`);
    console.log(`Next shape will appear in ${randomDelay}ms`);

    setTimeout(() => {
      const randomPosition = {
        top: `${Math.random() * 70 + 15}%`, // W zakresie 15-85% ekranu
        left: `${Math.random() * 70 + 15}%`,
      };
      setPosition(randomPosition);
      setShape(shapes[currentStage - 1]); // Ustaw właściwy kształt na podstawie etapu
      setStartTime(Date.now());
      setIsVisible(true);

      console.log(`Shape: ${shapes[currentStage - 1]} at position`, randomPosition);
    }, randomDelay);
  };

  const handleClick = () => {
    if (isVisible) {
      const endTime = Date.now();
      const reactionTime = endTime - startTime;

      console.log(`Reaction time: ${reactionTime}ms`);

      setReactionTimes((prev) => [...prev, reactionTime]); // Dodaj wynik do listy
      setIsVisible(false);

      if (stage < 3) {
        const nextStage = stage + 1;
        setStage(nextStage); // Przejdź do kolejnego etapu
        nextRound(nextStage); // Rozpocznij nową próbę
      } else {
        const averageTime =
          [...reactionTimes, reactionTime].reduce((a, b) => a + b, 0) /
          (reactionTimes.length + 1);

        alert(`Gra zakończona! Średni czas reakcji: ${Math.round(averageTime)} ms`);
        setStage(1); // Reset gry do pierwszego etapu
      }
    }
  };

  return (
    <div className="reflex-game">
      <h1>Test refleksu</h1>
      {stage === 1 && !isVisible ? (
        <button className="start-button" onClick={startGame}>
          Start
        </button>
      ) : (
        <p>Kliknij w {shapes[stage - 1]}!</p>
      )}
      {isVisible && (
        <div
          className={`shape ${shape}`}
          style={{ top: position.top, left: position.left }}
          onClick={handleClick}
        ></div>
      )}
    </div>
  );
};

export default ReflexGame;