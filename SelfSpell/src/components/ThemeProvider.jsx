import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line react-refresh/only-export-components
export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    // Pobierz motyw z localStorage lub ustaw domyślny
    return localStorage.getItem('theme') || 'dark';
  });

  useEffect(() => {
    // Aktualizuj `data-theme` na elemencie `html`
    document.documentElement.setAttribute('data-theme', theme);
    // Zapisz motyw w localStorage
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

ThemeProvider.propTypes = {
    children: PropTypes.node.isRequired, // 'children' to dowolny element React (tekst, komponenty, JSX, itp.)
  };