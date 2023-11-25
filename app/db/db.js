import attribute from "./attribute.json" assert { type: "json" };
import grundlagen from "./grundlagen.json" assert { type: "json" };

class DB {
  constructor() {
    this.grundlagen = grundlagen;
    this.attribute = attribute;
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
