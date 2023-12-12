import grundlagen from "./json/grundlagen.json" assert { type: "json" };
import attribute from "./json/attribute.json" assert { type: "json" };
import voelker from "./json/voelker.json" assert { type: "json" };
import fertigkeiten from "./json/fertigkeiten.json" assert { type: "json" };

import talents from "./json/talents.json" assert { type: "json" };
import flaws from "./json/flaws.json" assert { type: "json" };

class DB {
  // Test
  constructor() {
    this.grundlagen = grundlagen;
    this.voelker = voelker;
    this.attribute = attribute;
    this.fertigkeiten = fertigkeiten;
    this.talents = talents;
    this.flaws = flaws;
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
