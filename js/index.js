import { recipes } from "./recipes.js";
import { Card } from "./components/index.js";
import { ApplianceManager } from "./components/ApplianceManager.js";

class App {
  constructor(recipesDB = []) {
    this.recipesDB = recipesDB;
    this.recipes = [...recipesDB];
    this.searchedAll = [];
    this.searchedUstensils = [];
    this.searchedIngredients = [];
    // this.appliance = [];
    this.applianceManager = new ApplianceManager(this);
    this.ustensils = [];
    this.Ingredients = [];
    this.labels = [];

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
    [this.applianceManager].forEach((manager) => {
      manager.labels.forEach((label) => {
        this.labels
          .push(`<div class="btn me-2 my-2 btn-${manager.color} text-white label" data-type="${manager.type}">
                      ${label} <i class="ms-2 far fa-times-circle"></i>
                    </div>`);
      });
    });

    this.update();
    this.labelsEvents();
  }

  labelsEvents() {
    document.querySelectorAll(".fa-times-circle").forEach((label) => {
      label.addEventListener("click", (e) => {
        const element = e.target.parentElement;
        console.log(element.dataset);
        // this.app.addItem(element.outerText, element.dataset);
        this.removeLabel(element.outerHTML);
        // this.app.refilter(element.dataset);
      });
    });
  }

  removeLabel(label) {
    this.labels = this.labels.filter((item) => {
      if (label !== item) return item;
    });
    this.appendLabels();
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

    this.applianceManager.labels.forEach((word) => {
      this.applianceManager.searchByAppliance(word);
    });

    this.searchedUstensils.forEach((word) => {
      this.searchByUstensils(word);
    });

    this.searchedIngredients.forEach((word) => {
      this.searchByIngredients(word);
    });

    this.searchedAll.forEach((word) => {
      this.searchEverywhere(word);
    });

    // find items to show
    this.applianceManager.findAppliance();

    this.appendCardsRecipes();
    document.querySelector(".labels").innerHTML = this.labels.join("");
  }

  searchByIngredients(word) {
    this.recipes = this.recipes.reduce((accumulator, recipe) => {
      if (this.hasIngredients(word, recipe)) {
        accumulator.push(recipe);
      }
      return accumulator;
    }, []);
  }

  searchByUstensils(word) {
    let recipesMatched = [];
    this.recipes.forEach((recipe) => {
      if (this.hasUstensils(word, recipe)) {
        recipesMatched.push(recipe);
      }
    });
    this.recipes = recipesMatched;
  }

  searchEverywhere(word) {
    let recipesMatched = [];
    this.recipes.forEach((recipe) => {
      if (
        recipe.name.toLowerCase().includes(word) ||
        recipe.description.toLowerCase().includes(word) ||
        this.hasIngredient(word, recipe) ||
        this.applianceManager.hasAppliance(word, recipe) ||
        this.hasUstensils(word, recipe)
      ) {
        recipesMatched.push(recipe);
      }
    });
    this.recipes = recipesMatched;
  }

  hasUstensils(word, recipe) {
    return recipe.ustensils.some((item) => item.toLowerCase().includes(word));
  }

  hasIngredient(word, recipe) {
    return recipe.ingredients.some((item) =>
      item.ingredient.toLowerCase().includes(word)
    );
  }
}

new App(recipes);
