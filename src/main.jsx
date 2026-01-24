import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './shared/styles/index.css'
import App from './app/App.jsx'

// Disable console logs in production
if (import.meta.env.PROD) {
  const nullFunc = () => { };
  console.log = nullFunc;
  console.info = nullFunc;
  console.warn = nullFunc;
  console.error = nullFunc;
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
