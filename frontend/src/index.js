import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PlannerProvider } from './context/PlannerContext';
import { RecipesProvider } from './context/RecipesContext';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <RecipesProvider>
          <PlannerProvider>
          <ThemeProvider>
              <App />
          </ThemeProvider>
          </PlannerProvider>
        </RecipesProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);


