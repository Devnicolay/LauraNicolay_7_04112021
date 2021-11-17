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
    this.createHtmlRecipes();
  }

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
          return `<p>${ingredient.ingredient}</p>`;
        })
        .join("") +
      ` </div>
          <p class="description">${this.description}</p>
        </div>
      </article>`;
  }
}
