/**
 * DOM
 */
const searchBar = document.getElementById("research");
let arrayOfRecipesFiltered;

export class Search {
  constructor(recipes) {
    this.recipes = recipes;
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    searchBar.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        this.recipesFilteredWithInput(this.recipes);
      } else {
        this.displayAllRecipes(this.recipes);
      }
    });
  }

  /**
   * Create an array of recipes that matches with search field
   */
  recipesFilteredWithInput(recipes) {
    console.log(recipes);
    let recipesFiltered = [];
    const valueInput = searchBar.value.toLowerCase();
    for (let i = 0; i < recipes.length; i++) {
      const recipeDom = document.querySelector(
        `article[data-id="${recipes[i].id}"]`
      );
      const hasTheWantedName = recipes[i].name
        .toLowerCase()
        .includes(valueInput);
      const hasTheWantedDescription = recipes[i].description
        .toLowerCase()
        .includes(valueInput);

      const ingredients = recipes[i].ingredients;

      let hasTheWantedIngredient = false;
      for (let j = 0; j < ingredients.length; j++) {
        const searchedFound = ingredients[j].ingredient
          .toLowerCase()
          .includes(valueInput);
        if (searchedFound) {
          hasTheWantedIngredient = true;
        }
      }

      if (
        hasTheWantedName ||
        hasTheWantedIngredient ||
        hasTheWantedDescription
      ) {
        recipeDom.style.display = "block";
        recipesFiltered.push(recipeDom);
      } else {
        recipeDom.style.display = "none";
      }
    }
    console.log(recipesFiltered);
    const mainMsgError = document.querySelector(".msg-error");
    if (recipesFiltered.length === 0) {
      mainMsgError.innerHTML = `<p class="msg-no-recipe">Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`;
    } else {
      mainMsgError.innerHTML = "";
    }
    arrayOfRecipesFiltered = recipesFiltered;
    console.log(arrayOfRecipesFiltered);
  }

  getArray() {
    console.log(arrayOfRecipesFiltered);
    return arrayOfRecipesFiltered;
  }

  /**
   * Display all recipes when the value of search input is less than 3 caracters
   */
  displayAllRecipes(recipes) {
    for (let i = 0; i < recipes.length; i++) {
      const recipeDom = document.querySelector(
        `article[data-id="${recipes[i].id}"]`
      );
      recipeDom.style.display = "block";
    }
  }
}
