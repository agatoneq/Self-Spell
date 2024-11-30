import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import ThemeSwitcher from '@components/ThemeSwitcher';
import { FontSizeProvider, useFontSize } from '@components/FontSizeProvider';
import FontSizeAdjuster from '@components/FontSizeAdjuster';

function Content() {
  const { fontSize } = useFontSize();

  return (
    <div>
      <h1 className="text-4xl text-white font-bold" style={{ fontSize: `${fontSize}px` }}>
        Hello, Tailwind CSS!
      </h1>
      <ThemeSwitcher toggle={true} />
      <a href="https://vite.dev" target="_blank">
        <img src={viteLogo} className="logo" alt="Vite logo" />
      </a>
      <a href="https://react.dev" target="_blank">
        <img src={reactLogo} className="logo react" alt="React logo" />
      </a>
    </div>
  );
}

function App() {
  const [count, setCount] = useState(0);

  return (
    <FontSizeProvider>
      <FontSizeAdjuster />
      <Content />
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </FontSizeProvider>
  );
}

export default App;
