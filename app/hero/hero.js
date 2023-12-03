import db from "../db/db.js";

class Hero {
  constructor() {
    this.heroIndex = localStorage.getItem("andersweltHeroIndex")
      ? Number(localStorage.getItem("andersweltHeroIndex"))
      : null;
    this.arrayOfHeros = localStorage.getItem("andersweltArrayOfHeros")
      ? JSON.parse(localStorage.getItem("andersweltArrayOfHeros"))
      : [];
    this.grundlagen = {};
    this.attribute = {};
    this.fertigkeiten = {};

    if (this.heroIndex != null) {
      this.loadHero();
    } else {
      this.newHero();
    }
  }

  newHero() {
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

    this.heroIndex = this.arrayOfHeros.length;
    this.saveHero();
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

  loadHero() {
    console.log(this.arrayOfHeros);
    this.grundlagen = this.arrayOfHeros[this.heroIndex].grundlagen;
    this.attribute = this.arrayOfHeros[this.heroIndex].attribute;
    this.fertigkeiten = this.arrayOfHeros[this.heroIndex].fertigkeiten;
  }
}

let hero = new Hero();
export default hero;
