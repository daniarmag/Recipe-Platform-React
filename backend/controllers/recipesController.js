import {firebase, db, storage} from '../fireBase.js';
import Recipe from '../models/Recipe.js';
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
  getFirestore,
  collection,
  doc,
  addDoc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';


class RecipeController {
  async createRecipe(req, res) {
    try {
      const { name, description, ingredients, image, calories, fat, proteins,  ...rest } = req.body;

      let imageUrl = '';

      // Check if there's an image file
      if (image) {
        // Extract content type and base64 data from the image string
        const matches = image.match(/^data:(.+);base64,(.*)$/);
        if (!matches || matches.length !== 3) {
            return res.status(400).send('Invalid base64 image data');
        }

        const mimeType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, 'base64');

        const filename = `${name}-${Date.now()}`;
        const storageRef = ref(storage, `recipeImages/${filename}`);
        
        // Upload the image buffer to Firebase Storage
        const snapshot = await uploadBytes(storageRef, buffer, { contentType: mimeType });
        imageUrl = await getDownloadURL(snapshot.ref);
      }

      // Split ingredients by newline and trim each ingredient
      const ingredientsArray = ingredients.split('\n').map(ingredient => ingredient.trim());
  
      const nutritionalValues = { calories, fat, proteins };

      // Prepare the new recipe data with the image URL
      const newData = {
        name,
        description,
        ingredients: ingredientsArray,
        nutritionalValues,
        image: imageUrl,
        ...rest
      };
  
      await setDoc(doc(collection(db, 'recipe'), name), newData);
      res.status(200).send('Recipe created successfully');
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  async getRecipes(req, res) {
    try {
      const { searchQuery } = req.query;
      const recipesSnapshot = await getDocs(collection(db, 'recipe'));
      let recipeArray = [];
      let recipe;
      if (recipesSnapshot.empty) {
        console.error('No Recipes found');
        res.status(400).send('No Recipes found');
      } else {
        recipesSnapshot.forEach((doc) => {
          recipe = new Recipe(
            doc.id,
            doc.data().author,
            doc.data().name,
            doc.data().description,
            doc.data().ingredients,
            doc.data().preparation,
            doc.data().nutritionalValues,
            // doc.data().calories,
            // doc.data().fat,
            // doc.data().protein,
            doc.data().image,
          );
          recipeArray.push(recipe);
        });
        if (searchQuery) {
          recipeArray = recipeArray.filter((recipe) => 
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
          );
          
        }
        res.status(200).send(recipeArray);
      }
    } catch (error) {
      console.error(error.message);
      res.status(400).send(error.message);
    }
  }

  async getRecipe(req, res) {
    try {
      const { id } = req.params;
      const recipeDoc = await getDoc(doc(db, 'recipe', id));

      if (!recipeDoc.exists()) {
        res.status(404).send('Recipe not found');
      } else {
        const recipe = {
          id: recipeDoc.id,
          ...recipeDoc.data(),
        };

        res.status(200).send(recipe);
      }
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async updateRecipe(req, res) {
    try {
      const { id } = req.params;
      const { nameUser, nameRecipe, description, ingredients, preparation, calories, fat, protein, imageUrl } = req.body;

      // Add your validation logic here if needed

      const recipeRef = doc(db, 'recipe', id);
      await updateDoc(recipeRef, {
        nameUser,
        nameRecipe,
        description,
        ingredients,
        preparation,
        calories,
        fat,
        protein,
        imageUrl,
      });

      res.status(200).send({ id, message: 'Recipe updated successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

  async deleteRecipe(req, res) {
    try {
      const { id } = req.params;

      const recipeRef = doc(db, 'recipe', id);
      await deleteDoc(recipeRef);

      res.status(200).send({ id, message: 'Recipe deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  }

}

export default new RecipeController();
