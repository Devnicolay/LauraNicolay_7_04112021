import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const chevronIngredients = document.querySelector(".arrow-ingredients");
const chevronDownIngredients = document.querySelector(
  ".arrow-ingredients .fa-chevron-down"
);
const labelIngredients = document.querySelector("#label-ingredients");
const inputIngredients = document.querySelector("#search-ingredients");
const buttonIngredients = document.querySelector("#button-ingredients");
const isExpanded = buttonIngredients.getAttribute("aria-expanded");
const ulIngredients = document.querySelector(".nav-list-ingredients");
const tagsContainer = document.querySelector(".tags-container");

export class Ingredient {
  constructor(recipes) {
    this.recipe = recipes;
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    chevronDownIngredients.addEventListener("click", () =>
      this.openListOfIngredients()
    );
    labelIngredients.addEventListener("click", () => this.displayInput());
    inputIngredients.addEventListener("blur", () => this.undisplayInput());
    inputIngredients.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        this.displayRecipesFilteredBySearchBarIngredient();
        ulIngredients.innerHTML = "";
        const valueInputIngredient = inputIngredients.value.toLowerCase();
        this.filterIngredientInDropdown(valueInputIngredient);
      }
    });
  }

  /**
   * Display input when click on word ingredients in button
   */
  displayInput() {
    labelIngredients.style.display = "none";
    inputIngredients.style.display = "block";
  }

  /**
   * Undisplay input when quite input focus
   */
  undisplayInput() {
    inputIngredients.style.display = "none";
    labelIngredients.style.display = "block";
  }

  /**
   * Open dropdown of Ingredient when clic on down chevron
   */
  openListOfIngredients() {
    if (isExpanded === "false") {
      buttonIngredients.setAttribute("aria-expanded", "true");
    }
    let ingredientsUnduplicated = new Set();

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredientsUnduplicated.add(ingredient.ingredient.toLowerCase());
      });
    });
    ingredientsUnduplicated = Array.from(ingredientsUnduplicated);
    this.createListIngredientsHtml(ingredientsUnduplicated);
    const liIngredient = Array.from(
      document.querySelectorAll(".nav-list-ingredients .li-ingredient")
    );
    liIngredient.forEach((ingredient) => {
      ingredient.addEventListener("click", () => {
        const dataIngredientClicked =
          ingredient.getAttribute("data-ingredient");
        this.createHtmlTagsIngredient(dataIngredientClicked);
      });
    });
  }

  /**
   * Close dropdown of Ingredient when clic on up chevron
   */
  closeListOfIngredients() {
    buttonIngredients.setAttribute("aria-expanded", "false");
    chevronIngredients.innerHTML = `<span class="fas fa-chevron-down"></span>`;
    ulIngredients.innerHTML = ``;
  }

  /**
   *
   * @param {string} valueInputIngredient Value of input ingredient
   * Display ingredients in dropdown wich include the value of input ingredient
   */
  filterIngredientInDropdown(valueInputIngredient) {
    this.openListOfIngredients();
    if (isExpanded === "false") {
      buttonIngredients.setAttribute("aria-expanded", "true");
    }
    const liIngredient = Array.from(
      document.querySelectorAll(".nav-list-ingredients .li-ingredient")
    );
    liIngredient.forEach((ingredient) => {
      const dataIngredient = ingredient.getAttribute("data-ingredient");
      console.log(dataIngredient);
      if (dataIngredient.includes(valueInputIngredient)) {
        ingredient.style.display = "block";
      } else {
        ingredient.style.display = "none";
      }
    });
  }

  /**
   * Create HTML for ingredient list
   */
  createListIngredientsHtml(ingredients) {
    let ingredientsUnduplicated = new Set();

    recipes.forEach((recipe) => {
      recipe.ingredients.forEach((ingredient) => {
        ingredientsUnduplicated.add(ingredient.ingredient.toLowerCase());
      });
    });
    const dropdownIngredients = document.querySelector(
      ".nav-dropdown-ingredients"
    );
    dropdownIngredients.style.maxHeight = "23em";
    const ulIngredients = document.querySelector(".nav-list-ingredients");
    ulIngredients.innerHTML += ingredients
      .map((ingredient) => {
        return `<li class="li-ingredient" data-ingredient="${ingredient.toLowerCase()}">${ingredient}</li>`;
      })
      .join("");
    chevronIngredients.innerHTML = `<span class="fas fa-chevron-up"></span>`;
    const chevronUpIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-up"
    );
    chevronUpIngredients.addEventListener("click", () =>
      this.closeListOfIngredients()
    );
  }

  /**
   *
   * @param {string} ingredient ingredient clicked
   * Add ingredient in bubble tag
   */
  createHtmlTagsIngredient(dataIngredientClicked) {
    tagsContainer.innerHTML = `<div class="tags" data-tag="${dataIngredientClicked}"><p>${dataIngredientClicked}</p><i class="far fa-times-circle"></i></div>`;
    this.displayRecipesFilteredByIngredient();
  }

  /**
   * Display recipes with ingredient enter in input
   */
  displayRecipesFilteredBySearchBarIngredient() {
    const searchBarIngredient = document.getElementById("search-ingredients");
    const valueInputIngredient = searchBarIngredient.value.toLowerCase();

    recipes.forEach((recipe) => {
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      let hasTheWantedIngredient = false;
      recipe.ingredients.forEach((ingredient) => {
        const ingredientfound = ingredient.ingredient
          .toLowerCase()
          .includes(valueInputIngredient);
        if (ingredientfound) {
          hasTheWantedIngredient = true;
        }
        if (hasTheWantedIngredient) {
          recipeDom.style.display = "block";
        } else {
          recipeDom.style.display = "none";
        }
      });
    });
  }

  /**
   * Display recipes with tag ingredient
   */
  displayRecipesFilteredByIngredient() {
    const tags = document.querySelector(".tags");
    const dataTags = tags.getAttribute("data-tag");

    recipes.forEach((recipe) => {
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      let hasTheWantedIngredient = false;
      recipe.ingredients.forEach((ingredient) => {
        const ingredientfound = ingredient.ingredient
          .toLowerCase()
          .includes(dataTags);
        if (ingredientfound) {
          hasTheWantedIngredient = true;
        }
        if (hasTheWantedIngredient) {
          recipeDom.style.display = "block";
        } else {
          recipeDom.style.display = "none";
        }
      });
    });
  }
}
