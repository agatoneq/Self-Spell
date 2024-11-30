import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import UserFeatures from './pages/UserFeatures.jsx'
import HobbyRecommendations from './pages/HobbyRecomendations.jsx'
import './styles/hobby-recommendations.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <UserFeatures />
  </StrictMode>,
)