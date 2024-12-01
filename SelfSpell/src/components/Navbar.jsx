import { useState } from 'react';
import { Link } from 'react-router-dom';
import { CiMenuFries } from "react-icons/ci";
import ThemeSwitcher from './ThemeSwitcher';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">SelfSpell</h1>
        <div className="flex items-center space-x-4">
          {/* Przycisk zmiany motywu */}
          <ThemeSwitcher />
          {/* Przycisk rozwijania menu */}
          <button
            className="md:hidden block focus:outline-none"
            onClick={toggleMenu}
          >
            <CiMenuFries size={22} strokeWidth={2} />
          </button>
        </div>
        <nav
          className={`fixed top-0 left-0 h-full bg-blue-600 w-64 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform md:static md:translate-x-0 md:flex`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0">
            <li>
              <Link to="/" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/games" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Gry
              </Link>
            </li>
            <li>
              <Link to="/hobbyrecomendations" className="hover:underline" onClick={() => setIsMenuOpen(false)}>
                Hobby Recommendations
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
