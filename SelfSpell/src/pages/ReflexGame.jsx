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

<<<<<<< HEAD
  const images = [cat1, cat2, cat3]; // Tablica z obrazkami

  // Const array with feature values for each stage
  const constFeatures = [
    -1.2, 1.5, -1.1, 1.3, 1.0, 1.6, -1.7, 1.8, 2.0, 1.4
  ]; // Example values, adjust them according to your needs
=======
<<<<<<< Updated upstream
  const shapes = ["square", "circle", "triangle"]; // Dostępne kształty
=======
  const images = [cat1, cat2, cat3];
>>>>>>> Stashed changes
>>>>>>> agatoneq

  const startGame = () => {
    console.log("Game started");
    setIsStarted(true);
    setStage(1);
    setReactionTimes([]);
    setGameEnded(false);
    setAverageTime(null);
    setInstructionText("Czekaj na magicznego kotka...");
    nextRound(1);
  };

  const nextRound = (currentStage) => {
<<<<<<< HEAD
    if (currentStage > 9) {
      return;
    }
=======
<<<<<<< Updated upstream
    if (currentStage > 3) return; // Zakończenie gry po trzeciej próbie
=======
    if (currentStage > 6) {
      return;
    }
>>>>>>> Stashed changes
>>>>>>> agatoneq

    setIsVisible(false);
    const randomDelay = Math.floor(Math.random() * 4000) + 1000;

    console.log(`Stage: ${currentStage}`);
    console.log(`Next image will appear in ${randomDelay}ms`);

    setTimeout(() => {
      const randomPosition = {
        top: `${Math.random() * 70 + 15}%`,
        left: `${Math.random() * 70 + 15}%`,
      };
      setPosition(randomPosition);
      setImage(images[currentStage % 3]);
      setStartTime(Date.now());
      setIsVisible(true);
      setInstructionText("");

      console.log(`Image: ${images[currentStage % 3]} at position`, randomPosition);
    }, randomDelay);
  };

  const handleClick = () => {
    if (isVisible) {
      const endTime = Date.now();
      const reactionTime = endTime - startTime;

      console.log(`Reaction time: ${reactionTime}ms`);

      setReactionTimes((prev) => [...prev, reactionTime]);
      setIsVisible(false);

<<<<<<< HEAD
      if (stage < 9) {
=======
<<<<<<< Updated upstream
      if (stage < 3) {
=======
      if (stage < 6) {
>>>>>>> Stashed changes
>>>>>>> agatoneq
        const nextStage = stage + 1;
        setStage(nextStage);
        nextRound(nextStage);
      } else {
        const finalAverageTime =
          [...reactionTimes, reactionTime].reduce((a, b) => a + b, 0) /
          (reactionTimes.length + 1);

        setAverageTime(finalAverageTime);
        setGameEnded(true);
        setIsStarted(false);

        // Get user features from localStorage and update based on average time
        const userFeatures = JSON.parse(localStorage.getItem("userFeatures")) || { features: Array(10).fill(1.0) };

        // Update the user features based on the average reaction time
        const updatedFeatures = userFeatures.features.map((feature, index) => {
          const avgTimeFactor = (finalAverageTime / 1000 - 1) / 20; // Convert ms to seconds
          let newFeature = feature - constFeatures[index] * avgTimeFactor
          if (newFeature < -1.) {
            newFeature = -1.;}
          if (newFeature > 1.) {
            newFeature = 1.;
          }
          return newFeature;
        });

        // Save the updated features back to localStorage
        userFeatures.features = updatedFeatures;
        localStorage.setItem("userFeatures", JSON.stringify(userFeatures));

        console.log("Updated user features:", userFeatures.features);
      }
    }
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
          <p>Twój średni czas reakcji to: {Math.round(averageTime) / 1000} s</p>
        </div>
      )}
    </div>
  );
};

export default ReflexGame;
