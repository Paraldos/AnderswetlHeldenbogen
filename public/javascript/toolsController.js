import database from "../data/database.js";

class ToolsController {
  constructor() {}

  getHeroList() {
    return database.hero.items ? database.hero.items : [];
  }

  getHeroItem(index) {
    return database.hero.items[index];
  }

  add() {
    if (!database.hero.items) database.hero.items = [];
    database.hero.items.push({ name: "", description: "", bonus: 0, pool: 0 });
    database.saveHero();
    document.dispatchEvent(new Event("resetItems"));
  }

  remove(index) {
    database.hero.items.splice(index, 1);
    database.saveHero();
    document.dispatchEvent(new Event("resetItems"));
  }

  changeName(index, newName) {
    database.hero.items[index].name = newName;
    database.saveHero();
  }

  changeBonus(index, newBonus) {
    database.hero.items[index].bonus = newBonus;
    database.saveHero();
  }

  changePool(index, newPool) {
    database.hero.items[index].pool = newPool;
    database.saveHero();
  }

  changeDescription(index, newDescription) {
    database.hero.items[index].description = newDescription;
    database.saveHero();
  }
}

let toolsController = new ToolsController();
export default toolsController;
