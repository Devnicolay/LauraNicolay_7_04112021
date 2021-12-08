import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const searchBar = document.getElementById("research");

export class SearchBar {
  constructor(recipes, dataType) {
    this.recipes = recipes;
    this.dataType = dataType;
    this.recipesFiltered = [];
    this.tagsIngredients = [];
    this.tagsAppliances = [];
    this.tagsUstensils = [];
    this.addTag();
    this.removeTag();
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    searchBar.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        this.recipesFilteredWithInput();
      } else {
        this.displayAllRecipes();
      }
    });
  }

  /**
   * When click on element of dropdown (ingredients /appliances /ustensils), put element on (this.tagsIngredients /this.tagsAppliances /this.tagsUstensils)
   */
  addTag() {
    const li = Array.from(
      document.querySelectorAll(
        `.nav-list-${this.dataType} .li-${this.dataType}`
      )
    );
    li.forEach((element) => {
      element.addEventListener("click", () => {
        const dataElementClicked = element.getAttribute(
          `data-${this.dataType}`
        );
        if (this.dataType == "ingredients") {
          this.tagsIngredients.push(dataElementClicked);
        }
        this.displayRecipesFilteredByTags(dataElementClicked);
      });
    });
  }

  removeTag() {
    // Remove tag with cross of tag
    const crossTag = document.querySelectorAll(".fa-times-circle");
    console.log(crossTag);
    crossTag.forEach((cross) => {
      cross.addEventListener("click", () => {
        const dataCross = cross.getAttribute(`data-${this.dataType}`);
        const tag = document.querySelector(".tags");
        const dataTag = tag.getAttribute("data-tag");
        if (dataCross == dataTag) {
          tag.style.display = "none";
        }
      });
    });
  }

  /**
   * Create an array of recipe that matches with search field
   * Launch displayRecipesFiltered() with filtered recipes in parameter
   */
  recipesFilteredWithInput() {
    let arrayOfRecipesFiltered = [];
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
        arrayOfRecipesFiltered.push(recipeDom);
      } else {
        recipeDom.style.display = "none";
      }
    }
    console.log(arrayOfRecipesFiltered);
    const mainMsgError = document.querySelector(".msg-error");
    if (arrayOfRecipesFiltered.length === 0) {
      mainMsgError.innerHTML = `<p class="msg-no-recipe">Aucune recette ne correspond à votre critère… vous pouvez
    chercher « tarte aux pommes », « poisson », etc.</p>`;
    } else {
      mainMsgError.innerHTML = "";
    }
  }

  /**
   * @param {string} tagLabelToFilter label value of the element clicked in dropdown
   * Display filtered recipes with the search input or selected the element in dropdown
   */
  displayRecipesFilteredByTags(tagLabelToFilter) {
    let recipesFiltered = [];
    let recipesDisplay = [];
    const recipesDom = document.querySelectorAll("article");
    for (let i = 0; i < recipesDom.length; i++) {
      if (recipesDom[i].style.display === "block") {
        recipesDisplay.push(recipesDom[i]);
      }
    }
    console.log(recipesDisplay);
    for (let i = 0; i < recipesDisplay.length; i++) {
      const containerDatas = recipesDisplay[i].querySelectorAll("article");
      if (this.dataType == "ingredients") {
        const ingredients = recipesDisplay[i].querySelectorAll(".ingredient");
        for (let j = 0; j < ingredients.length; j++) {
          const data = ingredients[j].getAttribute("data-ingredient");
          console.log(data);
          console.log(tagLabelToFilter);
          if (data.includes(tagLabelToFilter)) {
            recipesFiltered.push(recipesDisplay[i]);
          }
        }
      } else if (this.dataType == "appliances") {
        for (let j = 0; j < containerDatas.length; j++) {
          const data = containerDatas[j]
            .getAttribute("data-appliance")
            .toLowerCase();
          console.log(data);
          console.log(tagLabelToFilter);
          if (data.includes(tagLabelToFilter)) {
            recipesFiltered.push(recipesDisplay[i]);
          }
        }
      } else if (this.dataType == "ustensils") {
        for (let j = 0; j < containerDatas.length; j++) {
          const data = containerDatas[j]
            .getAttribute("data-ustensil")
            .toLowerCase();
          console.log(data);
          console.log(tagLabelToFilter);
          if (data.includes(tagLabelToFilter)) {
            recipesFiltered.push(recipesDisplay[i]);
          }
        }
      }
      recipesDisplay[i].style.display = "none";
    }
    recipesFiltered.forEach((recipe) => {
      recipe.style.display = "block";
    });
    console.log(recipesFiltered);
    this.pushTagsOnArray(recipesFiltered);
  }

  /**
   *
   * @param {array} recipesFiltered
   */
  pushTagsOnArray(recipesFiltered) {
    console.log(recipesFiltered);
    let arrayOfIngredients = new Set();
    let arrayOfAppliances = new Set();
    let arrayOfUstensils = new Set();
    for (let i = 0; i < recipesFiltered.length; i++) {
      const ingredients = recipesFiltered[i].getAttribute("data-ingredients");
      const ingredientsByTheRecipe = ingredients.split(",");
      for (let j = 0; j < ingredientsByTheRecipe.length; j++) {
        arrayOfIngredients.add(ingredientsByTheRecipe[j]);
      }
      const appliances = recipesFiltered[i].getAttribute("data-appliance");
      arrayOfAppliances.add(appliances);
      const ustensils = recipesFiltered[i].getAttribute("data-ustensil");
      const ustensilsByTheRecipe = ustensils.split(",");
      for (let k = 0; k < ustensilsByTheRecipe.length; k++) {
        arrayOfUstensils.add(ustensilsByTheRecipe[k]);
      }
    }
    console.log(arrayOfIngredients);
    console.log(arrayOfAppliances);
    console.log(arrayOfUstensils);
  }

  /**
   * Display all recipes when the value of search input is less than 3 caracters
   */
  displayAllRecipes() {
    for (let i = 0; i < recipes.length; i++) {
      const recipeDom = document.querySelector(
        `article[data-id="${recipes[i].id}"]`
      );
      recipeDom.style.display = "block";
    }
  }
}
