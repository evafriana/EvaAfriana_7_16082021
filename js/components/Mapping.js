export class Mapping {
  constructor(app) {
    this.app = app;
    this.mapping = {};

    this.buildMapping();
  }

  addId(item, id) {
    const key = this.standardize(item).toLowerCase();
    if (this.app.wordLength(key)) {
      if (!this.mapping[key]) {
        this.mapping[key] = new Set();
      }
      this.mapping[key].add(id);
    }
  }

  standardize(word) {
    return word.replace(/[&/\\#,+()$~%.'":*?<>{}0-9]/g, "");
  }

  buildMapping() {
    this.app.recipesDB.forEach((recipe) => {
      recipe.name.split(" ").forEach((item) => {
        this.addId(item, recipe.id);
      });
      recipe.description.split(" ").forEach((item) => {
        this.addId(item, recipe.id);
      });
      recipe.appliance.split(" ").forEach((item) => {
        this.addId(item, recipe.id);
      });
      recipe.ustensils.forEach((ustensil) => {
        ustensil.split(" ").forEach((item) => {
          this.addId(item, recipe.id);
        });
      });
      recipe.ingredients.forEach(({ ingredient }) => {
        ingredient.split(" ").forEach((item) => {
          this.addId(item, recipe.id);
        });
      });
    });
  }
}
