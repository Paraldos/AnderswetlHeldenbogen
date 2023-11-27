import attribute from "./attribute.json" assert { type: "json" };
import grundlagen from "./grundlagen.json" assert { type: "json" };
import voelker from "./voelker.json" assert { type: "json" };
import fertigkeiten from "./fertigkeiten.json" assert { type: "json" };
import talente from "./talente.json" assert { type: "json" };

class DB {
  constructor() {
    this.characterNumber = 0;
    this.grundlagen = grundlagen;
    this.attribute = attribute;
    this.voelker = voelker;
    this.fertigkeiten = fertigkeiten;
    this.talente = talente;
    this.heroTalente = [
      { key: "magie" },
      { key: "katzenaugen" },
      { key: "eisenmagen" },
    ];
  }

  load(number) {
    localStorage.getItem("andersweltHeldenbogenNumbers");
  }

  save() {
    localStorage.setItem("");
  }

  nameToId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }

  heroTalenteContains(key) {
    return this.heroTalente.find((el) => el.key == key);
  }
}

let db = new DB();
export default db;
