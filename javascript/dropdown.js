import { recipes } from "./data_recipes/recipes_data.js";

export class Dropdown {
  constructor(dataTypeDropdown, tags, selectedTags, searchbar) {
    this.selectedTags = selectedTags;
    this.searchBar = searchbar;
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

  /**
   * Open dropdown
   */
  openDropdown() {
    const isExpanded = this.button.getAttribute(`aria-expanded`);
    if (isExpanded === "false") {
      this.button.setAttribute("aria-expanded", "true");
    }
    this.dropdown.style.maxHeight = "23em";
    this.dropdown.style.width = "100em";
    this.filterElement();
  }

  /**
   * Display filtered elements of dropdown
   */
  filterElement() {
    console.log(this.dataType);
    if (this.dataType == "ingredients") {
      const ingredients = new Set();
      console.log(this.searchBar.recipesFiltered);
      this.searchBar.recipesFiltered.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          ingredients.add(ingredient.ingredient.toLowerCase());
        });
      });
      this.createHtmlDropdown(Array.from(ingredients));
    }
    if (this.dataType == "appliances") {
      console.log(this.searchBar.recipesFiltered);
      const appliances = new Set();
      this.searchBar.recipesFiltered.forEach((recipe) => {
        appliances.add(recipe.appliance.toLowerCase());
        console.log(appliances);
      });
      this.createHtmlDropdown(Array.from(appliances));
    }
    if (this.dataType == "ustensils") {
      const ustensils = new Set();
      this.searchBar.recipesFiltered.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          ustensils.add(ustensil.toLowerCase());
        });
      });
      this.createHtmlDropdown(Array.from(ustensils));
    }
  }

  /**
   * Close dropdown
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
   * @param {array} elements of dropdown
   * Create Html of dropdown
   */
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

  /**
   * Listeners when click on element of dropdown
   */
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
        this.selectedTags.add(dataElementClicked.toLowerCase());
        this.searchBar.recipesFilteredWithInput(
          recipes,
          this.dataType,
          this.selectedTags
        );
        this.filterElement();
      });
    });
  }

  /**
   *
   * @param {string} dataElementClicked element clicked
   * Create tag. Add element clicked in bubble tag
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
    this.searchBar.recipesFilteredWithInput();
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
            this.selectedTags.delete(dataTag);
            this.searchBar.recipesFilteredWithInput(
              recipes,
              this.dataType,
              this.selectedTags
            );
            this.searchBar.recipesFilteredWithInput();
            this.openDropdown();
            this.removeTag();
          }
        });
      });
    });
  }
}
