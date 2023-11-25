import Section from "../section/section.js";
import BasicElement from "./basicElement.js";
import VolkElement from "./volkElement.js";

export default class Grundlagen {
  constructor() {
    this.section = new Section("Grundlagen");
    this.nameElement = new BasicElement(this.section, "name");
    this.volkElement = new VolkElement(this.section);
    this.nameElement = new BasicElement(this.section, "konzept");
    this.nameElement = new BasicElement(this.section, "motive");
    // beschreibung
  }
}
