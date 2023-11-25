import attribute from "./attribute.json" assert { type: "json" };

export default class DB {
  constructor() {
    this.attribute = attribute;
  }
}
