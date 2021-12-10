/**
 * DOM
 */
const searchBar = document.getElementById("research");
let arrayOfRecipesFiltered;

export class Search {
  constructor(recipes, dataTypeDropdown) {
    this.recipes = recipes;
    console.log(this.recipes);
    this.dataType = dataTypeDropdown;
    console.log(this.dataType);
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
        recipesFiltered.push(recipes[i]);
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

  /**
   *
   * @param {string} valueInput Value of input dropdown
   * Display elements in dropdown wich include the value of input
   */
  filterElementInDropdown(valueInput, dataTypeDropdown) {
    console.log(dataTypeDropdown);
    const button = document.querySelector(`#button-${dataTypeDropdown}`);
    const isExpanded = button.getAttribute(`aria-expanded`);
    if (isExpanded === "false") {
      button.setAttribute("aria-expanded", "true");
    }
    const li = Array.from(
      document.querySelectorAll(
        `.nav-list-${dataTypeDropdown} .li-${dataTypeDropdown}`
      )
    );
    li.forEach((element) => {
      const data = element.getAttribute(`data-${dataTypeDropdown}`);
      if (data.includes(valueInput)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }
}
