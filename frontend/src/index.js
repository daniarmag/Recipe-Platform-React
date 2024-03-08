import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { PlannerProvider } from './context/PlannerContext';
import { RecipesProvider } from './context/RecipesContext';
import { BrowserRouter } from 'react-router-dom';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <RecipesProvider>
        <PlannerProvider>
          <App />
        </PlannerProvider>
      </RecipesProvider>
    </BrowserRouter>
  </React.StrictMode>
);


