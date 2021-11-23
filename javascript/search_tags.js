import { recipes } from "./data_recipes/recipes_data.js";
import { SearchBar } from "./search_bar.js";

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
      if (e.target.value.length >= 2) {
        this.AddIngredientTag();
      } else {
        SearchBar.refreshRecipes();
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
    recipes.map((recipe) => {
      const ingredients = recipe.ingredients;
      ingredients.map((arrayIngredient) => {
        const ingredientOnly = arrayIngredient.ingredient.toLowerCase();
        this.createListIngredientsHtml(ingredientOnly);
      });
    });
    const liIngredient = Array.from(
      document.querySelectorAll(".nav-list-ingredients .li-ingredient")
    );
    liIngredient.forEach((ingredient) => {
      ingredient.addEventListener("click", () => {
        this.AddIngredientTag(ingredient);
      });
    });
  }

  /**
   * Create HTML for ingredient list
   */
  createListIngredientsHtml(ingredients) {
    console.log(ingredients);
    const ingredientsUnduplicated = [...new Set(ingredients)];
    console.log(ingredientsUnduplicated);
    const dropdownIngredients = document.querySelector(
      ".nav-dropdown-ingredients"
    );
    dropdownIngredients.style.maxHeight = "23em";
    const ulIngredients = document.querySelector(".nav-list-ingredients");
    ulIngredients.innerHTML += `<li class="li-ingredient" data-ingredient="${ingredientsUnduplicated}">${ingredientsUnduplicated}</li>`;
    chevronIngredients.innerHTML = `<span class="fas fa-chevron-up"></span>`;
    const chevronUpIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-up"
    );
    chevronUpIngredients.addEventListener("click", () =>
      this.closeListOfIngredients()
    );
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
   * @param {string} ingredient ingredient clicked
   * Add ingredient in bubble tag
   */
  AddIngredientTag(ingredient) {
    const valueInputIngredient = inputIngredients.value.toLowerCase();
    const dataIngredientClicked = ingredient.getAttribute("data-ingredient");
    tagsContainer.innerHTML = `<div class="tags" data-tag="${dataIngredientClicked}"><p>${dataIngredientClicked}</p><i class="far fa-times-circle"></i></div>`;
    this.displayRecipesFilteredByIngredient();
  }

  /**
   * Display recipes with tag ingredient or ingredient enter in input
   */
  displayRecipesFilteredByIngredient() {
    const tags = document.querySelector(".tags");
    const dataTags = tags.getAttribute("data-tag");
    console.log(dataTags);
    recipes.forEach((recipe) => {
      const ingredients = recipe.ingredients;
      ingredients.forEach((ingredient) => {
        const recipesCard = document.querySelectorAll("main article");
        recipesCard.forEach((recipeCard) => {
          if (ingredient.ingredient == dataTags) {
            recipesCard.style.display = "block"; // display recipes
          } else {
            recipesCard.style.display = "none"; // undisplay recipes
          }
        });
      });
    });
  }
}
