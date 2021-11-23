import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const searchBar = document.getElementById("research");
const recipesCard = document.querySelectorAll("main article");

export class SearchBar {
  constructor(recipes) {
    this.initListeners(recipes);
  }

  /**
   * Listeners
   */
  initListeners() {
    searchBar.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 2) {
        this.recipesFilteredWithInput();
      } else {
        this.refreshRecipes();
      }
    });
  }

  /**
   * Create an array of recipe that matches with search field
   * Launch displayRecipesFiltered() with filtered recipes in parameter
   */
  recipesFilteredWithInput() {
    const valueInput = searchBar.value.toLowerCase();
    const recipesFiltered = [];
    for (let i = 0; i < recipes.length; i++) {
      const hasTheWantedName = recipes[i].name
        .toLowerCase()
        .includes(valueInput);
      const ingredients = recipes[i].ingredients;
      for (let i = 0; i < ingredients.length; i++) {
        const hasTheWantedIngredient = ingredients[i].ingredient
          .toLowerCase()
          .includes(valueInput);
        const hasTheWantedDescription = recipes[i].description
          .toLowerCase()
          .includes(valueInput);
        if (
          hasTheWantedName ||
          hasTheWantedIngredient ||
          hasTheWantedDescription
        ) {
          recipesFiltered.push(recipes[i]);
          this.displayRecipesFiltered(recipesFiltered);
        }
      }
    }
  }

  /**
   *
   * @param {array} recipesFiltered Recipes who match with search field
   * Display the recipes who match with search field
   *
   */
  displayRecipesFiltered(recipesFiltered) {
    // For each filtered recipes
    for (let i = 0; i < recipesFiltered.length; i++) {
      const recipesCard = document.querySelectorAll("main article"); // Recipes cards in the DOM
      /**
       * Filter with name of recipes
       */
      // give the name of filtered recipes
      const nameRecipesFiltered = recipesFiltered[i].name;
      // get the value of data-name of the recipes
      const nameRecipesCard = document.querySelectorAll(".name");
      for (let i = 0; i < nameRecipesCard.length; i++) {
        const nameValue = nameRecipesCard[i].getAttribute("data-name");
        // If the name of the filtered recipes is the same as the value of one of the recipes
        if (nameRecipesFiltered == nameValue) {
          // for each recipes cards in the DOM
          for (let i = 0; i < recipesCard.length; i++) {
            recipesCard[i].style.display = "block"; // display recipes
          }
        } else {
          recipesCard[i].style.display = "none"; // not display all the recipes cards in the DOM
        }
      }
      /**
       * Filter with ingredients of recipes
       */
      // give the ingredients of filtered recipes
      const ingredientRecipesFiltered = recipesFiltered[i].ingredients;
      // get the value of data-ingredient of the recipes
      const ingredientRecipesCard = document.querySelectorAll(".ingredient");
      for (let i = 0; i < ingredientRecipesCard.length; i++) {
        const ingredientValue =
          ingredientRecipesCard[i].getAttribute("data-ingredient");
        // If the ingredients of the filtered recipes is the same as the value of one of the recipes
        if (ingredientRecipesFiltered == ingredientValue) {
          recipesCard[i].style.display = "block"; // display recipes
        }
      }
      /**
       * Filter with description of recipes
       */
      // give the description of filtered recipes
      const descriptionRecipesFiltered = recipesFiltered[i].description;
      // get the value of data-description of the recipes
      const descriptionRecipesCard = document.querySelectorAll(".description");
      for (let i = 0; i < descriptionRecipesCard.length; i++) {
        const descriptionValue =
          descriptionRecipesCard[i].getAttribute("data-description");
        // If the description of the filtered recipes is the same as the value of one of the recipes
        if (descriptionRecipesFiltered == descriptionValue) {
          recipesCard[i].style.display = "block"; // display recipes
        }
      }
    }
  }

  refreshRecipes() {
    const recipesCard = document.querySelectorAll("main article"); // Recipes cards in the DOM
    // for each recipes cards in the DOM
    for (let i = 0; i < recipesCard.length; i++) {
      recipesCard[i].style.display = "block"; // display all the recipes cards in the DOM
    }
  }
}
