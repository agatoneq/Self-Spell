import { useState } from "react";
import "../styles/ReflexGame.css";

import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";

const ReflexGame = () => {
  const [stage, setStage] = useState(1);
  const [startTime, setStartTime] = useState(null);
  const [reactionTimes, setReactionTimes] = useState([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [image, setImage] = useState(null);
  const [position, setPosition] = useState({ top: "50%", left: "50%" });
  const [gameEnded, setGameEnded] = useState(false);
  const [averageTime, setAverageTime] = useState(null);
  const [instructionText, setInstructionText] = useState("Czekaj na kształt...");

  const images = [cat1, cat2, cat3]; // Tablica z obrazkami
  const constFeatures = [-0.2, 0.15, -0.1, 0.13, 0.1, 0.16, -0.17, 0.18, 0.2, 0.14]; // Adjusted example values

  const startGame = () => {
    setIsStarted(true);
    setStage(1);
    setReactionTimes([]);
    setGameEnded(false);
    setAverageTime(null);
    setInstructionText("Czekaj na magicznego kotka...");
    nextRound(1);
  };

  const nextRound = (currentStage) => {
    if (currentStage > 3) return; // Zakończenie gry po trzeciej próbie

    setIsVisible(false);
    const randomDelay = Math.floor(Math.random() * 4000) + 1000;

    setTimeout(() => {
      const randomPosition = {
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`,
      };
      setPosition(randomPosition);
      setImage(images[currentStage % images.length]);
      setStartTime(Date.now());
      setIsVisible(true);
      setInstructionText("");
    }, randomDelay);
  };

  const handleClick = () => {
    if (isVisible) {
      const endTime = Date.now();
      const reactionTime = endTime - startTime;

      setReactionTimes((prev) => [...prev, reactionTime]);
      setIsVisible(false);

      if (stage < 3) {
        const nextStage = stage + 1;
        setStage(nextStage);
        nextRound(nextStage);
      } else {
        endGame([...reactionTimes, reactionTime]);
      }
    }
  };

  const endGame = (finalReactionTimes) => {
    const finalAverageTime =
      finalReactionTimes.reduce((a, b) => a + b, 0) / finalReactionTimes.length;

    setAverageTime(finalAverageTime);
    setGameEnded(true);
    setIsStarted(false);

    // Update user features based on average reaction time
    const userFeatures =
      JSON.parse(localStorage.getItem("userFeatures")) || Array(10).fill(0.0);

    const updatedFeatures = userFeatures.map((feature, index) => {
      const avgTimeFactor = (finalAverageTime / 1000 - 0.3) / 10; // Normalize for a baseline time of 300ms
      let newFeature = feature - constFeatures[index] * avgTimeFactor;

      // Keep feature within bounds
      return Math.max(-1.0, Math.min(1.0, newFeature));
    });

    localStorage.setItem("userFeatures", JSON.stringify(updatedFeatures));

    console.log("Updated user features:", updatedFeatures);
  };

  return (
    <div className="reflex-game">
      {!isStarted && !gameEnded ? (
        <div className="instructions">
          <h1>Sprawdź swój refleks</h1>
          <p>
            Po kliknięciu przycisku poniżej, kliknij w zwierzątko jak najszybciej potrafisz!
          </p>
          <button className="start-button" onClick={startGame}>
            Jestem gotowy!
          </button>
        </div>
      ) : null}

      {isStarted && !gameEnded ? (
        <>
          <p className="info">{instructionText}</p>
          {isVisible && (
            <div
              className="shape-container"
              style={{ top: position.top, left: position.left }}
              onClick={handleClick}
            >
              <img src={image} alt="shape" className="shape" />
            </div>
          )}
        </>
      ) : null}

      {gameEnded && (
        <div className="results">
          <h2>Gra zakończona!</h2>
          <p>Twój średni czas reakcji to: {(averageTime / 1000).toFixed(3)} s</p>
        </div>
      )}
    </div>
  );
};

export default ReflexGame;
