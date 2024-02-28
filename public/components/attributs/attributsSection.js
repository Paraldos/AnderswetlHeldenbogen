import Section from "../section/section.js";
import AttributsSectionItem from "./attributsSectionItem.js";
import attributsController from "../../javascript/attributesController.js";

export default class AttributsSection extends Section {
  constructor() {
    super("Attribute", "attributs");
    Object.keys(attributsController.getHeroList()).map(
      (key) => new AttributsSectionItem(key, this)
    );
    document.addEventListener("updateAttributsHeader", () => this.update());
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.update();
  }

  update() {
    const visible = this.editToggle ? "" : "disabled";
    this.header.innerHTML = `Attribute <span class="${visible}">(${attributsController.getHeroSum()})</span>`;
  }
}
