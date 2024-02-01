import database from "./database.js";

class Flaws {
  constructor(hero) {
    this.hero = hero;
    this.value = [];
  }

  findFlaw(id) {
    return this.value.find((el) => el.id === id);
  }

  addFlaw(id, innate = false) {
    this.value.push({
      id: id,
      comment: "",
      innate: innate,
    });
    this.sort();
    document.dispatchEvent(new Event("resetFlaws"));
    document.dispatchEvent(new Event("resetStates"));
    this.hero.saveHero();
  }

  removeFlaw(index) {
    this.value.splice(index, 1);
    document.dispatchEvent(new Event("resetFlaws"));
    document.dispatchEvent(new Event("resetStates"));
    this.hero.saveHero();
  }

  getSum() {
    if (!database.hero.flaws) {
      return 0;
    }
    const sumOfFlaws = database.hero.flaws.reduce((sum, flaw) => {
      return sum + flaw.innate ? 0 : 1;
    });
    return sumOfFlaws;
  }

  sort() {
    this.value.sort((a, b) => {
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
