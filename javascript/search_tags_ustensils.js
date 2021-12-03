import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const chevronUstensils = document.querySelector(".arrow-ustensils");
const chevronDownUstensils = document.querySelector(
  ".arrow-ustensils .fa-chevron-down"
);
const labelUstensils = document.querySelector("#label-ustensils");
const inputUstensils = document.querySelector("#search-ustensils");
const buttonUstensils = document.querySelector("#button-ustensils");
const isExpanded = buttonUstensils.getAttribute("aria-expanded");
const ulUstensils = document.querySelector(".nav-list-ustensils");
const tagsContainer = document.querySelector(".tags-container");

export class Ustensil {
  constructor(recipes) {
    this.recipes = recipes;
    console.log(this.recipes);
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    chevronDownUstensils.addEventListener("click", () =>
      this.openListOfUstensils()
    );
    labelUstensils.addEventListener("click", () => this.displayInput());
    inputUstensils.addEventListener("blur", () => this.undisplayInput());
    inputUstensils.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        const searchBarUstensil = document.getElementById("search-ustensils");
        const valueInputUstensil = searchBarUstensil.value.toLowerCase();
        ulUstensils.innerHTML = "";
        this.filterUstensilInDropdown(valueInputUstensil);
      }
    });
  }

  /**
   * Display input when click on word ustensils in button
   */
  displayInput() {
    labelUstensils.style.display = "none";
    inputUstensils.style.display = "block";
  }

  /**
   * Undisplay input when quite input focus
   */
  undisplayInput() {
    inputUstensils.style.display = "none";
    labelUstensils.style.display = "block";
  }

  /**
   * Open dropdown of ustensil when clic on down chevron
   */
  openListOfUstensils() {
    if (isExpanded === "false") {
      buttonUstensils.setAttribute("aria-expanded", "true");
    }
    let ustensilsUnduplicated = new Set();

    recipes.forEach((recipe) => {
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      recipe.ustensils.forEach((ustensil) => {
        if (recipeDom.style.display === "block") {
          ustensilsUnduplicated.add(ustensil.toLowerCase());
        }
      });
    });

    ustensilsUnduplicated = Array.from(ustensilsUnduplicated);
    this.createListUstensilsHtml(ustensilsUnduplicated);
    const liUstensil = Array.from(
      document.querySelectorAll(".nav-list-ustensils .li-ustensil")
    );
    liUstensil.forEach((ustensil) => {
      ustensil.addEventListener("click", () => {
        const dataUstensilClicked = ustensil.getAttribute("data-ustensil");
        this.createHtmlTagsUstensil(dataUstensilClicked);
        this.displayRecipesFilteredByUstensil(dataUstensilClicked);
      });
    });
  }

  /**
   * Close dropdown of ustensil when clic on up chevron
   */
  closeListOfUstensils() {
    buttonUstensils.setAttribute("aria-expanded", "false");
    chevronUstensils.innerHTML = `<span class="fas fa-chevron-down"></span>`;
    ulUstensils.innerHTML = ``;
    const chevronDownUstensils = document.querySelector(
      ".arrow-ustensils .fa-chevron-down"
    );
    chevronDownUstensils.addEventListener("click", () =>
      this.openListOfUstensils()
    );
  }

  /**
   *
   * @param {string} valueInputUstensil Value of input ustensil
   * Display ustensils in dropdown wich include the value of input ustensil
   */
  filterUstensilInDropdown(valueInputUstensil) {
    this.openListOfUstensils();
    if (isExpanded === "false") {
      buttonUstensils.setAttribute("aria-expanded", "true");
    }
    const liUstensil = Array.from(
      document.querySelectorAll(".nav-list-ustensils .li-ustensil")
    );
    liUstensil.forEach((ustensil) => {
      const dataUstensil = ustensil.getAttribute("data-ustensil");
      if (dataUstensil.includes(valueInputUstensil)) {
        ustensil.style.display = "block";
      } else {
        ustensil.style.display = "none";
      }
    });
  }

  /**
   * Create HTML for ustensil list
   */
  createListUstensilsHtml(ustensils) {
    let ustensilsUnduplicated = new Set();

    recipes.forEach((recipe) => {
      recipe.ustensils.forEach((ustensil) => {
        ustensilsUnduplicated.add(ustensil.toLowerCase());
      });
    });
    const dropdownUstensils = document.querySelector(".nav-dropdown-ustensils");
    dropdownUstensils.style.maxHeight = "23em";
    const ulUstensils = document.querySelector(".nav-list-ustensils");
    ulUstensils.innerHTML += ustensils
      .map((ustensil) => {
        return `<li class="li-ustensil" data-ustensil="${ustensil}">${ustensil}</li>`;
      })
      .join("");
    chevronUstensils.innerHTML = `<span class="fas fa-chevron-up"></span>`;
    const chevronUpUstensils = document.querySelector(
      ".arrow-ustensils .fa-chevron-up"
    );
    chevronUpUstensils.addEventListener("click", () =>
      this.closeListOfUstensils()
    );
    ulUstensils.focus();
    ulUstensils.addEventListener("blur", () => {
      this.closeListOfUstensils();
    });
  }

  /**
   *
   * @param {string} ustensil ustensil clicked
   * Add ustensil in bubble tag
   */
  createHtmlTagsUstensil(dataUstensilClicked) {
    const tag = document.createElement("div");
    tag.classList.add("tags");
    tag.setAttribute("data-tag", `${dataUstensilClicked.toLowerCase()}`);
    tag.innerHTML += `<p>${dataUstensilClicked}</p><i class="far fa-times-circle" data-ustensil="${dataUstensilClicked.toLowerCase()}"></i>`;
    tagsContainer.appendChild(tag);
    // Remove tag with cross of tag
    const crossTag = document.querySelectorAll(".fa-times-circle");
    crossTag.forEach((cross) => {
      cross.addEventListener("click", () => {
        const dataCross = cross.getAttribute("data-ustensil");
        const dataTag = tag.getAttribute("data-tag");
        if (dataCross == dataTag) {
          tag.style.display = "none";
        }
      });
    });
  }

  /**
   * Display filtered recipes with the search input for ustensils or selected the ustensil in dropdown list
   */
  displayRecipesFilteredByUstensil(matchedUstensil) {
    const arrayRecipes = Array.from(this.recipes);
    console.log(arrayRecipes);
    arrayRecipes.forEach((recipe) => {
      const ustensils = recipe.querySelectorAll(".ustensil");
      console.log(ustensils);
      let allUstensils = [];
      ustensils.forEach((ustensil) => {
        const dataUstensil = ustensil.getAttribute("data-ustensil");
        allUstensils.push(dataUstensil);
      });
      const ustensilFound = allUstensils.some((ustensil) =>
        ustensil.toUpperCase().includes(matchedUstensil.toUpperCase())
      );
      console.log(allUstensils);
      console.log(ustensilFound);
      if (ustensilFound) {
        recipe.style.display = "block";
        console.log(recipe);
      } else {
        recipe.style.display = "none";
      }
    });
  }
}
