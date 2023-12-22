export default class Flaws {
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
