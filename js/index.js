import { recipes } from "./recipes.js";
import { Card } from "./components/Card.js";
import { ApplianceManager } from "./components/ApplianceManager.js";
import { UstensilsManager } from "./components/UstensilsManager.js";
import { IngredientsManager } from "./components/IngredientsManager.js";

class App {
  constructor(recipesDB = []) {
    this.recipesDB = recipesDB;
    this.recipes = [...recipesDB];
    this.applianceManager = new ApplianceManager(this);
    this.ustensilsManager = new UstensilsManager(this);
    this.ingredientsManager = new IngredientsManager(this);
    this.labels = [];

    this.searchedWords = [];

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
    [
      this.ingredientsManager,
      this.applianceManager,
      this.ustensilsManager,
    ].forEach((manager) => {
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
        this.deleteLabel(label, this.applianceManager);
        break;
      case "ustensils":
        this.deleteLabel(label, this.ustensilsManager);
        break;
      case "ingredients":
        this.ingredientsManager.removeLabel(label);
        break;
      default:
        break;
    }
  }

  deleteLabel(text, obj) {
    const result = [];
    obj.labels.forEach((label) => {
      if (label.toLowerCase() !== text.toLowerCase()) result.push(label);
    });
    obj.labels = result;
    obj.app.update();
  }

  searchEvent() {
    const searchInput = document.querySelector(".search__input");
    searchInput.addEventListener("input", (e) => {
      const targetValue = e.target.value;
      const words = targetValue?.trim()?.toLowerCase().split(" ");

      if (words[0] === "") {
        this.searchedWords = [];
      } else {
        this.searchedWords = words.filter((word) =>
          this.isWordLongEnough(word)
        );
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

    this.ingredientsManager.labels.forEach((word) => {
      this.ingredientsManager.searchByIngredients(word);
    });

    this.searchedWords.forEach((word) => {
      this.searchEverywhere(word);
    });

    // filter items to show inside dropdowns
    this.applianceManager.findAppliance();
    this.ustensilsManager.findUstensils();
    this.ingredientsManager.findIngredients();

    // append elements in page
    this.appendCardsRecipes();
    this.appendLabels();
  }

  searchEverywhere(word) {
    let recipesMatched = [];
    this.recipes.forEach((recipe) => {
      if (
        recipe.name.toLowerCase().includes(word) ||
        recipe.description.toLowerCase().includes(word) ||
        this.applianceManager.hasAppliance(word, recipe) ||
        this.ustensilsManager.hasUstensils(word, recipe) ||
        this.ingredientsManager.hasIngredients(word, recipe)
      ) {
        recipesMatched.push(recipe);
      }
    });
    this.recipes = recipesMatched;
  }
}

new App(recipes);
