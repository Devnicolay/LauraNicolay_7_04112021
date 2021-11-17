import { recipes } from "./data_recipes/recipes_data.js";
import { Recipes } from "./recipes.js";
import { SearchBar } from "./search_bar.js";
import { Ingredients } from "./search_ingredients.js";

/**
 * Display all recipes when the page loads
 */
class HomePage {
  static initHomePage() {
    // Display recipes
    recipes.forEach((recipe) => {
      new Recipes(recipe);
      new SearchBar(recipe);
    });
  }
}

/**
 * loading home page
 */
window.onload = HomePage.initHomePage();
