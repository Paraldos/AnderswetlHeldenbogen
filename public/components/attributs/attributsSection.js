import Section from "../section/section.js";
import AttributsSectionItem from "./attributsSectionItem.js";
import attributsController from "../../javascript/attributesController.js";

export default class AttributsSection extends Section {
  constructor() {
    super("Attribute", "attributs");
    Object.keys(attributsController.getHeroList()).map(
      (key) => new AttributsSectionItem(key, this)
    );
    document.addEventListener("updateAttributsHeader", () =>
      this.onUpdateAttributsHeader()
    );
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.onUpdateAttributsHeader();
  }

  onUpdateAttributsHeader() {
    const heroSum = attributsController.getHeroSum();
    const disabled = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Attribute <span class="${disabled}">(${heroSum})</span>`;
  }
}
