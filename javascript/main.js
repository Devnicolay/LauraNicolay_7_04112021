import { recipes } from "./data_recipes/recipes_data.js";
import { Recipe } from "./recipes.js";
import { SearchBar } from "./search_bar.js";
import { Tags } from "./search_tags.js";

/**
 * Display all recipes when the page loads
 */
export class HomePage {
  constructor() {
    this.initHomePage();
  }
  initHomePage() {
    // Display recipes
    const arrayOfRecipes = recipes.map((recipe) => {
      return new Recipe(recipe);
    });
    console.log(arrayOfRecipes);
    new SearchBar(arrayOfRecipes);

    let dataType = "";
    const chevronDownIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-down"
    );
    chevronDownIngredients.addEventListener("click", () => {
      dataType = "ingredients";
      new Tags(arrayOfRecipes, dataType);
    });
    const labelIngredients = document.querySelector("#label-ingredients");
    const inputIngredients = document.querySelector("#search-ingredients");
    labelIngredients.addEventListener("click", () => {
      labelIngredients.style.display = "none";
      inputIngredients.style.display = "block";
    });
    inputIngredients.addEventListener("blur", () => {
      inputIngredients.style.display = "none";
      labelIngredients.style.display = "block";
    });

    const chevronDownAppliances = document.querySelector(
      ".arrow-appliances .fa-chevron-down"
    );
    chevronDownAppliances.addEventListener("click", () => {
      dataType = "appliances";
      new Tags(arrayOfRecipes, dataType);
    });
    const labelAppliances = document.querySelector("#label-appliances");
    const inputAppliances = document.querySelector("#search-appliances");
    labelAppliances.addEventListener("click", () => {
      labelAppliances.style.display = "none";
      inputAppliances.style.display = "block";
    });
    inputAppliances.addEventListener("blur", () => {
      inputAppliances.style.display = "none";
      labelAppliances.style.display = "block";
    });

    const chevronDownUstensils = document.querySelector(
      ".arrow-ustensils .fa-chevron-down"
    );
    chevronDownUstensils.addEventListener("click", () => {
      dataType = "ustensils";
      new Tags(arrayOfRecipes, dataType);
    });
    const labelUstensils = document.querySelector("#label-ustensils");
    const inputUstensils = document.querySelector("#search-ustensils");
    labelUstensils.addEventListener("click", () => {
      labelUstensils.style.display = "none";
      inputUstensils.style.display = "block";
    });
    inputUstensils.addEventListener("blur", () => {
      inputUstensils.style.display = "none";
      labelUstensils.style.display = "block";
    });
  }
}

/**
 * loading home page
 */
window.onload = new HomePage();
