import Navbar from './components/Navbar';
import Footer from './components/Footer';
import MainContent from './components/MainContent';
import './App.css'
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ReflexGame from "./pages/ReflexGame";
import HobbyRecommendations from './pages/HobbyRecomendations'

function App() {

  return (
    <>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <MainContent />
        <Footer />
      </div>

      <Router>
        <Routes>
          <Route exact path="/reflexgame" element={<ReflexGame />} />
          <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
        </Routes>
      </Router>
    </>

  );
};

export default App
