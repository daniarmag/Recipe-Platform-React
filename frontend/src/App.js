import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar';
import {Navigate, Route, Routes} from 'react-router-dom';
import Home from './pages/Home';
import MealPlannerPage from './pages/MealPlanner';
import AddRecipePage  from './pages/AddRecipe';
import AuthPage from './pages/Auth';

import Footer from './components/Footer';
import { useAuth } from './context/AuthContext';
import LoadingSpinner from './components/LoadingSpinner';
import EditRecipePage from './pages/EditRecipe';


function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <>
      <Navbar/>
      
      <Routes>
        {user ? (
          <>
            <Route path="/" element={<Home />} />
            <Route path="/meal-planner" element={<MealPlannerPage />} />
            <Route path="/new-recipe" element={<AddRecipePage />} />
            <Route path="/edit/:recipeId" element={<EditRecipePage />} />
          </>
        ) : (
          <Route path="/" element={<AuthPage />} />
        )}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      <Footer/>
    </>
  );
}

export default App;
