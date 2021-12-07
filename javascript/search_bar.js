import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const searchBar = document.getElementById("research");

export class SearchBar {
  constructor(recipes) {
    this.recipes = recipes;
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    searchBar.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        this.recipesFilteredWithInput();
      } else {
        this.displayAllRecipes();
      }
    });
  }

  /**
   * Create an array of recipe that matches with search field
   * Launch displayRecipesFiltered() with filtered recipes in parameter
   */
  recipesFilteredWithInput() {
    let arrayOfRecipesFiltered = [];
    const valueInput = searchBar.value.toLowerCase();
    for (let i = 0; i < recipes.length; i++) {
      const recipeDom = document.querySelector(
        `article[data-id="${recipes[i].id}"]`
      );
      const hasTheWantedName = recipes[i].name
        .toLowerCase()
        .includes(valueInput);
      const hasTheWantedDescription = recipes[i].description
        .toLowerCase()
        .includes(valueInput);

      const ingredients = recipes[i].ingredients;

      let hasTheWantedIngredient = false;
      for (let j = 0; j < ingredients.length; j++) {
        const searchedFound = ingredients[j].ingredient
          .toLowerCase()
          .includes(valueInput);
        if (searchedFound) {
          hasTheWantedIngredient = true;
        }
      }

      if (
        hasTheWantedName ||
        hasTheWantedIngredient ||
        hasTheWantedDescription
      ) {
        recipeDom.style.display = "block";
        arrayOfRecipesFiltered.push(recipeDom);
      } else {
        recipeDom.style.display = "none";
      }
    }
  }

  /**
   * Display all recipes when the value of search input is less than 3 caracters
   */
  displayAllRecipes() {
    for (let i = 0; i < recipes.length; i++) {
      const recipeDom = document.querySelector(
        `article[data-id="${recipes[i].id}"]`
      );
      recipeDom.style.display = "block";
    }
  }
}
