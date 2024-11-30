import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FontSizeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const increaseFontSize = () => setFontSize(prev => prev + 20);
  const decreaseFontSize = () => setFontSize(prev => Math.max(prev - 20, 8));

  return (
    <FontSizeContext.Provider value={{ fontSize, increaseFontSize, decreaseFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

// Dodanie PropTypes
FontSizeProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' to dowolny element React (tekst, komponenty, JSX, itp.)
};
