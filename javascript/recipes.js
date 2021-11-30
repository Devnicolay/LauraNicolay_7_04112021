export class Recipes {
  constructor(recipes) {
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

  /**
   * Create HTML for recipes cards
   */
  createHtmlRecipes() {
    const mainRecipes = document.querySelector("main");
    mainRecipes.innerHTML +=
      `<article data-id="${this.id}">
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
          const unitHtml = ingredient.unit
            ? `<span class="unit" data-unit="${ingredient.unit}">${ingredient.unit}</span>`
            : "";
          return `<p class="ingredient" data-ingredient="${ingredient.ingredient.toLowerCase()}">${
            ingredient.ingredient
          } : ${ingredient.quantity} ${unitHtml}</p>`;
        })
        .join("") +
      ` </div>
          <p class="description" data-description="${this.description}">${this.description}</p>
        </div>
      </article>`;
    const recipesDom = document.querySelectorAll("article");
    recipesDom.forEach((recipe) => {
      recipe.style.display = "block";
    });
  }
}
