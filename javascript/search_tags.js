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
    this.recipes = recipes;
    console.log(this.recipes);
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
        const searchBarIngredient =
          document.getElementById("search-ingredients");
        const valueInputIngredient = searchBarIngredient.value.toLowerCase();
        ulIngredients.innerHTML = "";
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
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      recipe.ingredients.forEach((ingredient) => {
        if (recipeDom.style.display === "block") {
          ingredientsUnduplicated.add(ingredient.ingredient.toLowerCase());
        }
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
        this.displayRecipesFilteredByIngredient(dataIngredientClicked);
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
    const chevronDownIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-down"
    );
    chevronDownIngredients.addEventListener("click", () =>
      this.openListOfIngredients()
    );
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
        return `<li class="li-ingredient" data-ingredient="${ingredient}">${ingredient}</li>`;
      })
      .join("");
    chevronIngredients.innerHTML = `<span class="fas fa-chevron-up"></span>`;
    const chevronUpIngredients = document.querySelector(
      ".arrow-ingredients .fa-chevron-up"
    );
    chevronUpIngredients.addEventListener("click", () =>
      this.closeListOfIngredients()
    );
    ulIngredients.focus();
    ulIngredients.addEventListener("blur", () => {
      this.closeListOfIngredients();
    });
  }

  /**
   *
   * @param {string} ingredient ingredient clicked
   * Add ingredient in bubble tag
   */
  createHtmlTagsIngredient(dataIngredientClicked) {
    const tag = document.createElement("div");
    tag.classList.add("tags");
    tag.setAttribute("data-tag", `${dataIngredientClicked.toLowerCase()}`);
    tag.innerHTML += `<p>${dataIngredientClicked}</p><i class="far fa-times-circle" data-ingredient="${dataIngredientClicked.toLowerCase()}"></i>`;
    tagsContainer.appendChild(tag);
    // Remove tag with cross of tag
    const crossTag = document.querySelectorAll(".fa-times-circle");
    crossTag.forEach((cross) => {
      cross.addEventListener("click", () => {
        const dataCross = cross.getAttribute("data-ingredient");
        const dataTag = tag.getAttribute("data-tag");
        if (dataCross == dataTag) {
          tag.style.display = "none";
        }
      });
    });
  }

  /**
   * Display filtered recipes with the search input for ingredients or selected the ingredient in dropdown list
   */
  displayRecipesFilteredByIngredient(matchedIngredient) {
    console.log(this.recipes);
    const arrayRecipes = Array.from(this.recipes);
    console.log(arrayRecipes);
    arrayRecipes.forEach((recipe) => {
      const ingredients = recipe.querySelectorAll(".ingredient");
      console.log(ingredients);
      let allIngredients = [];
      ingredients.forEach((ingredient) => {
        const dataIngredient = ingredient.getAttribute("data-ingredient");
        allIngredients.push(dataIngredient);
      });
      const ingredientFound = allIngredients.some((ingredient) =>
        ingredient.toUpperCase().includes(matchedIngredient.toUpperCase())
      );
      console.log(allIngredients);
      console.log(ingredientFound);
      if (ingredientFound) {
        recipe.style.display = "block";
        console.log(recipe);
      } else {
        recipe.style.display = "none";
      }
    });
  }
}
