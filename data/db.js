import grundlagen from "./json/grundlagen.json" assert { type: "json" };
import attribute from "./json/attribute.json" assert { type: "json" };
import voelker from "./json/voelker.json" assert { type: "json" };
import fertigkeiten from "./json/fertigkeiten.json" assert { type: "json" };
import talente from "./json/talente.json" assert { type: "json" };

class DB {
  constructor() {
    this.grundlagen = grundlagen;
    this.attribute = attribute;
    this.fertigkeiten = fertigkeiten;
    this.voelker = voelker;
    this.talente = talente;
  }

  nameToId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}

let db = new DB();
export default db;
