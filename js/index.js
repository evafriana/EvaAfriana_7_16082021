import { recipes } from "./recipes.js";
import { Mapping } from "./components/Mapping.js";
import { Card } from "./components/Card.js";
import { ApplianceManager } from "./components/ApplianceManager.js";
import { UstensilsManager } from "./components/UstensilsManager.js";
import { IngredientsManager } from "./components/IngredientsManager.js";

class App {
  // to build application
  constructor(recipes = []) {
    this.recipesDB = recipes;
    this.recipes = recipes;
    this.mapping = new Mapping(this);
    this.applianceManager = new ApplianceManager(this);
    this.ustensilsManager = new UstensilsManager(this);
    this.ingredientsManager = new IngredientsManager(this);

    this.searchedWords = [];
    this.labels = [];

    this.init();
  }

  // constructor call
  init() {
    this.appendCardsRecipes();
    this.searchEvent();
  }

  // append recipes to the cards
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

  // to check the number of letters entered is more than two characters
  wordLength(word) {
    return word.length > 2;
  }

  // to find id of each word from recipes
  findIds(item) {
    const word = new RegExp(item);
    const obj = this.mapping.mapping;
    let key,
      keys = new Set([]);
    for (key in obj) {
      if (word.test(key)) {
        obj[key]?.forEach((key) => keys.add(key));
      }
    }
    return Array.from(keys);
  }

  // input searched words
  searchEvent() {
    const searchInput = document.querySelector(".search__input");
    searchInput.addEventListener("input", (e) => {
      const targetValue = e.target.value;
      const words = targetValue?.trim()?.toLowerCase().split(" ");

      this.searchedWords = words.filter((word) => this.wordLength(word));
      this.update();
    });
  }

  // search through mapping
  searchByMapping(words) {
    let result = [];
    let turn = 0;
    words.forEach((word) => {
      if (turn < 1) {
        result = this.findIds(word);
      } else {
        const temp = [...result];
        result = [];
        const ids = this.findIds(word);
        ids.forEach((id) => {
          if (temp.includes(id)) result.push(id);
        });
      }
      turn++;
    });

    if (words.length > 0) {
      this.recipesToDisplay(result);
    } else {
      this.recipes = this.recipesDB;
      this.appendCardsRecipes();
    }
  }

  // display recipes
  recipesToDisplay(ids) {
    this.recipes = this.recipesDB.reduce((acc, recipe) => {
      if (ids.includes(recipe.id)) {
        acc.push(recipe);
      }

      return acc;
    }, []);

    this.appendCardsRecipes();
  }

  // append labels
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

  // click label to delete
  labelsEvents() {
    document.querySelectorAll(".fa-times-circle").forEach((label) => {
      label.addEventListener("click", (e) => {
        const element = e.target.parentElement;
        this.labels = [];
        this.removeLabel(element.outerText?.trim(), element.dataset.type);
      });
    });
  }

  // delete label by type
  removeLabel(label, type) {
    switch (type) {
      case "appliance":
        this.deleteLabel(label, this.applianceManager);
        break;
      case "ustensils":
        this.deleteLabel(label, this.ustensilsManager);
        break;
      case "ingredients":
        this.deleteLabel(label, this.ingredientsManager);
        break;
      default:
        break;
    }
  }

  // delete label
  deleteLabel(text, obj) {
    const result = [];
    obj.labels.forEach((label) => {
      if (label.toLowerCase() !== text.toLowerCase()) result.push(label);
    });
    obj.labels = result;
    obj.app.update();
  }

  // update page by label and mapping for recipes
  update() {
    this.appendLabels();

    const allWords = [
      ...this.applianceManager.labels,
      ...this.ustensilsManager.labels,
      ...this.ingredientsManager.labels,
    ].reduce((acc, words) => {
      const res = words.split(" ")?.filter((word) => this.wordLength(word));
      acc.push(...res);
      return acc;
    }, []);
    this.searchByMapping([...allWords, ...this.searchedWords]);
    this.applianceManager.resetItemDropdown();
    this.ustensilsManager.resetItemDropdown();
    this.ingredientsManager.resetItemDropdown();
  }
}

new App(recipes);
