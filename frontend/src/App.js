import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import Home from './pages/Home';

import MealPlanner from './pages/MealPlanner';
import Footer from './components/Footer';
import CreateNewRecipe from './components/NewRecipeForm';


function App() {
  return (
  <BrowserRouter>
 
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/meal-planner" element={<MealPlanner />} />
      <Route path="/new-recipe" element={<CreateNewRecipe/>} />

    </Routes>
    <Footer/>
  </BrowserRouter>

  );
}

export default App;
