class Recipe {
    constructor(id, author, name, description, ingredients, preparation, nutritionalValues , image) {
  
      this.id = id;
      this.author = author || '';
      this.name = name || '';
      this.description = description || '';
      this.ingredients = ingredients || '';
      this.preparation = preparation || '';
      this.nutritionalValues = nutritionalValues || {calories: 0, fat: 0, proteins: 0};
      this.image = image || '';
    }
  
    // You can add methods or additional properties as needed
  }
  
  export default Recipe;