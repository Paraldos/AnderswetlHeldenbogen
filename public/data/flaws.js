import database from "./database.js";

class Flaws {
  constructor(hero) {
    this.hero = hero;
    this.value = [];
  }

  findFlaw(id) {
    if (!database.hero.flaws) return false;
    return database.hero.flaws.find((el) => el.id === id);
  }

  addFlaw(id, innate = false) {
    if (!database.hero.flaws) {
      database.hero.flaws = [];
    }
    database.hero.flaws.push({
      id: id,
      comment: "",
      innate: innate,
    });
    this.sort();
    document.dispatchEvent(new Event("resetFlaws"));
    document.dispatchEvent(new Event("resetStates"));
    database.saveHero();
  }

  removeFlaw(index) {
    database.hero.flaws.splice(index, 1);
    document.dispatchEvent(new Event("resetFlaws"));
    document.dispatchEvent(new Event("resetStates"));
    database.saveHero();
  }

  getSum() {
    if (!database.hero.flaws) return 0;
    if (database.hero.flaws.length === 0) return 0;
    let sum = 0;
    database.hero.flaws.forEach((el) => {
      if (!el.innate) sum++;
    });
    return sum;
  }

  sort() {
    database.hero.flaws.sort((a, b) => {
      if (a.id < b.id) {
        return -1;
      }
      if (a.id > b.id) {
        return 1;
      }
      return 0;
    });
  }

  // ============================== innate
  removeInnateFlaws() {
    this.value = this.value.filter((el) => !el.innate);
  }

  addInnateFlaws(dbEntry) {
    if (dbEntry === undefined) return;
    dbEntry.flaws.forEach((id) => {
      if (this.findFlaw(id)) this.getFlaw(id).innate = true;
      else this.addFlaw(id, true);
    });
  }
}

const flaws = new Flaws();
export default flaws;
