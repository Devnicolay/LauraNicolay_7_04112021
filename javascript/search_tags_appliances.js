import { recipes } from "./data_recipes/recipes_data.js";

/**
 * DOM
 */
const chevronAppliances = document.querySelector(".arrow-appliances");
const chevronDownAppliances = document.querySelector(
  ".arrow-appliances .fa-chevron-down"
);
const labelAppliances = document.querySelector("#label-appliances");
const inputAppliances = document.querySelector("#search-appliances");
const buttonAppliances = document.querySelector("#button-appliances");
const isExpanded = buttonAppliances.getAttribute("aria-expanded");
const ulAppliances = document.querySelector(".nav-list-appliances");
const tagsContainer = document.querySelector(".tags-container");

export class Appliance {
  constructor(recipes) {
    this.recipes = recipes;
    console.log(this.recipes);
    this.initListeners();
  }

  /**
   * Listeners
   */
  initListeners() {
    chevronDownAppliances.addEventListener("click", () =>
      this.openListOfAppliances()
    );
    labelAppliances.addEventListener("click", () => this.displayInput());
    inputAppliances.addEventListener("blur", () => this.undisplayInput());
    inputAppliances.addEventListener("keydown", (e) => {
      if (e.target.value.length >= 3) {
        const searchBarAppliance = document.getElementById("search-appliances");
        const valueInputAppliance = searchBarAppliance.value.toLowerCase();
        ulAppliances.innerHTML = "";
        this.filterApplianceInDropdown(valueInputAppliance);
      }
    });
  }

  /**
   * Display input when click on word appliances in button
   */
  displayInput() {
    labelAppliances.style.display = "none";
    inputAppliances.style.display = "block";
  }

  /**
   * Undisplay input when quite input focus
   */
  undisplayInput() {
    inputAppliances.style.display = "none";
    labelAppliances.style.display = "block";
  }

  /**
   * Open dropdown of appliance when clic on down chevron
   */
  openListOfAppliances() {
    if (isExpanded === "false") {
      buttonAppliances.setAttribute("aria-expanded", "true");
    }
    let appliancesUnduplicated = new Set();

    recipes.forEach((recipe) => {
      const recipeDom = document.querySelector(
        `article[data-id="${recipe.id}"]`
      );
      if (recipeDom.style.display === "block") {
        appliancesUnduplicated.add(recipe.appliance.toLowerCase());
      }
    });

    appliancesUnduplicated = Array.from(appliancesUnduplicated);
    this.createListAppliancesHtml(appliancesUnduplicated);
    const liAppliance = Array.from(
      document.querySelectorAll(".nav-list-appliances .li-appliance")
    );
    liAppliance.forEach((appliance) => {
      appliance.addEventListener("click", () => {
        const dataApplianceClicked = appliance.getAttribute("data-appliance");
        this.createHtmlTagsAppliance(dataApplianceClicked);
        this.displayRecipesFilteredByAppliance(dataApplianceClicked);
      });
    });
  }

  /**
   * Close dropdown of appliance when clic on up chevron
   */
  closeListOfAppliances() {
    buttonAppliances.setAttribute("aria-expanded", "false");
    chevronAppliances.innerHTML = `<span class="fas fa-chevron-down"></span>`;
    ulAppliances.innerHTML = ``;
    const chevronDownAppliances = document.querySelector(
      ".arrow-appliances .fa-chevron-down"
    );
    chevronDownAppliances.addEventListener("click", () =>
      this.openListOfAppliances()
    );
  }

  /**
   *
   * @param {string} valueInputAppliance Value of input appliance
   * Display appliances in dropdown wich include the value of input appliance
   */
  filterApplianceInDropdown(valueInputAppliance) {
    this.openListOfAppliances();
    if (isExpanded === "false") {
      buttonAppliances.setAttribute("aria-expanded", "true");
    }
    const liAppliance = Array.from(
      document.querySelectorAll(".nav-list-appliances .li-appliance")
    );
    liAppliance.forEach((appliance) => {
      const dataAppliance = appliance.getAttribute("data-appliance");
      if (dataAppliance.includes(valueInputAppliance)) {
        appliance.style.display = "block";
      } else {
        appliance.style.display = "none";
      }
    });
  }

  /**
   * Create HTML for appliance list
   */
  createListAppliancesHtml(appliances) {
    let appliancesUnduplicated = new Set();

    recipes.forEach((recipe) => {
      appliancesUnduplicated.add(recipe.appliance.toLowerCase());
    });
    const dropdownAppliances = document.querySelector(
      ".nav-dropdown-appliances"
    );
    dropdownAppliances.style.maxHeight = "23em";
    const ulAppliances = document.querySelector(".nav-list-appliances");
    ulAppliances.innerHTML += appliances
      .map((appliance) => {
        return `<li class="li-appliance" data-appliance="${appliance}">${appliance}</li>`;
      })
      .join("");
    chevronAppliances.innerHTML = `<span class="fas fa-chevron-up"></span>`;
    const chevronUpAppliances = document.querySelector(
      ".arrow-appliances .fa-chevron-up"
    );
    chevronUpAppliances.addEventListener("click", () =>
      this.closeListOfAppliances()
    );
    ulAppliances.focus();
    ulAppliances.addEventListener("blur", () => {
      this.closeListOfAppliances();
    });
  }

  /**
   *
   * @param {string} appliance appliance clicked
   * Add appliance in bubble tag
   */
  createHtmlTagsAppliance(dataApplianceClicked) {
    const tag = document.createElement("div");
    tag.classList.add("tags");
    tag.setAttribute("data-tag", `${dataApplianceClicked.toLowerCase()}`);
    tag.innerHTML += `<p>${dataApplianceClicked}</p><i class="far fa-times-circle" data-appliance="${dataApplianceClicked.toLowerCase()}"></i>`;
    tagsContainer.appendChild(tag);
    // Remove tag with cross of tag
    const crossTag = document.querySelectorAll(".fa-times-circle");
    crossTag.forEach((cross) => {
      cross.addEventListener("click", () => {
        const dataCross = cross.getAttribute("data-appliance");
        const dataTag = tag.getAttribute("data-tag");
        if (dataCross == dataTag) {
          tag.style.display = "none";
        }
      });
    });
  }

  /**
   * Display filtered recipes with the search input for appliances or selected the appliance in dropdown list
   */
  displayRecipesFilteredByAppliance(matchedAppliance) {
    const arrayRecipes = Array.from(this.recipes);
    console.log(arrayRecipes);
    arrayRecipes.forEach((recipe) => {
      const appliances = recipe.querySelectorAll(".appliance");
      console.log(appliances);
      let allAppliances = [];
      appliances.forEach((appliance) => {
        const dataAppliance = appliance.getAttribute("data-appliance");
        allAppliances.push(dataAppliance);
      });
      const applianceFound = allAppliances.some((appliance) =>
        appliance.toUpperCase().includes(matchedAppliance.toUpperCase())
      );
      console.log(allAppliances);
      console.log(applianceFound);
      if (applianceFound) {
        recipe.style.display = "block";
        console.log(recipe);
      } else {
        recipe.style.display = "none";
      }
    });
  }
}
