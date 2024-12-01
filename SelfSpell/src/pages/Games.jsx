import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Games.css";

const Games = () => {
  const navigate = useNavigate();

  const games = [
    {
      id: "reflex",
      title: "Test na Refleks",
      description: "Sprawdź, jak szybko potrafisz reagować na zmieniające się kształty.",
      route: "/reflexgame",
    },
    {
      id: "patience",
      title: "Test na Cierpliwość",
      description: "Przekonaj się, jak dobrze radzisz sobie z zadaniami wymagającymi skupienia.",
      route: "/patiencegame",
    },
    {
      id: "memory",
      title: "Test na Pamięć",
      description: "Sprawdź, jak dobrze zapamiętujesz różne wzory i sekwencje.",
      route: "/memorygame",
    },
  ];

  return (
    <div className="game-selection">
      <h1>Wybierz grę</h1>
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <h2>{game.title}</h2>
            <p>{game.description}</p>
            <button onClick={() => navigate(game.route)}>Zagraj</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
