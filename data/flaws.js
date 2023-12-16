export default class Flaws {
  constructor(hero) {
    this.hero = hero;
    this.value = [];
  }

  removeInnateFlaws() {
    this.value = this.value.filter((el) => !el.innate);
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
}
