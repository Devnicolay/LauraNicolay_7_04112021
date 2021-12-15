import { recipes } from "./data_recipes/recipes_data.js";
import { Recipe } from "./recipes.js";
import { Dropdown } from "./dropdown.js";
import { Search } from "./searchBar.js";

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
      new Dropdown(
        dataTypeDropdown,
        Array.from(ingredients),
        this.selectedTags,
        searchBar
      );
    });
    const chevronDownAppliances = document.querySelector(
      ".arrow-appliances .fa-chevron-down"
    );
    chevronDownAppliances.addEventListener("click", () => {
      dataTypeDropdown = "appliances";
      new Dropdown(
        dataTypeDropdown,
        Array.from(appliances),
        this.selectedTags,
        searchBar
      );
    });
    const chevronDownUstensils = document.querySelector(
      ".arrow-ustensils .fa-chevron-down"
    );
    chevronDownUstensils.addEventListener("click", () => {
      dataTypeDropdown = "ustensils";
      new Dropdown(
        dataTypeDropdown,
        Array.from(ustensils),
        this.selectedTags,
        searchBar
      );
    });

    // Part label / input dropdowns
    // Ingredients
    const labelIngredient = document.querySelector("#label-ingredients");
    const inputIngredient = document.querySelector("#search-ingredients");
    labelIngredient.addEventListener("click", () => {
      dataTypeDropdown = "ingredients";
      this.displayInput(labelIngredient, inputIngredient, dataTypeDropdown);
    });
    inputIngredient.addEventListener("blur", () => {
      this.undisplayInput(labelIngredient, inputIngredient);
    });
    // Appliances
    const labelAppliance = document.querySelector("#label-appliances");
    const inputAppliance = document.querySelector("#search-appliances");
    labelAppliance.addEventListener("click", () => {
      dataTypeDropdown = "appliances";
      this.displayInput(labelAppliance, inputAppliance, dataTypeDropdown);
    });
    inputAppliance.addEventListener("blur", () => {
      this.undisplayInput(labelAppliance, inputAppliance);
    });
    // Ustensils
    const labelUstensil = document.querySelector("#label-ustensils");
    const inputUstensil = document.querySelector("#search-ustensils");
    labelUstensil.addEventListener("click", () => {
      dataTypeDropdown = "ustensils";
      this.displayInput(labelUstensil, inputUstensil, dataTypeDropdown);
    });
    inputUstensil.addEventListener("blur", () => {
      this.undisplayInput(labelUstensil, inputUstensil);
    });
  }

  /**
   * Display input when click on word of type list in button
   */
  displayInput(label, input, dataTypeDropdown) {
    label.style.display = "none";
    input.style.display = "block";
    this.initListenersInputDropdown(input, dataTypeDropdown);
  }

  /**
   * Undisplay input when quite input focus
   */
  undisplayInput(label, input) {
    input.style.display = "none";
    label.style.display = "block";
  }

  /**
   * Listeners of inputs dropdowns
   */
  initListenersInputDropdown(input, dataTypeDropdown) {
    input.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        const searchBar = document.getElementById(`search-${dataTypeDropdown}`);
        const valueInput = searchBar.value.toLowerCase();
        const ul = document.querySelector(`.nav-list-${dataTypeDropdown}`);
        ul.innerHTML = "";
        const newSearchBar = new Search(
          recipes,
          dataTypeDropdown,
          this.selectedTags
        );
        if (dataTypeDropdown == "ingredients") {
          const dropdown = new Dropdown(
            dataTypeDropdown,
            Array.from(ingredients),
            this.selectedTags,
            newSearchBar
          );
          dropdown.filterElementsWithInput(valueInput);
        } else if (dataTypeDropdown == "appliances") {
          const dropdown = new Dropdown(
            dataTypeDropdown,
            Array.from(appliances),
            this.selectedTags,
            newSearchBar
          );
          dropdown.filterElementsWithInput(valueInput);
        } else if (dataTypeDropdown == "ustensils") {
          const dropdown = new Dropdown(
            dataTypeDropdown,
            Array.from(ustensils),
            this.selectedTags,
            newSearchBar
          );
          dropdown.filterElementsWithInput(valueInput);
        }
      }
    });
  }
}

/**
 * loading home page
 */
window.onload = new HomePage();
