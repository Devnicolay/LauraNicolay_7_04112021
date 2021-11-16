import { recipes } from "./data_recipes/recipes_data.js";
import { Recipes } from "./recipes.js";

/**
 * Display all recipes when the page loads
 */
class HomePage {
  static initHomePage() {
    recipes.forEach((recipe) => {
      console.log(recipe);
      new Recipes(recipe);
    });
  }
}

/**
 * loading home page
 */
window.onload = HomePage.initHomePage();
