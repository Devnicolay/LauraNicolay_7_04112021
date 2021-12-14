import { recipes } from "./data_recipes/recipes_data.js";
import { Search } from "./searchBar.js";

let resultRecipes = [];

export class Dropdown {
  constructor(dataTypeDropdown, tags, selectedTags, searchbar) {
    this.selectedTags = Array.from(selectedTags);
    console.log(selectedTags);
    this.searchBar = searchbar;
    console.log(searchbar);
    this.tags = tags;
    this.dataType = dataTypeDropdown;
    this.chevron = document.querySelector(`.arrow-${this.dataType}`);
    this.chevronDown = document.querySelector(
      `.arrow-${this.dataType} .fa-chevron-down`
    );
    this.dropdown = document.querySelector(`.nav-dropdown-${this.dataType}`);
    this.label = document.querySelector(`#label-${this.dataType}`);
    this.input = document.querySelector(`#search-${this.dataType}`);
    this.button = document.querySelector(`#button-${this.dataType}`);
    this.ul = document.querySelector(`.nav-list-${this.dataType}`);
    this.tagsContainer = document.querySelector(`.tags-container`);
    this.openDropdown();
  }

  openDropdown() {
    if (resultRecipes == undefined) {
      resultRecipes = [];
    }
    const isExpanded = this.button.getAttribute(`aria-expanded`);
    if (isExpanded === "false") {
      this.button.setAttribute("aria-expanded", "true");
    }
    this.dropdown.style.maxHeight = "23em";
    this.dropdown.style.width = "100em";
    const searchBar = document.getElementById("research");
    const valueSearchBar = searchBar.value.toLowerCase();
    console.log(resultRecipes);
    if (valueSearchBar.length >= 3) {
      const recipesFiltered = this.searchBar.getArray();
      this.filterElement(recipesFiltered);
    } else if (resultRecipes.length > -1) {
      this.filterElement(resultRecipes);
    } else {
      this.createHtmlDropdown(this.tags);
    }
  }

