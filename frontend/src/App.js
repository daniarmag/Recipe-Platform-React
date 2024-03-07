import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {BrowserRouter, Route, Routes, Switch} from 'react-router-dom';
import LoginPage from './pages/Login';
import Home from './pages/Home';
import MealPlannerPage from './pages/MealPlanner';
import AddRecipePage  from './pages/AddRecipe';


import Footer from './components/Footer';


import CreateNewRecipe from './components/NewRecipeForm';





function App() {
  return (
  <BrowserRouter>
 
    <Navbar/>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/home-page" element={<Home />} />
      <Route path="/meal-planner" element={<MealPlannerPage />} />
      <Route path="/new-recipe" element={<AddRecipePage/>} />

    </Routes>
    <Footer/>
  </BrowserRouter>

  );
}

export default App;
