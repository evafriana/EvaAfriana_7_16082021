import { recipes } from "./recipes.js";
import { Card } from "./components/index.js";
import { ApplianceManager } from "./components/ApplianceManager.js";
import { UstensilsManager } from "./components/UstensilsManager.js";

class App {
  constructor(recipesDB = []) {
    this.recipesDB = recipesDB;
    this.recipes = [...recipesDB];
    this.applianceManager = new ApplianceManager(this);
    this.ustensilsManager = new UstensilsManager(this);
    this.labels = [];

    this.searchedAll = [];
    this.searchedUstensils = [];
    this.searchedIngredients = [];

    this.Ingredients = [];

    this.init();
  }

  init() {
    this.appendCardsRecipes(this.recipes);
    this.searchEvent();
  }

  appendCardsRecipes() {
    const cards = document.querySelector(".cards");
    cards.innerHTML = "";
    if (this.recipes.length > 0) {
      const cardsRecipes = this.recipes.map((recipe) => {
        return Card(recipe);
      });

      cards.innerHTML = cardsRecipes.join("");
    } else {
      cards.innerHTML = `<h2>Aucune recette ne correspond à votre critère… vous pouvez
      chercher « tarte aux pommes », « poisson », etc.</h2>`;
    }
  }

  appendLabels() {
    this.labels = [];
    [this.applianceManager, this.ustensilsManager].forEach((manager) => {
      manager.labels.forEach((label) => {
        this.labels
          .push(`<div class="btn me-2 my-2 btn-${manager.color} text-white label" data-type="${manager.type}">
                      ${label} <i class="ms-2 far fa-times-circle"></i>
                    </div>`);
      });
    });

    document.querySelector(".labels").innerHTML = this.labels.join("");
    this.labelsEvents();
  }

  labelsEvents() {
    document.querySelectorAll(".fa-times-circle").forEach((label) => {
      label.addEventListener("click", (e) => {
        const element = e.target.parentElement;
        this.labels = [];
        this.removeLabel(element.outerText?.trim(), element.dataset.type);
      });
    });
  }

  removeLabel(label, type) {
    switch (type) {
      case "appliance":
        this.applianceManager.removeLabel(label);
        break;
      case "ustensils":
        this.ustensilsManager.removeLabel(label);
        break;

      default:
        break;
    }
  }

  searchEvent() {
    const searchInput = document.querySelector(".search__input");
    searchInput.addEventListener("keyup", (e) => {
      const targetValue = e.target.value;
      const words = targetValue?.trim()?.toLowerCase().split(" ");

      if (words[0] === "") {
        this.searchedAll = [];
      } else {
        this.searchedAll = words.filter((word) => this.isWordLongEnough(word));
      }

      this.update();
    });
  }

  isWordLongEnough(word) {
    return word.length > 2;
  }

  update() {
    this.recipes = this.recipesDB;

    // filter recipes
    this.applianceManager.labels.forEach((word) => {
      this.applianceManager.searchByAppliance(word);
    });

    this.ustensilsManager.labels.forEach((word) => {
      this.ustensilsManager.searchByUstensils(word);
    });

    //
    this.searchedUstensils.forEach((word) => {
      this.searchByUstensils(word);
    });

    this.searchedIngredients.forEach((word) => {
      this.searchByIngredients(word);
    });

    this.searchedAll.forEach((word) => {
      this.searchEverywhere(word);
    });

    // filter items to show inside dropdowns
    this.applianceManager.findAppliance();
    this.ustensilsManager.findUstensils();

    this.appendCardsRecipes();
    this.appendLabels();
  }

  searchByIngredients(word) {
    this.recipes = this.recipes.reduce((accumulator, recipe) => {
      if (this.hasIngredients(word, recipe)) {
        accumulator.push(recipe);
      }
      return accumulator;
    }, []);
  }

  searchEverywhere(word) {
    let recipesMatched = [];
    this.recipes.forEach((recipe) => {
      if (
        recipe.name.toLowerCase().includes(word) ||
        recipe.description.toLowerCase().includes(word) ||
        this.hasIngredient(word, recipe) ||
        this.applianceManager.hasAppliance(word, recipe) ||
        this.ustensilsManager.hasUstensils(word, recipe)
      ) {
        recipesMatched.push(recipe);
      }
    });
    this.recipes = recipesMatched;
  }

  hasIngredient(word, recipe) {
    return recipe.ingredients.some((item) =>
      item.ingredient.toLowerCase().includes(word)
    );
  }
}

new App(recipes);
