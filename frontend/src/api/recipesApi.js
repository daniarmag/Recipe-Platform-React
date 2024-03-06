import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebaseConfig";

export async function getRecipesFromDB () {
    let recipes = [];
    const recipesCollection = collection(db, 'recipe');
    const querySnapshot = await getDocs(recipesCollection)
    querySnapshot.forEach(doc => {
        const recipe = doc.data(); // Get the data of the recipe document

        // Push each recipe into the recipes array
        recipes.push(recipe);
        console.log(recipe)
    });
    return recipes;
}