import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ThemeSwitcher from '@components/ThemeSwitcher' 
import ReflexGame from "./pages/ReflexGame";
import HobbyRecommendations from './pages/HobbyRecomendations'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Router>
            <Routes>
                <Route exact path="/reflexgame" element={<ReflexGame />} />
                <Route exact path="/hobbyrecomendations" element={<HobbyRecommendations />} />
            </Routes>
        </Router>
    </>
  )
}

export default App