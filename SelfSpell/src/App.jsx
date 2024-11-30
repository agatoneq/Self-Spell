import Layout from '@components/Layout';
import {ThemeProvider} from '@components/ThemeProvider';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ThemeSwitcher from '@components/ThemeSwitcher' 
import ReflexGame from "./pages/ReflexGame";
import HobbyRecommendations from './pages/HobbyRecomendations'

function App() {

  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <Routes>
            <Route exact path="/reflexgame" element={<ReflexGame />} />
            <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
};

export default App
