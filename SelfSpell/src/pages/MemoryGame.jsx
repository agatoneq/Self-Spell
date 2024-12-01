import { useState, useEffect } from "react";
import "../styles/MemoryGame.css";
import ButtonBasic from "@components/ButtonBasic";
import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";

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

  const featureWeights = [
    0.1, -0.3, 0.2, -0.5, 0.3, -0.2, 0.4, 0.1, -0.4, 0.3,
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

  useEffect(() => {
    if (matchedPairs === cardImages.length) {
      // Adjust the user's features when the game is complete
      const updateUserFeatures = () => {
        const userFeatures = JSON.parse(localStorage.getItem("userFeatures"));
        if (!userFeatures || userFeatures.length !== 10) {
          console.error("Invalid user features in localStorage");
          return;
        }

        const newFeatures = userFeatures.map((feature, index) => {
          // Use the current index to get the corresponding feature weight
          const newFeature = feature - (moves - 10) * 0.1 * featureWeights[index];

          // Ensure the feature stays within the range [-1, 1]
          return Math.max(Math.min(newFeature, 1), -1);
        });

        // Save updated features back to localStorage
        localStorage.setItem("userFeatures", JSON.stringify(newFeatures));
        console.log("Updated user features:", newFeatures);
      };

      updateUserFeatures();
    }
  }, [matchedPairs, moves]);

  const navigate = useNavigate();


  return (
    <div className="memory-game">
      <div className=" w-full flex justify-start">
        <button
          className="focus:outline-none"
          onClick={() => navigate("/games")}
        >
          <FaArrowLeft size={24} />
        </button>
      </div>
      <h1>Gra memory</h1>
      <p>Znalezione pary: {matchedPairs} / {cardImages.length}</p>
      <p>Liczba ruchów: {moves}</p>
      <div className="game-board ">
        {cards.map((card) => (
          <div
            key={card.id}
            className={`m-auto card ${card.isFlipped ? "flipped" : ""}`}
            onClick={() => handleCardClick(card)}
          >
            {card.isFlipped || card.isMatched ? (
              <img src={`/src/assets/${card.image}`} alt="Card" />
            ) : (
              <div className="card-back bg-rebeca-pupple"></div>
            )}
          </div>
        ))}
      </div>
      {matchedPairs === cardImages.length && (
        <div className="game-over">
          <h2>Gratulacje!</h2>
          <p className="pb-5">Ukończyłeś grę w {moves} ruchach.</p>
          <ButtonBasic text="Zobacz rekomendowane hobby" onClick={() => navigate("/hobbyrecomendations")} />

        </div>
      )}
    </div>
  );
};

export default MemoryGame;
