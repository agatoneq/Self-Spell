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

function App() {

  return (
    <ThemeProvider>
      <FontSizeProvider>
        <Router>
          <Layout>
            <Routes>
              <Route exact path="/reflexgame" element={<ReflexGame />} />
              <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
              <Route path="/" element={<HomePage />} />
            </Routes>
          </Layout>
        </Router>
      </FontSizeProvider>
    </ThemeProvider>
  );
};

export default App
