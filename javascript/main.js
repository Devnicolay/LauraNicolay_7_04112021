import { recipes } from "./data_recipes/recipes_data.js";
import { Recipe } from "./recipes.js";
import { SearchBar } from "./search_bar.js";
import { Ingredient } from "./search_tags.js";
import { Appliance } from "./search_tags_appliances.js";
import { Ustensil } from "./search_tags_ustensils.js";

/**
 * Display all recipes when the page loads
 */
class HomePage {
  static initHomePage() {
    // Display recipes
    recipes.map((recipe) => {
      return new Recipe(recipe);
    });
    const searchBar = new SearchBar(recipes);
    new Ingredient(searchBar);
    new Appliance(searchBar);
    new Ustensil(searchBar);
  }
}

/**
 * loading home page
 */
window.onload = HomePage.initHomePage();
