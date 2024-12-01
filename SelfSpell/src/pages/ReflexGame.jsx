import { useState } from "react";
import "../styles/ReflexGame.css";

import cat1 from "../assets/cat1.png";
import cat2 from "../assets/cat2.png";
import cat3 from "../assets/cat3.png";
import memory2 from "../assets/memory2.png";
import memory6 from "../assets/memory6.png";
import memory5 from "../assets/memory5.png";

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
  const [instructionText, setInstructionText] = useState("Czekaj na czarodzieja...");

  // Zaktualizowana tablica obrazków z 6 różnymi obrazkami
  const images = [cat1, cat2, cat3, memory2, memory5, memory6];

  // Const array with feature values for each stage
  const constFeatures = [
    0, 1.3, -0.2, 0.7, -0.2, 0.1, -0.1, 0.1, 0, 0.1
  ];

  const startGame = () => {
    console.log("Gra rozpoczęta");
    setIsStarted(true);
    setStage(1);
    setReactionTimes([]);
    setGameEnded(false);
    setAverageTime(null);
    setInstructionText("Czekaj na czarodzieja...");
    nextRound(1);
  };

  const nextRound = (currentStage) => {
    if (currentStage > 6) {
      return;
    }

    setIsVisible(false);


    // Skrócenie czasu oczekiwania (zmniejszamy minimalny czas opóźnienia)
    const randomDelay = Math.floor(Math.random() * 1000) + 500;  // Czas od 500ms do 1500ms

    console.log(`Etap: ${currentStage}`);
    console.log(`Następny obrazek pojawi się za ${randomDelay}ms`);

    setTimeout(() => {
      // Losowe pozycjonowanie obrazków, ale teraz obrazki są bardziej wyśrodkowane na ekranie
      const randomPosition = {
        top: `${Math.random() * 30 + 10}%`,  // Losowe pozycje w zakresie 10%-40%
        left: `${Math.random() * 30 + 10}%`, // Losowe pozycje w zakresie 10%-40%
      };
      setPosition(randomPosition);

      const selectedImage = images[currentStage % images.length];  // Używamy całej tablicy obrazków
      setImage(selectedImage);
      setStartTime(Date.now());
      setIsVisible(true);
      setInstructionText("");

      console.log(`Obrazek: ${selectedImage} w pozycji`, randomPosition);

    }, randomDelay);
  };

  const handleClick = () => {
    if (isVisible) {
      const endTime = Date.now();
      const reactionTime = endTime - startTime;

      console.log(`Czas reakcji: ${reactionTime}ms`);
      setReactionTimes((prev) => [...prev, reactionTime]);
      setIsVisible(false);

      if (stage < 6) {
        const nextStage = stage + 1;
        setStage(nextStage); 
        nextRound(nextStage);
      } else {

        endGame([...reactionTimes, reactionTime]);

        const finalAverageTime =
          [...reactionTimes, reactionTime].reduce((a, b) => a + b, 0) /
          (reactionTimes.length + 1);

        setAverageTime(finalAverageTime);
        setGameEnded(true);
        setIsStarted(false);

        // Get user features from localStorage and update based on average time
        const userFeatures = JSON.parse(localStorage.getItem("userFeatures")) || { features: Array(10).fill(1.0) };

        // Update the user features based on the average reaction time
        const updatedFeatures = userFeatures.map((feature, index) => {
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
          {isVisible && image && (
            <div
              className="shape-container"
              style={{ top: position.top, left: position.left }}
              onClick={handleClick}
            >
              <img src={image} alt="kot" className="shape" />
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
