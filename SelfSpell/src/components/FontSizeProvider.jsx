import { createContext, useContext, useState } from 'react';
import PropTypes from 'prop-types';

const FontSizeContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useFontSize = () => useContext(FontSizeContext);

export const FontSizeProvider = ({ children }) => {
  const [fontSize, setFontSize] = useState(16);

  const largeFontSize = () => setFontSize(16);
  const mediumFontSize = () => setFontSize(20);
  const sallFontSize = () => setFontSize(30);

  return (
    <FontSizeContext.Provider value={{ fontSize, largeFontSize, mediumFontSize, sallFontSize }}>
      {children}
    </FontSizeContext.Provider>
  );
};

// Dodanie PropTypes
FontSizeProvider.propTypes = {
  children: PropTypes.node.isRequired, // 'children' to dowolny element React (tekst, komponenty, JSX, itp.)
};
