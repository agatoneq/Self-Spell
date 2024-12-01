import Layout from '@components/Layout';
import { ThemeProvider } from '@components/ThemeProvider';
import { FontSizeProvider } from '@components/FontSizeProvider';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ReflexGame from "./pages/ReflexGame";
import HomePage from "./pages/home";
import HobbyRecommendations from './pages/HobbyRecomendations'
import HobbyDetails from './pages/hobbyDetails'
import Games from './pages/Games'
import PatienceGame from './pages/PatienceGame'
import MemoryGame from './pages/MemoryGame'

function App() {

  return (
    <ThemeProvider>
      <FontSizeProvider>
        <Router>
          <Layout>
            <Routes>
            <Route exact path="/games" element={<Games />} />
            <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
            <Route exact path="/hobby/:hobbyName" element={<HobbyDetails />} />
            <Route exact path="/reflexgame" element={<ReflexGame />} />
            <Route exact path="/patiencegame" element={<PatienceGame />} />
            <Route exact path="/memorygame" element={<MemoryGame />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout>
        </Router>
      </FontSizeProvider>
    </ThemeProvider>
  );
};

export default App
