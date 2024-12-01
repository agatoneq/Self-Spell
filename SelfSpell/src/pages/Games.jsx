import { useNavigate } from "react-router-dom";
import "../styles/Games.css";
import { useContext } from 'react';
import { useFontSize } from "@components/FontSizeProvider";
import { ThemeContext } from '@components/ThemeProvider'; // Upewnij się, że ścieżka jest poprawna

const Games = () => {
  const navigate = useNavigate();
  const { theme } = useContext(ThemeContext); // Pobieramy aktualny motyw z kontekstu
  const { fontSize } = useFontSize(); // Pobieramy dynamiczny rozmiar czcionki

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
      <h1 className="text-2xl font-bold mb-4 mt-3">Wybierz grę</h1>

      <p className={`text-lg mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontSize: `${fontSize}px` }}>
        To jest strona główna. Znajdziesz tutaj najważniejsze informacje o naszej aplikacji.
      </p>
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
