import db from "./db.js";
import VolksController from "./volksController.js";
import TalenteController from "./talenteController.js";
import VeranlagungsController from "./veranlagungsController.js";

class Hero {
  constructor() {
    this.arrayOfHeros = [];
    this.heroIndex = null;
    this.volksController = new VolksController(this);
    this.talenteController = new TalenteController(this);
    this.veranlagungsController = new VeranlagungsController(this);

    this.getArrayOfHeros();
    this.getHeroIndex();
    this.getStartHero();

    console.log(this.arrayOfHeros[this.heroIndex]);
  }

  getArrayOfHeros() {
    this.arrayOfHeros = localStorage.getItem("andersweltArrayOfHeros")
      ? JSON.parse(localStorage.getItem("andersweltArrayOfHeros"))
      : [];
  }

  getHeroIndex() {
    this.heroIndex = localStorage.getItem("andersweltHeroIndex")
      ? Number(localStorage.getItem("andersweltHeroIndex"))
      : null;
    if (this.heroIndex == null) return;
    if (this.heroIndex > this.arrayOfHeros.length - 1) {
      this.heroIndex = this.arrayOfHeros.length - 1;
    }
    if (this.heroIndex < 0) this.heroIndex = null;
  }

  getStartHero() {
    if (this.heroIndex === null && this.arrayOfHeros.length) {
      this.setHeroIndex(0);
    }
    if (this.heroIndex !== null) {
      this.loadHero(this.heroIndex);
    }
  }

  setArrayOfHeros(array = null) {
    if (array) this.arrayOfHeros = array;
    localStorage.setItem(
      "andersweltArrayOfHeros",
      JSON.stringify(this.arrayOfHeros)
    );
  }

  setHeroIndex(index = false) {
    if (index) this.heroIndex = index;
    if (this.heroIndex < 0) localStorage.removeItem("andersweltHeroIndex");
    else localStorage.setItem("andersweltHeroIndex", this.heroIndex);
  }

  resetHero() {
    this.grundlagen = {};
    for (let el in db.grundlagen) {
      this.grundlagen[el] = "";
    }

    this.attribute = {};
    for (let el in db.attribute) {
      this.attribute[el] = { value: 1 };
    }

    this.fertigkeiten = {};
    for (let el in db.fertigkeiten) {
      this.fertigkeiten[el] = { value: 0 };
    }

    this.talente = [];

    this.schwaechen = [];
  }

  newHero() {
    this.heroIndex = this.arrayOfHeros.length;
    this.resetHero();
    this.saveHero();
    this.getArrayOfHeros();
  }

  loadHero(index) {
    this.heroIndex = index;
    this.setHeroIndex();
    this.resetHero();
    this.grundlagen = this.arrayOfHeros[index].grundlagen;
    this.attribute = this.arrayOfHeros[index].attribute;
    this.fertigkeiten = this.arrayOfHeros[index].fertigkeiten;
    this.talente = this.arrayOfHeros[index].talente;
    this.schwaechen = this.arrayOfHeros[index].schwaechen;
  }

  saveHero() {
    let hero = {
      grundlagen: this.grundlagen,
      attribute: this.attribute,
      fertigkeiten: this.fertigkeiten,
      talente: this.talente,
      schwaechen: this.schwaechen,
    };
    this.arrayOfHeros[this.heroIndex] = hero;
    this.setHeroIndex();
    this.setArrayOfHeros();
  }

  removeHero(index) {
    // array
    this.arrayOfHeros.splice(index, 1);
    this.setArrayOfHeros();
    this.getHeroIndex();
    // reset
    this.getStartHero();
  }
}

let hero = new Hero();
export default hero;
