export default class Flaws {
  constructor(hero) {
    this.hero = hero;
    this.value = [];
  }

  getInnateFlaws() {}

  getFlaw(id) {
    return this.value.find((el) => el.id === id);
  }

  addFlaw(id, innate = false) {
    this.value.push({
      id: id,
      comment: "",
      innate: innate,
    });
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetFlaws"));
  }

  removeFlaw(index) {
    this.value.splice(index, 1);
    this.hero.saveHero();
    document.dispatchEvent(new Event("resetFlaws"));
  }
}
