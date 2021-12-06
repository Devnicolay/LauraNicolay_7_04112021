import { recipes } from "./data_recipes/recipes_data.js";
import { Recipe } from "./recipes.js";
import { SearchBar } from "./search_bar.js";
import { Tags } from "./search_tags.js";

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

    let dataType = "";
    const chevronDownIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-down"
    );
    chevronDownIngredients.addEventListener("click", () => {
      dataType = "ingredients";
      new Tags(searchBar, dataType);
    });

    const chevronDownAppliances = document.querySelector(
      ".arrow-appliances .fa-chevron-down"
    );
    chevronDownAppliances.addEventListener("click", () => {
      dataType = "appliances";
      new Tags(searchBar, dataType);
    });

    const chevronDownUstensils = document.querySelector(
      ".arrow-ustensils .fa-chevron-down"
    );
    chevronDownUstensils.addEventListener("click", () => {
      dataType = "ustensils";
      new Tags(searchBar, dataType);
    });
  }
}

/**
 * loading home page
 */
window.onload = HomePage.initHomePage();
