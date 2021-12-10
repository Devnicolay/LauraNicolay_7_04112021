import { recipes } from "./data_recipes/recipes_data.js";
import { Recipe } from "./recipes.js";
import { Dropdown } from "./dropdown.js";
import { Search } from "./searchBar.js";

/**
 * Display all recipes when the page loads
 */
export class HomePage {
  constructor() {
    this.arrayIngredients = new Set();
    this.arrayAppliances = new Set();
    this.arrayUstensils = new Set();
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
    recipes.map((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        this.arrayIngredients.add(ingredient.ingredient);
      });
      this.arrayAppliances.add(recipe.appliance);
      recipe.ustensils.forEach((ustensil) => {
        this.arrayUstensils.add(ustensil);
      });
    });

    // Part dropdowns
    let dataTypeDropdown = "";
    const chevronDownIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-down"
    );
    chevronDownIngredients.addEventListener("click", () => {
      dataTypeDropdown = "ingredients";
      new Dropdown(
        dataTypeDropdown,
        this.arrayIngredients,
        this.arrayAppliances,
        this.arrayUstensils
      );
    });
    const chevronDownAppliances = document.querySelector(
      ".arrow-appliances .fa-chevron-down"
    );
    chevronDownAppliances.addEventListener("click", () => {
      dataTypeDropdown = "appliances";
      new Dropdown(
        dataTypeDropdown,
        this.arrayIngredients,
        this.arrayAppliances,
        this.arrayUstensils
      );
    });
    const chevronDownUstensils = document.querySelector(
      ".arrow-ustensils .fa-chevron-down"
    );
    chevronDownUstensils.addEventListener("click", () => {
      dataTypeDropdown = "ustensils";
      new Dropdown(
        dataTypeDropdown,
        this.arrayIngredients,
        this.arrayAppliances,
        this.arrayUstensils
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

    // Part searchBar
    console.log(dataTypeDropdown);
    new Search(recipes, dataTypeDropdown);
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
        console.log(dataTypeDropdown);
        const searchBar = document.getElementById(`search-${dataTypeDropdown}`);
        const valueInput = searchBar.value.toLowerCase();
        const ul = document.querySelector(`.nav-list-${dataTypeDropdown}`);
        ul.innerHTML = "";
        const newDropdown = new Dropdown(
          dataTypeDropdown,
          this.arrayIngredients,
          this.arrayAppliances,
          this.arrayUstensils
        );
        newDropdown.filterElementInDropdown(valueInput);
      }
    });
  }
}

/**
 * loading home page
 */
window.onload = new HomePage();
