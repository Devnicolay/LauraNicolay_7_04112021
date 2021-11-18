import { recipes } from "./data_recipes/recipes_data.js";

export class Ingredients {
  constructor(recipes) {
    this.recipes = recipes;
    this.ingredients = recipes.ingredients;
    this.ingredient = this.ingredients.map((ingredient) => {
      return ingredient.ingredient;
    });
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    const chevronIngredients = document.querySelector(".arrow-ingredients");
    chevronIngredients.addEventListener("click", () =>
      this.openListOfIngredients()
    );
  }

  /**
   * Open dropdown of Ingredient when clic on chevron
   */
  openListOfIngredients() {
    const arrayOfIngredient = [];
    const arrayOfTotalIngredients = [];
    arrayOfTotalIngredients.push(this.ingredient);
    this.ingredients.map((ingredient) => {
      arrayOfIngredient.push(ingredient.ingredient.toLowerCase());
      const ingredientsUnduplicated = [...new Set(arrayOfIngredient)];
      console.log(ingredientsUnduplicated);
    });
    this.createListIngredientsHtml();
  }

  /**
   * Create HTML for ingredient list
   */
  createListIngredientsHtml() {
    const dropdownIngredients = document.querySelector(
      ".nav-dropdown-ingredients"
    );
    dropdownIngredients.style.maxWidth = "100%";
    const UlIngredients = document.querySelector(".nav-list-ingredients");
    UlIngredients.innerHTML += this.ingredients
      .map((ingredient) => {
        return `<li class="li-ingredient" data-ingredient="${ingredient.ingredient}">${ingredient.ingredient}</li>`;
      })
      .join("");
  }
}
