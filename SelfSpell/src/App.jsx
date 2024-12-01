import Layout from '@components/Layout';
import {ThemeProvider} from '@components/ThemeProvider';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ReflexGame from "./pages/ReflexGame";
import HobbyRecommendations from './pages/HobbyRecomendations'
<<<<<<< HEAD
import Games from './pages/Games'
=======
<<<<<<< Updated upstream
=======
import Games from './pages/Games'
import PatienceGame from './pages/PatienceGame'
import MemoryGame from './pages/MemoryGame'
>>>>>>> Stashed changes
>>>>>>> agatoneq

function App() {

  return (
    <ThemeProvider>
      <Router>
<<<<<<< HEAD
=======
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
>>>>>>> agatoneq
        <Layout>
          <Routes>
            <Route exact path="/games" element={<Games />} />
            <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
            <Route exact path="/reflexgame" element={<ReflexGame />} />
<<<<<<< HEAD
=======
            <Route exact path="/patiencegame" element={<PatienceGame />} />
            <Route exact path="/memorygame" element={<MemoryGame />} />
>>>>>>> agatoneq
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};
<<<<<<< HEAD
=======
>>>>>>> Stashed changes
>>>>>>> agatoneq

export default App
