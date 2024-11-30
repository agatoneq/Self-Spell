import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import ReactDOM from 'react-dom';
import UserFeatures from './UserFeatures';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
    <UserFeatures />
  </StrictMode>,
)