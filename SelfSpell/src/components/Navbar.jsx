import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-blue-500 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">Moja Aplikacja</h1>
        <button
          className="md:hidden block focus:outline-none"
          onClick={toggleMenu}
        >
          <span className="material-icons">menu</span>
        </button>
        <nav
          className={`fixed top-0 left-0 h-full bg-blue-600 w-64 transform ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          } transition-transform md:static md:translate-x-0 md:flex`}
        >
          <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4 p-4 md:p-0">
            <li>
              <a href="#home" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#about" className="hover:underline">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:underline">
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
