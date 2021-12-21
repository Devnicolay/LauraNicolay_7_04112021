import { recipes } from "./data_recipes/recipes_data.js";
import { Recipe } from "./recipes.js";
import { Dropdown } from "./dropdown.js";
import { Search } from "./search.js";

const ingredients = new Set();
const appliances = new Set();
const ustensils = new Set();

/**
 * Display all recipes when the page loads
 */
export class HomePage {
  constructor() {
    this.selectedTags = new Set();
    this.initHomePage();
  }

  /**
   * create array of ingredients, array of appliances and array of ustensils
   */
  initHomePage() {
    // Display all recipes
    recipes.forEach((recipe) => {
      new Recipe(recipe);
    });

    // Generate array of ingredients, array of appliances and array of ustensils
    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredients.add(ingredient.ingredient);
      });
      appliances.add(recipe.appliance);
      recipe.ustensils.forEach((ustensil) => {
        ustensils.add(ustensil);
      });
    });

    // Part dropdowns
    let dataTypeDropdown = "";
    const searchBar = new Search(recipes, dataTypeDropdown, this.selectedTags);
    const chevronDownIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-down"
    );
    chevronDownIngredients.addEventListener("click", () => {
      dataTypeDropdown = "ingredients";
      this.newDropdown(dataTypeDropdown, searchBar);
    });
    const inputIngredients = document.querySelector("#search-ingredients");
    inputIngredients.addEventListener("click", () => {
      dataTypeDropdown = "ingredients";
      this.newDropdown(dataTypeDropdown, searchBar);
    });
    const chevronDownAppliances = document.querySelector(
      ".arrow-appliances .fa-chevron-down"
    );
    chevronDownAppliances.addEventListener("click", () => {
      dataTypeDropdown = "appliances";
      this.newDropdown(dataTypeDropdown, searchBar);
    });
    const inputAppliances = document.querySelector("#search-appliances");
    inputAppliances.addEventListener("click", () => {
      dataTypeDropdown = "appliances";
      this.newDropdown(dataTypeDropdown, searchBar);
    });
    const chevronDownUstensils = document.querySelector(
      ".arrow-ustensils .fa-chevron-down"
    );
    chevronDownUstensils.addEventListener("click", () => {
      dataTypeDropdown = "ustensils";
      this.newDropdown(dataTypeDropdown, searchBar);
    });
    const inputUstensils = document.querySelector("#search-ustensils");
    inputUstensils.addEventListener("click", () => {
      dataTypeDropdown = "ustensils";
      this.newDropdown(dataTypeDropdown, searchBar);
    });
  }

  /**
   *
   * @param {string} dataTypeDropdown Data type of dropdown
   * @param {instance} searchBar Instance of SearchBar
   * Instance of Dropdown
   */
  newDropdown(dataTypeDropdown, searchBar) {
    new Dropdown(
      dataTypeDropdown,
      Array.from(dataTypeDropdown),
      this.selectedTags,
      searchBar
    );
  }
}

/**
 * loading home page
 */
window.onload = new HomePage();
