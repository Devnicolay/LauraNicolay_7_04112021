import { Search } from "./searchBar.js";
import { recipes } from "./data_recipes/recipes_data.js";

export class Dropdown {
  constructor(dataTypeDropdown, ingredients, appliances, ustensils) {
    this.ingredients = ingredients;
    this.appliances = appliances;
    this.ustensils = ustensils;
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
    const isExpanded = this.button.getAttribute(`aria-expanded`);
    if (isExpanded === "false") {
      this.button.setAttribute("aria-expanded", "true");
    }
    let elements;
    if (this.dataType == "ingredients") {
      elements = Array.from(this.ingredients);
    } else if (this.dataType == "appliances") {
      elements = Array.from(this.appliances);
    } else if (this.dataType == "ustensils") {
      elements = Array.from(this.ustensils);
    }
    this.dropdown.style.maxHeight = "23em";
    this.dropdown.style.width = "100em";
    this.createHtmlDropdown(elements);
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
    ul.innerHTML += elements
      .map((element) => {
        return `<li class="li-${this.dataType}" data-${this.dataType}="${element}">${element}</li>`;
      })
      .join("");
    this.chevron.innerHTML = `<span class="fas fa-chevron-up"></span>`;
    const chevronUp = document.querySelector(
      `.arrow-${this.dataType} .fa-chevron-up`
    );
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
    const tags = document.querySelectorAll(".tags");
    const tagsDisplayed = [];
    tags.forEach((tag) => {
      // push tag in array
      const labelTag = tag.getAttribute("data-tag");
      tagsDisplayed.push(labelTag);
    });
    const newClass = new Search();
    const recipesFiltered = newClass.getArray();
    this.displayRecipesFiltered(tagsDisplayed, recipesFiltered);
  }

  displayRecipesFiltered(tagsDisplayed, recipesFilteredBySearchBar) {
    console.log(tagsDisplayed);
    let recipesFiltered = recipesFilteredBySearchBar;
    console.log(recipesFiltered);
    let resultRecipes;
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
