import Section from "../section/section.js";
import SimpleElement from "./simpleElement.js";
// import EthnicityElement from "./ethnicityElement.js";
// import DescriptionElement from "./descriptionElement.js";

export default class BasicsInformationSection {
  constructor() {
    this.section = new Section("Grundlagen", "basics");
    new SimpleElement(this.section.contentContainer, "name");
    // new EthnicityElement(this.section.contentContainer);
    new SimpleElement(this.section.contentContainer, "konzept");
    new SimpleElement(this.section.contentContainer, "motive");
    // new DescriptionElement(this.section);
  }
}
