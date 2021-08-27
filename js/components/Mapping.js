export class Mapping {
  // to build map
  constructor(app) {
    this.app = app;
    this.mapping = {};
    this.appliance = new Set();
    this.ustensils = new Set();
    this.ingredients = new Set();

    this.buildMapping();
  }

  // add id of recipe to each word
  addId(key, id, obj) {
    if (this.app.wordLength(key)) {
      if (!obj[key]) {
        obj[key] = new Set();
      }
      obj[key].add(id);
    }
  }

  //remove special caracter
  standardize(word) {
    return word.replace(/[&/\\#,+()$~%.'":*?<>{}0-9]/g, "").toLowerCase();
  }

  // map all the words from the recipes
  buildMapping() {
    this.app.recipesDB.forEach((recipe) => {
      recipe.name.split(" ").forEach((item) => {
        const word = this.standardize(item);
        this.addId(word, recipe.id, this.mapping);
      });
      recipe.description.split(" ").forEach((item) => {
        const word = this.standardize(item);
        this.addId(word, recipe.id, this.mapping);
      });
      this.applianceMapping(recipe);
      this.ustensilsMApping(recipe);
      this.ingredientsMApping(recipe);
    });
  }

  // map all appliance
  applianceMapping(recipe) {
    this.appliance.add(this.standardize(recipe.appliance));

    recipe.appliance.split(" ").forEach((item) => {
      const word = this.standardize(item);
      this.addId(word, recipe.id, this.mapping);
    });
  }

  // map all ustensils
  ustensilsMApping(recipe) {
    recipe.ustensils.forEach((ustensil) => {
      this.ustensils.add(this.standardize(ustensil));

      ustensil.split(" ").forEach((item) => {
        const word = this.standardize(item);
        this.addId(word, recipe.id, this.mapping);
      });
    });
  }

  // map all ingredients
  ingredientsMApping(recipe) {
    recipe.ingredients.forEach(({ ingredient }) => {
      this.ingredients.add(this.standardize(ingredient));

      ingredient.split(" ").forEach((item) => {
        const word = this.standardize(item);
        this.addId(word, recipe.id, this.mapping);
      });
    });
  }
}
