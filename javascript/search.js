import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const searchBar = document.getElementById("research");

export class Search {
  constructor(recipes, dataTypeDropdown, selectedTag) {
    this.recipes = recipes;
    this.dataType = dataTypeDropdown;
    this.selectedTag = selectedTag;
    this.recipesFiltered = recipes;
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    searchBar.addEventListener("keyup", (e) => {
      if (e.target.value.length >= 3) {
        this.recipesFilteredWithInput();
      } else if (e.target == "Backspace") {
        this.recipesFilteredWithInput();
      } else if (this.selectedTag) {
        this.recipesFilteredWithInput();
      } else {
        this.displayAllRecipes();
      }
    });
  }

  /**
   * Create an array of recipes that matches with search field
   */
  recipesFilteredWithInput() {
    // start of code for solution 2
    const valueInput = searchBar.value.toLowerCase();

    const recipesFiltered = recipes.filter((recipe) => {
      return (
        recipe.name.toLowerCase().includes(valueInput.toLowerCase()) ||
        recipe.description.toLowerCase().includes(valueInput.toLowerCase()) ||
        recipe.ingredients.some((ingredient) =>
          ingredient.ingredient.toLowerCase().includes(valueInput.toLowerCase())
        )
      );
    });
    const recipesDom = document.querySelectorAll("article");
    recipesDom.forEach((recipe) => {
      recipe.style.display = "none";
    });
    recipesFiltered.forEach((recipe) => {
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      if (recipesFiltered) {
        recipeDom.style.display = "block";
        this.recipesFiltered = recipesFiltered;
      }
    });
    // End of code for solution 2

    if (this.selectedTag.size) {
      // if there are tags selected
      this.recipesFiltered = recipesFiltered.filter((recipe) => {
        const shouldBeKept = Array.from(this.selectedTag).every((tag) => {
          return (
            recipe.ingredients.some((i) => {
              return i.ingredient.toLowerCase().includes(tag.toLowerCase());
            }) ||
            recipe.appliance.toLowerCase().includes(tag.toLowerCase()) ||
            recipe.ustensils.some((ustensil) => {
              return ustensil.toLowerCase() === tag.toLowerCase();
            })
          );
        });

        const recipeDom = document.querySelector(
          `article[data-id="${recipe.id}"]`
        );
        if (shouldBeKept) {
          recipeDom.style.display = "block";
        } else {
          recipeDom.style.display = "none";
        }

        return shouldBeKept;
      });
    }

    const mainMsgError = document.querySelector(".msg-error");
    if (recipesFiltered.length === 0 || this.recipesFiltered.length === 0) {
      mainMsgError.innerHTML = `<p class="msg-no-recipe">Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`;
    } else {
      mainMsgError.innerHTML = "";
    }
  }

  /**
   * Display all recipes when the value of search input is less than 3 caracters
   */
  displayAllRecipes() {
    for (let i = 0; i < this.recipes.length; i++) {
      const recipeDom = document.querySelector(
        `article[data-id="${this.recipes[i].id}"]`
      );
      recipeDom.style.display = "block";
    }
  }
}
