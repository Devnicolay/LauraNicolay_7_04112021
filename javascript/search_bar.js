import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const searchBar = document.getElementById("research");
const recipesCard = document.querySelectorAll("main article");

export class SearchBar {
  constructor(recipes) {
    this.recipes = recipes;
    this.name = recipes.name;
    this.ingredients = recipes.ingredients;
    this.description = recipes.description;
    this.initListeners(recipes);
  }

  /**
   * Listeners
   */
  initListeners() {
    searchBar.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        this.recipesFilteredWithInput();
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
      if (hasTheWantedName) {
        recipesFiltered.push(recipes[i]);
        this.displayRecipesFiltered(recipesFiltered);
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
      // for each recipes cards in the DOM
      for (let i = 0; i < recipesCard.length; i++) {
        recipesCard[i].style.display = "none"; // not display all the recipes cards in the DOM
      }
      // give the name of filtered recipes
      const nameRecipesFiltered = recipesFiltered[i].name;
      // get the value of data-name of the recipes
      const nameRecipesCard = document.querySelectorAll(".name");
      for (let i = 0; i < nameRecipesCard.length; i++) {
        const nameValue = nameRecipesCard[i].getAttribute("data-name");
        // If the name of the filtered recipes is the same as the value of one of the recipes
        if (nameRecipesFiltered == nameValue) {
          recipesCard[i].style.display = "block";
        }
      }
    }
  }
}
