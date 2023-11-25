import Section from "../section/section.js";
import NameElement from "./nameElement.js";

export default class Grundlagen {
  constructor() {
    this.section = new Section("Grundlagen");
    this.nameElement = new NameElement(this.section);
  }
}
