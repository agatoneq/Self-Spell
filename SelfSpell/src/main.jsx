import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './styles/hobby-recommendations.css'
import ChatGPTPrompt from './pages/testing_chat.jsx'

const userFeatures = [0.8, 0.4, 0.1]; // Replace with the user's actual features
const userAge = 25;

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChatGPTPrompt/>
  </StrictMode>,
)