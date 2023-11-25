import Section from "../section/section.js";
import BasicElement from "./basicElement.js";
import VolkElement from "./volkElement.js";
import Beschreibungelement from "./beschreibungElement.js";

export default class Grundlagen {
  constructor() {
    this.section = new Section("Grundlagen");
    new BasicElement(this.section, "name");
    new VolkElement(this.section);
    new BasicElement(this.section, "konzept");
    new BasicElement(this.section, "motive");
    new Beschreibungelement(this.section);
  }
}
