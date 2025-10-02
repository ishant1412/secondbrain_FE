import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
 // Defaults to weight 400
// or if you want specific weights
import '@fontsource/poppins/400.css';
import '@fontsource/poppins/700.css';


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
