import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { VaribalesContexto } from './contexto/Contexto'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
        <VaribalesContexto>
            <App />
        </VaribalesContexto>
    </BrowserRouter>
  </StrictMode>,
)
