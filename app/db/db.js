import attribute from "./attribute.json" assert { type: "json" };
import voelker from "./voelker.json" assert { type: "json" };
import fertigkeiten from "./fertigkeiten.json" assert { type: "json" };
import talente from "./talente.json" assert { type: "json" };

class DB {
  constructor() {
    this.heroList = [];
    this.updateHeroList();
    this.setBasics();
    this.saveHero();
  }

  setBasics() {
    this.grundlagen = {
      infos: {
        name: { title: "Name" },
        volk: { title: "Volk" },
        konzept: { title: "Konzept" },
        motive: { title: "Motive" },
        beschreibung: { title: "Beschreibung" },
      },
      values: {
        name: "",
        volk: "",
        konzept: "",
        motive: "",
        beschreibung: "",
      },
    };

    // infos
    this.attribute = attribute;
    this.fertigkeiten = fertigkeiten;
    this.heroTalente = [];
    // valus
    this.voelker = voelker;
    this.talente = talente;
  }

  updateHeroList() {
    this.heroList = JSON.parse(localStorage.getItem("andersweltHeroList"));
  }

  newHero() {
    this.setBasics();
    this.saveHero();
    this.updateHeroList();
  }

  loadHero(hero) {
    this.setBasics();
  }

  saveHero() {
    console.log(this.grundlagen);
    // localStorage.setItem("andersweltHeroList");
  }

  nameToId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }

  searchHeldenTalente(key) {
    return this.heroTalente.find((el) => el.key == key);
  }
}

let db = new DB();
export default db;
