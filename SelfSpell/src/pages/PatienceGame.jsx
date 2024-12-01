import React, { useState, useEffect } from "react";
import "../styles/PatienceGame.css";

const PatienceGame = () => {
  const [currentColor, setCurrentColor] = useState("red");
  const [score, setScore] = useState(0);
  const [isStarted, setIsStarted] = useState(false);
  const [message, setMessage] = useState("");

  useEffect(() => {
    let colorInterval;

    if (isStarted) {
        const redDuration = Math.min(5000, 1000 + score * 50);
        const greenDuration = 1000; 

      colorInterval = setInterval(() => {
        const randomColor = Math.random() < 0.5 ? "red" : "green";
        setCurrentColor(randomColor);
        console.log("Kolor zmieniony na:", randomColor);

        if (randomColor === "green") {
          setTimeout(() => {
            setCurrentColor("red");
          }, greenDuration);
        }
      }, redDuration);

    }

    return () => clearInterval(colorInterval);
  }, [isStarted, score]);

  const handleClick = () => {
    if (currentColor === "green") {
      setScore((prevScore) => {
        const newScore = prevScore + 1;
        if (newScore >= 50) {
          endGame(true);
          return 50;
        }
        return newScore;
      });
      setMessage("Prawidłowe kliknięcie!");
    } else {
      setScore((prevScore) => Math.max(prevScore - 5, 0));
      setMessage("Kliknięcie w złym momencie!");
    }
  };

  const startGame = () => {
    setScore(0);
    setMessage("");
    setIsStarted(true);
    setCurrentColor("red");
    console.log("Gra rozpoczęta!");
  };

  const endGame = (isMaxScore = false) => {
    setIsStarted(false);
    if (isMaxScore) {
      setMessage("Gratulacje! Zdobyłeś maksymalny wynik: 50 punktów!");
    } else {
      setMessage(`Gra zakończona. Twój wynik: ${score} punktów.`);
    }
    console.log("Gra zakończona. Twój wynik:", score);
  };

  return (
    <div className="patience-game">
      {!isStarted ? (
        <div className="start-screen">
          <h1>Gra na cierpliwość</h1>
          <p>
            Kliknij "Rozpocznij", aby zacząć. Czekaj na zmianę koloru tła na zielony i
            klikaj przycisk, aby zdobyć punkty! Maksymalny wynik: 50 punktów.
          </p>
          <button className="start-button" onClick={startGame}>
            Rozpocznij
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      ) : (
        <div className="game-area" style={{ backgroundColor: currentColor }}>
          <h2 className="score">Twój wynik: {score}</h2>
          <button className="click-button" onClick={handleClick}>
            Kliknij mnie!
          </button>
          <button className="end-button" onClick={() => endGame(false)}>
            Zakończ grę
          </button>
          {message && <p className="message">{message}</p>}
        </div>
      )}
    </div>
  );
};

export default PatienceGame;
