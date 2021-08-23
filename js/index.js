import { recipes } from "./recipes.js";
import { Mapping } from "./components/Mapping.js";
import { Card } from "./components/Card.js";

class App {
  constructor(recipes = []) {
    this.recipesDB = recipes;
    this.recipes = recipes;
    this.mapping = new Mapping(this);

    this.init();
  }

  init() {
    this.searchEvent();
    this.appendCardsRecipes();
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

  wordLength(word) {
    return word.length > 2;
  }

  searchEvent() {
    const searchInput = document.querySelector(".search__input");
    searchInput.addEventListener("input", (e) => {
      const targetValue = e.target.value;
      const words = targetValue?.trim()?.toLowerCase().split(" ");

      const searchedWords = words.filter((word) => this.wordLength(word));
      this.searchByMapping(searchedWords);
    });
  }

  findIds(item) {
    const word = new RegExp(item);
    const obj = this.mapping.mapping;
    let key,
      keys = new Set([]);
    for (key in obj) {
      if (word.test(key)) {
        keys.add(...obj[key]);
      }
    }
    return Array.from(keys);
  }

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

  recipesToDisplay(ids) {
    this.recipes = this.recipesDB.reduce((acc, recipe) => {
      if (ids.includes(recipe.id)) {
        acc.push(recipe);
      }

      return acc;
    }, []);

    this.appendCardsRecipes();
  }
}

new App(recipes);
