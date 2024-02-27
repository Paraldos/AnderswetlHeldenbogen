import database from "../data/database.js";

class ConsumablesController {
  getHeroList() {
    return database.hero.consumables ? database.hero.consumables : [];
  }

  add() {
    if (!database.hero.consumables) database.hero.consumables = [];
    database.hero.consumables.push({ name: "", value: 0 });
    database.saveHero();
    document.dispatchEvent(new Event("resetConsumables"));
  }

  increase(index) {
    database.hero.consumables[index].value++;
    database.saveHero();
    document.dispatchEvent(new Event("updateConsumables"));
  }

  reduce(index) {
    database.hero.consumables[index].value = Math.max(
      0,
      database.hero.consumables[index].value - 1
    );
    database.saveHero();
    document.dispatchEvent(new Event("updateConsumables"));
  }

  changeName(index, newName) {
    database.hero.consumables[index].name = newName;
    database.saveHero();
  }

  remove(index) {
    database.hero.consumables.splice(index, 1);
    database.saveHero();
    document.dispatchEvent(new Event("resetConsumables"));
  }
}

let consumablesController = new ConsumablesController();
export default consumablesController;
