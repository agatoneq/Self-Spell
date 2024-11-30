import { useFontSize } from './FontSizeProvider';

const FontSizeAdjuster = () => {
  const { fontSize, increaseFontSize, decreaseFontSize } = useFontSize();

  return (
    <div className="flex items-center space-x-4">
      <button
        onClick={decreaseFontSize}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Zmniejsz czcionkę
      </button>
      <span className="text-lg">Rozmiar czcionki: {fontSize}px</span>
      <button
        onClick={increaseFontSize}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        Zwiększ czcionkę
      </button>
    </div>
  );
};

export default FontSizeAdjuster;
