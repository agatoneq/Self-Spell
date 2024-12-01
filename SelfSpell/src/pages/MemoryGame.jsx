import React, { useState, useEffect } from "react";
import "../styles/MemoryGame.css";

const MemoryGame = () => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [isDisabled, setIsDisabled] = useState(false);

  const cardImages = [
    "cat2.png",
    "memory2.png",
    "memory7.png",
    "memory4.png",
    "memory5.png",
    "memory6.png",
  ];

  useEffect(() => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((image, index) => ({
        id: index,
        image,
        isFlipped: false,
        isMatched: false,
      }));
    setCards(shuffledCards);
  }, []);

  const handleCardClick = (card) => {
    if (isDisabled || card.isFlipped || card.isMatched) return;

    setFlippedCards((prev) => [...prev, card]);

    setCards((prevCards) =>
      prevCards.map((c) =>
        c.id === card.id ? { ...c, isFlipped: true } : c
      )
    );
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      setIsDisabled(true);
      setMoves((prev) => prev + 1);

      const [firstCard, secondCard] = flippedCards;

      if (firstCard.image === secondCard.image) {
        setMatchedPairs((prev) => prev + 1);

        setCards((prevCards) =>
          prevCards.map((c) =>
            c.image === firstCard.image
              ? { ...c, isMatched: true }
              : c
          )
        );
        setFlippedCards([]);
        setIsDisabled(false);
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((c) =>
              c.id === firstCard.id || c.id === secondCard.id
                ? { ...c, isFlipped: false }
                : c
            )
          );
          setFlippedCards([]);
          setIsDisabled(false);
        }, 1000);
      }
    }
  }, [flippedCards]);

  return (
    <div className="memory-game">
      <h1>Memory Game</h1>
      <p>Znalezione pary: {matchedPairs} / {cardImages.length}</p>
      <p>Liczba ruchów: {moves}</p>
      <div className="game-board">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`card ${card.isFlipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            {card.isFlipped || card.isMatched ? (
              <img src={`/src/assets/${card.image}`} alt="Card" />
            ) : (
              <div className="card-back"></div>
            )}
          </div>
        ))}
      </div>
      {matchedPairs === cardImages.length && (
        <div className="game-over">
          <h2>Gratulacje!</h2>
          <p>Ukończyłeś grę w {moves} ruchach.</p>
        </div>
      )}
    </div>
  );
};

export default MemoryGame;
