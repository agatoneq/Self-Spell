import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import { AiOutlineClose } from "react-icons/ai"; // Dodaj ikonę "X"
import ThemeSwitcher from './ThemeSwitcher';
import FontSizeAdjuster from './FontSizeAdjuster';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4 relative z-50">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          {/* Przycisk otwierający menu */}
          <button
            className="md:hidden block focus:outline-none ml-4 mr-10"
            onClick={toggleMenu}
          >
            <CiMenuFries size={22} strokeWidth={2} />
          </button>
          <h1 className="text-xl font-bold mr-6">SelfSpell</h1>
          <FontSizeAdjuster />
          <ThemeSwitcher />
        </div>

        <nav
          className={`fixed top-0 left-0 h-full w-64 bg-state-blue-gradient transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'
            } transition-transform shadow-lg z-50`}
        >
          {/* Ikona zamknięcia (tylko na mobilnych) */}
          <div className="mb-14 w-full h-14">
            <button
              className="absolute top-4 right-4 text-white focus:outline-none md:hidden"
              onClick={toggleMenu}
            >
              <AiOutlineClose size={24} />
            </button>
          </div>
          {/* Flex column added for vertical alignment */}
          <ul className="flex flex-col space-y-8 p-4 text-left">
            <li>
              <Link
                to="/"
                className="hover:underline text-white"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li>
              <Link to="/games" className="hover:underline text-white" onClick={() => setIsMenuOpen(false)}>
                Gry
              </Link>
            </li>
            <li>
              <Link to="/hobbyrecomendations" className="hover:underline text-white" onClick={() => setIsMenuOpen(false)}>
                Polecane hobby
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
