import { useNavigate } from "react-router-dom";
import "../styles/Games.css";
import { useContext } from 'react';
import { useFontSize } from "@components/FontSizeProvider";
import { ThemeContext } from '@components/ThemeProvider'; // Upewnij się, że ścieżka jest poprawna
import ButtonBasic from "@components/ButtonBasic";

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
      classNameBgImg: "bg-reflex-bg-image",
      classNameImg: "bg-reflex-image",
    },
    {
      id: "memory",
      title: "Test na Pamięć",
      description: "Sprawdź, jak dobrze zapamiętujesz różne wzory i sekwencje.",
      route: "/memorygame",
      classNameBgImg: "bg-memory-bg-image",
      classNameImg: "bg-memory-image",
    },
    {
      id: "patience",
      title: "Test na Cierpliwość",
      description: "Przekonaj się, jak dobrze radzisz sobie z zadaniami wymagającymi skupienia.",
      route: "/patiencegame",
      classNameBgImg: "bg-patience-bg-image",
      classNameImg: "bg-patience-image",
    },

  ];

  return (
    <div className="game-selection mb-10">
      <h1 className="text-2xl font-bold mb-4 mt-3">Wybierz grę</h1>

      <p className={`text-lg mx-3 mb-6 ${theme === 'dark' ? 'text-white' : 'text-black'}`} style={{ fontSize: `${fontSize}px` }}>
        To jest strona główna. Znajdziesz tutaj najważniejsze informacje o naszej aplikacji.
      </p>
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id} className="game-card">
            <div className="relative flex items-center justify-center h-64">
                <div className={` w-full h-full flex items-center justify-center ${game.classNameBgImg}`}>
                    <div className={` h-full w-28 ${game.classNameImg}`}>
                    </div>
                </div>
            </div>
            <h2  style={{ fontSize: `${fontSize}px` }} className="text-palatinete">{game.title}</h2>
            <p  style={{ fontSize: `${fontSize}px` }}>{game.description}</p> 
            <ButtonBasic text="Zagraj" onClick={() => navigate(game.route)} />

          </div>
        ))}
      </div>
    </div>
  );
};

export default Games;
