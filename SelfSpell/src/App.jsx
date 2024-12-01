import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeSwitcher from '@components/ThemeSwitcher' 
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ReflexGame from "./pages/ReflexGame";
import HobbyRecommendations from './pages/HobbyRecomendations'
<<<<<<< Updated upstream
=======
import Games from './pages/Games'
import PatienceGame from './pages/PatienceGame'
import MemoryGame from './pages/MemoryGame'
>>>>>>> Stashed changes

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
<<<<<<< Updated upstream
            <Routes>
                <Route exact path="/reflexgame" element={<ReflexGame />} />
                <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
            </Routes>
        </Router>
    </>
  )
}
=======
        <Layout>
          <Routes>
            <Route exact path="/games" element={<Games />} />
            <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
            <Route exact path="/reflexgame" element={<ReflexGame />} />
            <Route exact path="/patiencegame" element={<PatienceGame />} />
            <Route exact path="/memorygame" element={<MemoryGame />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};
>>>>>>> Stashed changes

export default App