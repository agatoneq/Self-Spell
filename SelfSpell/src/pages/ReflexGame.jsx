import React, { useState, useEffect } from "react";
import "../styles/ReflexGame.css"; // Import stylów

const ReflexGame = () => {
  const [startTime, setStartTime] = useState(null);
  const [reactionTime, setReactionTime] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [timeoutId, setTimeoutId] = useState(null);

  const startGame = () => {
    setReactionTime(null); // Resetuj wynik
    setIsVisible(false); // Ukryj przycisk na start
    const randomDelay = Math.floor(Math.random() * 2000) + 1000; // Losowe opóźnienie od 1 do 3 sekund

    const id = setTimeout(() => {
      setStartTime(Date.now()); // Ustaw czas startu
      setIsVisible(true); // Pokaż przycisk
    }, randomDelay);

    setTimeoutId(id); // Zapisz ID timeouta (do anulowania w razie potrzeby)
  };

  const handleClick = () => {
    if (isVisible) {
      const endTime = Date.now(); // Czas kliknięcia
      setReactionTime(endTime - startTime); // Oblicz czas reakcji
      setIsVisible(false); // Ukryj przycisk
      clearTimeout(timeoutId); // Wyczyść timeout
    }
  };

  // Funkcja wysyłająca wynik do backendu
  useEffect(() => {
    if (reactionTime !== null) {
      fetch("/api/save_reaction", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: "123", // Zamień na aktualny user ID
          reaction_time: reactionTime,
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log("Wynik zapisany:", data));
    }
  }, [reactionTime]);

  return (
    <div className="reflex-game">
      <h1>Test refleksu</h1>
      {reactionTime !== null ? (
        <h2>Twój czas reakcji: {reactionTime} ms</h2>
      ) : (
        <p>Kliknij, gdy zobaczysz przycisk!</p>
      )}
      <button className="start-button" onClick={startGame}>
        Start
      </button>
      {isVisible && (
        <div className="clickable-box" onClick={handleClick}></div>
      )}
    </div>
  );
};

export default ReflexGame;
