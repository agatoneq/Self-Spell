import { useFontSize } from './FontSizeProvider';

const FontSizeAdjuster = () => {
  const { largeFontSize, mediumFontSize, sallFontSize } = useFontSize();

  return (
    <div className="flex items-center mr-5">
      <button
        onClick={largeFontSize}
        className=""
      >
        A
      </button>
      <button
        onClick={mediumFontSize}
        className="text-2xl ml-3 mr-3"
      >
        A
      </button>
      <button
        onClick={sallFontSize}
        className="text-3xl"
      >
        A
      </button>
    </div>
  );
};

export default FontSizeAdjuster;
