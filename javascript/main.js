import { recipes } from "./data_recipes/recipes_data.js";
import { Recipe } from "./recipes.js";
import { SearchBar } from "./search_bar.js";
import { Tags } from "./search_tags.js";

/**
 * Display all recipes when the page loads
 */
export class HomePage {
  constructor(recipesFiltered) {
    this.recipesFiltered = recipesFiltered;
    console.log(this.recipesFiltered);
    this.initHomePage();
  }
  initHomePage() {
    let theRecipes = this.recipesFiltered;
    console.log(theRecipes);
    if (theRecipes == undefined) {
      theRecipes = recipes;
    }
    console.log(theRecipes);
    // Display recipes
    recipes.map((recipe) => {
      return new Recipe(recipe);
    });
    new SearchBar(recipes);

    let dataType = "";
    const chevronDownIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-down"
    );
    console.log(theRecipes);
    chevronDownIngredients.addEventListener("click", () => {
      dataType = "ingredients";
      console.log(theRecipes);
      new Tags(theRecipes, dataType);
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
      new Tags(theRecipes, dataType);
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
      new Tags(theRecipes, dataType);
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
