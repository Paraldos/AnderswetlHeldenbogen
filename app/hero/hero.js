import db from "../db/db.js";

class Hero {
  constructor() {
    this.heroIndex = null;
    this.arrayOfHeros = [];
    this.grundlagen = {};
    this.attribute = {};
    this.fertigkeiten = {};

    this.updateHeroIndex();
    this.updateArrayOfHeros();
    this.getStartHero();
  }

  getStartHero() {
    this.heroIndex != null ? this.loadHero(this.heroIndex) : this.newHero();
  }

  updateHeroIndex() {
    this.heroIndex = localStorage.getItem("andersweltHeroIndex")
      ? Number(localStorage.getItem("andersweltHeroIndex"))
      : null;
  }

  updateArrayOfHeros() {
    this.arrayOfHeros = localStorage.getItem("andersweltArrayOfHeros")
      ? JSON.parse(localStorage.getItem("andersweltArrayOfHeros"))
      : [];
  }

  resetHero() {
    this.grundlagen = {};
    for (let el in db.grundlagen) {
      this.grundlagen[el] = "";
    }

    this.attribute = {};
    for (let el in db.attribute) {
      this.attribute[el] = { value: 0, bonus: 0 };
    }

    this.fertigkeiten = {};
    for (let el in db.fertigkeiten) {
      this.fertigkeiten[el] = { value: 0, bonus: 0 };
    }
  }

  newHero() {
    this.heroIndex = this.arrayOfHeros.length;
    this.resetHero();
    this.saveHero();
    this.updateArrayOfHeros();
  }

  loadHero(index) {
    this.heroIndex = index;
    this.resetHero();
    this.grundlagen = this.arrayOfHeros[index].grundlagen;
    this.attribute = this.arrayOfHeros[index].attribute;
    this.fertigkeiten = this.arrayOfHeros[index].fertigkeiten;
  }

  saveHero() {
    let hero = {
      grundlagen: this.grundlagen,
      attribute: this.attribute,
      fertigkeiten: this.fertigkeiten,
    };
    this.arrayOfHeros[this.heroIndex] = hero;
    localStorage.setItem("andersweltHeroIndex", this.heroIndex);
    localStorage.setItem(
      "andersweltArrayOfHeros",
      JSON.stringify(this.arrayOfHeros)
    );
  }
}

let hero = new Hero();
export default hero;
