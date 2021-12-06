import { recipes } from "./data_recipes/recipes_data.js";

export class Tags {
  constructor(recipes, dataType) {
    this.recipes = recipes;
    console.log(this.recipes);
    this.dataType = dataType;
    console.log(dataType);
    this.chevron = document.querySelector(`.arrow-${this.dataType}`);
    this.chevronDown = document.querySelector(
      `.arrow-${this.dataType} .fa-chevron-down`
    );
    this.label = document.querySelector(`#label-${this.dataType}`);
    this.input = document.querySelector(`#search-${this.dataType}`);
    this.button = document.querySelector(`#button-${this.dataType}`);
    this.ul = document.querySelector(`.nav-list-${this.dataType}`);
    this.tagsContainer = document.querySelector(`.tags-container`);
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    this.openDropdown();
    this.label.addEventListener("click", () => this.displayInput());
    this.input.addEventListener("blur", () => this.undisplayInput());
    this.input.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        const searchBar = document.getElementById(`search-${this.dataType}`);
        const valueInput = searchBar.value.toLowerCase();
        this.ul.innerHTML = "";
        this.filterElementInDropdown(valueInput);
      }
    });
  }

  /**
   * Display input when click on word of type list in button
   */
  displayInput() {
    this.label.style.display = "none";
    this.input.style.display = "block";
  }

  /**
   * Undisplay input when quite input focus
   */
  undisplayInput() {
    this.input.style.display = "none";
    this.label.style.display = "block";
  }

  /**
   * Open dropdown when clic on down chevron
   */
  openDropdown() {
    console.log(this.button);
    const isExpanded = this.button.getAttribute(`aria-expanded`);
    console.log(isExpanded);
    if (isExpanded === "false") {
      this.button.setAttribute("aria-expanded", "true");
    }
    let elementsUnduplicated = new Set();

    recipes.forEach((recipe) => {
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      if (this.dataType == "ingredients") {
        recipe.ingredients.forEach((ingredient) => {
          if (recipeDom.style.display === "block") {
            elementsUnduplicated.add(ingredient.ingredient.toLowerCase());
          }
        });
      } else if (this.dataType == "appliances") {
        if (recipeDom.style.display === "block") {
          elementsUnduplicated.add(recipe.appliance.toLowerCase());
        }
      } else if (this.dataType == "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          if (recipeDom.style.display === "block") {
            elementsUnduplicated.add(ustensil.toLowerCase());
          }
        });
      }
    });

    elementsUnduplicated = Array.from(elementsUnduplicated);
    this.createDropdownHtml(elementsUnduplicated);
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
        this.displayRecipesFilteredByElementList(dataElementClicked);
      });
    });
  }

  /**
   * Close dropdown when clic on up chevron
   */
  closeDropdown() {
    this.button.setAttribute("aria-expanded", "false");
    this.chevron.innerHTML = `<span class="fas fa-chevron-down"></span>`;
    this.ul.innerHTML = ``;
    const chevronDown = document.querySelector(
      `.arrow-${this.dataType} .fa-chevron-down`
    );
    chevronDown.addEventListener("click", () => this.openDropdown());
  }

  /**
   *
   * @param {string} valueInput Value of input dropdown
   * Display elements in dropdown wich include the value of input
   */
  filterElementInDropdown(valueInput) {
    this.openDropdown();
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

  /**
   * Create HTML for dropdown
   */
  createDropdownHtml(elements) {
    let elementsUnduplicated = new Set();

    recipes.forEach((recipe) => {
      if (this.dataType == "ingredients") {
        recipe.ingredients.forEach((ingredient) => {
          elementsUnduplicated.add(ingredient.ingredient.toLowerCase());
        });
      } else if (this.dataType == "appliances") {
        elementsUnduplicated.add(recipe.appliance.toLowerCase());
      } else if (this.dataType == "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          elementsUnduplicated.add(ustensil.toLowerCase());
        });
      }
    });
    const dropdown = document.querySelector(`.nav-dropdown-${this.dataType}`);
    dropdown.style.maxHeight = "23em";
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
    chevronUp.addEventListener("click", () => this.closeDropdown());
    ul.focus();
    ul.addEventListener("blur", () => {
      this.closeDropdown();
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
    tag.setAttribute("data-tag", `${dataElementClicked.toLowerCase()}`);
    tag.innerHTML += `<p>${dataElementClicked}</p><i class="far fa-times-circle" data-${
      this.dataType
    }="${dataElementClicked.toLowerCase()}"></i>`;
    const tagsContainer = document.querySelector(".tags-container");
    tagsContainer.appendChild(tag);
    // Remove tag with cross of tag
    const crossTag = document.querySelectorAll(".fa-times-circle");
    crossTag.forEach((cross) => {
      cross.addEventListener("click", () => {
        const dataCross = cross.getAttribute(`data-${this.dataType}`);
        const dataTag = tag.getAttribute("data-tag");
        if (dataCross == dataTag) {
          tag.style.display = "none";
        }
      });
    });
  }

  /**
   * Display filtered recipes with the search input or selected the element in dropdown list
   */
  displayRecipesFilteredByElementList(matchedElement) {
    const arrayRecipes = Array.from(this.recipes);
    console.log(arrayRecipes);
    arrayRecipes.forEach((recipe) => {
      const elements = recipe.querySelectorAll(`.${this.dataType}`);
      console.log(elements);
      let allElements = [];
      elements.forEach((element) => {
        const dataElement = element.getAttribute(`data-${this.dataType}`);
        allElements.push(dataElement);
      });
      const elementFound = allElements.some((element) =>
        element.toUpperCase().includes(matchedElement.toUpperCase())
      );
      console.log(allElements);
      console.log(elementFound);
      if (elementFound) {
        recipe.style.display = "block";
        console.log(recipe);
      } else {
        recipe.style.display = "none";
      }
    });
  }
}
