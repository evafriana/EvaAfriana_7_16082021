export class Mapping {
  constructor(app) {
    this.app = app;
    this.mapping = {};
    this.applianceMap = {};

    this.buildMapping();
  }

  addId(item, id, obj) {
    const key = this.standardize(item).toLowerCase();
    if (this.app.wordLength(key)) {
      if (!obj[key]) {
        obj[key] = new Set();
      }
      obj[key].add(id);
    }
  }

  standardize(word) {
    return word.replace(/[&/\\#,+()$~%.'":*?<>{}0-9]/g, "");
  }

  buildMapping() {
    this.app.recipesDB.forEach((recipe) => {
      recipe.name.split(" ").forEach((item) => {
        this.addId(item, recipe.id, this.mapping);
      });
      recipe.description.split(" ").forEach((item) => {
        this.addId(item, recipe.id, this.mapping);
      });
      this.applianceMapping(recipe);
      this.ustensilsMApping(recipe);
      this.ingredientsMApping(recipe);
    });
    console.log(this.applianceMap);
  }

  applianceMapping(recipe) {
    return recipe.appliance.split(" ").forEach((item) => {
      this.addId(item, recipe.id, this.mapping);
      this.addId(item, recipe.id, this.applianceMap);
    });
  }

  ustensilsMApping(recipe) {
    return recipe.ustensils.forEach((ustensil) => {
      ustensil.split(" ").forEach((item) => {
        this.addId(item, recipe.id, this.mapping);
      });
    });
  }

  ingredientsMApping(recipe) {
    recipe.ingredients.forEach(({ ingredient }) => {
      ingredient.split(" ").forEach((item) => {
        this.addId(item, recipe.id, this.mapping);
      });
    });
  }
}
