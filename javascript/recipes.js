import { recipes } from "./data_recipes/recipes_data.js";

export class Recipes {
  constructor(recipes) {
    this.recipes = recipes;
    this.id = recipes.id;
    this.name = recipes.name;
    this.servings = recipes.servings;
    this.ingredients = recipes.ingredients;
    this.time = recipes.time;
    this.description = recipes.description;
    this.appliance = recipes.appliance;
    this.utensils = recipes.ustensils;
    this.initListeners();
  }

  initListeners() {
    this.createHtmlRecipes();
    this.IfNotUnitOfQuantity();
  }

  /**
   * Create HTML for recipes cards
   */
  createHtmlRecipes() {
    const mainRecipes = document.querySelector("main");
    mainRecipes.innerHTML +=
      `<article>
        <div class="picture"></div>
        <div class="name-and-time">
            <h2 class="name" data-name="${this.name}">${this.name}</h2>
            <p><i class="far fa-clock"></i> ${this.time} min</p>
        </div>
        <div class="ingredients-and-description">
          <div class="ingredients">
          ` +
      this.ingredients
        .map((ingredient) => {
          return `<p class="ingredient" data-ingredient="${ingredient.ingredient}">${ingredient.ingredient} : ${ingredient.quantity} <span class="unit" data-unit="${ingredient.unit}">${ingredient.unit}</span></p>`;
        })
        .join("") +
      ` </div>
          <p class="description" data-description="${this.description}">${this.description}</p>
        </div>
      </article>`;
  }

  /**
   * If there is no unit of quantity in the ingredient, do not display unit in the recipe card
   */
  IfNotUnitOfQuantity() {
    const units = document.querySelectorAll(".ingredient .unit");
    units.forEach((unit) => {
      const dataUnit = unit.getAttribute("data-unit");
      if (dataUnit === "undefined") {
        console.log("null");
        unit.innerHTML += `.`;
      }
    });
  }
}