  filterElement(recipesFiltered) {
    console.log("filtré");
    if (this.dataType == "ingredients") {
      const ingredients = new Set();
      recipesFiltered.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingredients.add(ingredient.ingredient.toLowerCase());
        });
      });
      this.createHtmlDropdown(Array.from(ingredients));
    }
    if (this.dataType == "appliances") {
      const appliances = new Set();
      recipesFiltered.forEach((recipe) => {
        appliances.add(recipe.appliance.toLowerCase());
      });
      this.createHtmlDropdown(Array.from(appliances));
    }
    if (this.dataType == "ustensils") {
      const ustensils = new Set();
      recipesFiltered.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          ustensils.add(ustensil.toLowerCase());
        });
      });
      this.createHtmlDropdown(Array.from(ustensils));
    }
  }

  closeDropdown() {
    this.button.setAttribute("aria-expanded", "false");
    this.chevron.innerHTML = `<span class="fas fa-chevron-down"></span>`;
    this.ul.innerHTML = ``;
    const chevronDown = document.querySelector(
      `.arrow-${this.dataType} .fa-chevron-down`
    );
    chevronDown.addEventListener("click", () => this.openDropdown());
    this.dropdown.style.width = "9em";
  }

  createHtmlDropdown(elements) {
    const ul = document.querySelector(`.nav-list-${this.dataType}`);
    ul.innerHTML = "";
    ul.innerHTML += elements
      .map((element) => {
        return `<li class="li-${this.dataType}" data-${this.dataType}="${element}">${element}</li>`;
      })
      .join("");
    this.chevron.innerHTML = `<span class="fas fa-chevron-up"></span>`;
    const chevronUp = document.querySelector(
      `.arrow-${this.dataType} .fa-chevron-up`
    );
    // filter elements with value of searchBar
    const searchBar = document.getElementById("research");
    const valueInput = searchBar.value.toLowerCase();
    this.filterElementInDropdown(valueInput);
    // close dropdown
    chevronUp.addEventListener("click", () => this.closeDropdown());
    this.ul.focus();
    this.ul.addEventListener("blur", () => {
      this.closeDropdown();
    });
    this.intiListeners();
  }

  intiListeners() {
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
        this.selectedTags.push(dataElementClicked.toLowerCase());
        this.searchBar.recipesFilteredWithInput(
          recipes,
          this.dataType,
          this.selectedTags
        );
        this.createHtmlTags(dataElementClicked);
      });
    });
  }

  /**
   *
   * @param {string} dataElementClicked element clicked
   * Add element in bubble tag
   */
  createHtmlTags(dataElementClicked) {
    const tag = document.createElement("div");
    tag.classList.add("tags");
    tag.classList.add(`tag-${this.dataType}`);
    tag.setAttribute("data-tag", `${dataElementClicked.toLowerCase()}`);
    tag.innerHTML += `<p>${dataElementClicked}</p><i class="far fa-times-circle" data-${
      this.dataType
    }="${dataElementClicked.toLowerCase()}"></i>`;
    const tagsContainer = document.querySelector(".tags-container");
    tagsContainer.appendChild(tag);
    this.pushTagDisplayedInArray();
  }

  pushTagDisplayedInArray() {
    const tags = document.querySelectorAll(".tags");
    const tagsDisplayed = [];
    tags.forEach((tag) => {
      // push tag in array
      const labelTag = tag.getAttribute("data-tag");
      tagsDisplayed.push(labelTag);
    });
    const newSearchBar = new Search(recipes, this.dataType, this.selectedTags);
    newSearchBar.recipesFilteredWithInput();
    this.openDropdown();
    this.removeTag();
  }

  /**
   * Remove tag with cross of tag
   */
  removeTag() {
    const crossTag = document.querySelectorAll(".fa-times-circle");
    crossTag.forEach((cross) => {
      cross.addEventListener("click", () => {
        const dataCross = cross.getAttribute(`data-${this.dataType}`);
        const tags = document.querySelectorAll(".tags");
        tags.forEach((tag) => {
          const dataTag = tag.getAttribute("data-tag");
          if (dataCross == dataTag) {
            tag.remove();
            const indexTagForRemove = this.selectedTags.indexOf(dataTag);
            this.selectedTags.splice(indexTagForRemove, 1);
            console.log(this.selectedTags);
            this.searchBar.recipesFilteredWithInput(
              recipes,
              this.dataType,
              this.selectedTags
            );
            this.pushTagDisplayedInArray();
          }
        });
      });
    });
  }

  /**
   * Display recipes filtered
   * @param {array} tagsDisplayed tags displayed on the page
   * @param {array} recipesFilteredBySearchBar recipes filtered with searchBar
   */
  displayRecipesFiltered(tagsDisplayed, recipesFilteredBySearchBar) {
    let recipesFiltered = recipesFilteredBySearchBar;
    if (recipesFiltered == undefined) {
      recipesFiltered = recipes;
    }
    resultRecipes = recipesFiltered.filter((recipe) => {
      return tagsDisplayed.every((tag) => {
        return (
          recipe.ingredients.some((i) => {
            return i.ingredient.toLowerCase().includes(tag);
          }) ||
          recipe.appliance.toLowerCase().includes(tag) ||
          recipe.ustensils.some((ustensil) => {
            return ustensil.toLowerCase() === tag;
          })
        );
      });
    });
    console.log(resultRecipes);

    const allRecipesDom = document.querySelectorAll("article");
    allRecipesDom.forEach((recipe) => {
      recipe.style.display = "none";
    });
    resultRecipes.forEach((recipe) => {
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      recipeDom.style.display = "block";
    });
    this.openDropdown();
  }

  /**
   *
   * @param {string} valueInput Value of input dropdown
   * Display elements in dropdown wich include the value of input
   */
  filterElementInDropdown(valueInput) {
    const isExpanded = this.button.getAttribute(`aria-expanded`);
    if (isExpanded === "false") {
      this.button.setAttribute("aria-expanded", "true");
    }
    const li = Array.from(
      document.querySelectorAll(
        `.nav-list-${this.dataType} .li-${this.dataType}`
      )
    );
    li.forEach((element) => {
      const data = element.getAttribute(`data-${this.dataType}`);
      if (data.includes(valueInput)) {
        element.style.display = "block";
      } else {
        element.style.display = "none";
      }
    });
  }
}
