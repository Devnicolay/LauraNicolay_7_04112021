import { recipes } from "./data_recipes/recipes_data.js";

export class Tags {
  constructor(recipes, dataType) {
    this.recipes = recipes;
    console.log(this.recipes);
    this.dataType = dataType;

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
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
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
    const isExpanded = this.button.getAttribute(`aria-expanded`);
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
    this.dropdown.style.width = "9em";
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
    this.dropdown.style.maxHeight = "23em";
    this.dropdown.style.width = "100em";
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
    this.ul.focus();
    this.ul.addEventListener("blur", () => {
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
    tag.classList.add(`tag-${this.dataType}`);
    tag.setAttribute("data-tag", `${dataElementClicked.toLowerCase()}`);
    tag.innerHTML += `<p>${dataElementClicked}</p><i class="far fa-times-circle" data-${
      this.dataType
    }="${dataElementClicked.toLowerCase()}"></i>`;
    const tagsContainer = document.querySelector(".tags-container");
    tagsContainer.appendChild(tag);
    const tags = document.querySelectorAll(".tags");
    tags.forEach((tag) => {
      const dataTags = tag.getAttribute("data-tag");
      console.log(dataTags);
    });
  }
}
