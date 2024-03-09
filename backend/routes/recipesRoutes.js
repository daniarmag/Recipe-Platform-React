import express from 'express';
const router = express.Router();
import RecipeController from '../controllers/recipesController.js';

// Routes for CRUD operations
router.post('/recipes', RecipeController.createRecipe);
router.get('/recipes', RecipeController.getRecipes);
router.get('/recipes/:id', RecipeController.getRecipe);
router.put('/recipes/:id', RecipeController.updateRecipe);
router.delete('/recipes/:id', RecipeController.deleteRecipe);


export default router;
