import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from "react-router-dom";
import { injectSpeedInsights } from '@vercel/speed-insights';
import './index.css'
import "swiper/css";
import "swiper/css/navigation";
import App from './App.jsx'
import { AuthProvider } from './context/AuthContext.jsx';

// Inject Speed Insights for performance monitoring
injectSpeedInsights();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>
);
