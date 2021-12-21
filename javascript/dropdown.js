import { recipes } from "./data_recipes/recipes_data.js";

export class Dropdown {
  constructor(dataTypeDropdown, tags, selectedTags, searchbar) {
    this.selectedTags = selectedTags;
    this.searchBar = searchbar;
    this.tags = tags;
    this.dataType = dataTypeDropdown;
    this.chevron = document.querySelector(`.arrow-${this.dataType}`);
    this.dropdown = document.querySelector(`.nav-dropdown-${this.dataType}`);
    this.label = document.querySelector(`#label-${this.dataType}`);
    this.input = document.querySelector(`#search-${this.dataType}`);
    this.button = document.querySelector(`#button-${this.dataType}`);
    this.ul = document.querySelector(`.nav-list-${this.dataType}`);
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
    this.dropdown.style.flexGrow = "4";
    this.filterElementsOfDropdown();
  }

  /**
   * Display filtered elements of dropdown
   */
  filterElementsOfDropdown() {
    let elementsFiltered = new Set();
    if (this.dataType == "ingredients") {
      this.searchBar.recipesFiltered.forEach((recipe) => {
        recipe.ingredients.forEach((ingredient) => {
          elementsFiltered.add(ingredient.ingredient.toLowerCase());
        });
      });
    }
    if (this.dataType == "appliances") {
      this.searchBar.recipesFiltered.forEach((recipe) => {
        elementsFiltered.add(recipe.appliance.toLowerCase());
      });
    }
    if (this.dataType == "ustensils") {
      this.searchBar.recipesFiltered.forEach((recipe) => {
        recipe.ustensils.forEach((ustensil) => {
          elementsFiltered.add(ustensil.toLowerCase());
        });
      });
    }
    this.createHtmlDropdown(Array.from(elementsFiltered));
  }

  /**
   *
   * @param {string} valueInput
   * Display filtered elements of dropdown with value of input of dropdown
   */
  filterElementsWithInputOfDropdown(valueInput) {
    let elementsMatched = new Set();
    this.searchBar.recipesFiltered.forEach((recipe) => {
      if (this.dataType == "ingredients") {
        recipe.ingredients.forEach((ingredient) => {
          if (ingredient.ingredient.toLowerCase().includes(valueInput)) {
            elementsMatched.add(ingredient.ingredient.toLowerCase());
          }
        });
      } else if (this.dataType == "appliances") {
        if (recipe.appliance.toLowerCase().includes(valueInput)) {
          elementsMatched.add(recipe.appliance.toLowerCase());
        }
      } else if (this.dataType == "ustensils") {
        recipe.ustensils.forEach((ustensil) => {
          if (ustensil.toLowerCase().includes(valueInput)) {
            elementsMatched.add(ustensil.toLowerCase());
          }
        });
      }
    });
    this.createHtmlDropdown(Array.from(elementsMatched));
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
    this.dropdown.style.flexGrow = "1";
    this.dropdown.style.maxHeight = "3.5em";
    this.label.style.display = "block";
    this.input.style.display = "none";
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
    this.label.style.display = "none";
    this.input.style.display = "block";
    this.input.focus();
    // close dropdown
    chevronUp.addEventListener("click", () => this.closeDropdown());
    this.initListeners();
    this.closeDropdownIfClickOutside();
    this.initListenersInput();
  }

  closeDropdownIfClickOutside() {
    const dropdownIngredients = document.querySelector(
      ".nav-dropdown-ingredients"
    );
    const dropdownAppliances = document.querySelector(
      ".nav-dropdown-appliances"
    );
    const dropdownUstensils = document.querySelector(".nav-dropdown-ustensils");
    if (this.dataType == "ingredients") {
      dropdownAppliances.addEventListener("click", () => {
        this.closeDropdown();
      });
      dropdownUstensils.addEventListener("click", () => {
        this.closeDropdown();
      });
    } else if (this.dataType == "appliances") {
      dropdownIngredients.addEventListener("click", () => {
        this.closeDropdown();
      });
      dropdownUstensils.addEventListener("click", () => {
        this.closeDropdown();
      });
    } else if (this.dataType == "ustensils") {
      dropdownIngredients.addEventListener("click", () => {
        this.closeDropdown();
      });
      dropdownAppliances.addEventListener("click", () => {
        this.closeDropdown();
      });
    }
    const banner = document.querySelector(".banner");
    banner.addEventListener("click", () => {
      this.closeDropdown();
    });
    const searchBar = document.querySelector(".search-bar");
    searchBar.addEventListener("click", () => {
      this.closeDropdown();
    });
    const main = document.querySelector("main");
    main.addEventListener("click", () => {
      this.closeDropdown();
    });
  }

  /**
   * Listeners when click on element of dropdown
   */
  initListeners() {
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
        if (this.selectedTags.has(dataElementClicked.toLowerCase())) {
          console.log("tag déjà ajouté");
        } else {
          this.createHtmlTags(dataElementClicked);
          this.selectedTags.add(dataElementClicked.toLowerCase());
          this.searchBar.recipesFilteredWithInput(
            recipes,
            this.dataType,
            this.selectedTags
          );
          this.filterElementsOfDropdown();
          // empty searchbar of dropdown is more 3 characters and click on element on dropdown
          if (this.input.value.length >= 3) {
            this.input.value = "";
          }
        }
      });
    });
  }

  /**
   * Listeners of inputs dropdowns
   */
  initListenersInput() {
    this.input.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        const searchBar = document.getElementById(`search-${this.dataType}`);
        const valueInput = searchBar.value.toLowerCase();
        this.ul.innerHTML = "";

        this.filterElementsWithInputOfDropdown(valueInput);
      } else if (e.target.value.length >= 1) {
        this.ul.innerHTML = "";
      }
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
    this.initRemoveTagListener();
  }

  /**
   * Remove tag with cross of tag
   */
  initRemoveTagListener() {
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
            this.closeDropdown();
          }
        });
      });
    });
  }
}
