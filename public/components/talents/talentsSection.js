import talentsController from "../../javascript/talentsController.js";
import Section from "../section/section.js";
import ListOfTalents from "./listOfTalents.js";
import TalentsSectionItem from "./talentsSectionItem.js";

export default class TalentsSection extends Section {
  constructor() {
    super("Talente", "talents", true);
    this.types = talentsController.types;
    this.initSection();
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    document.addEventListener("resetTalents", () => this.initSection());
    document.addEventListener("resetTalentHeader", () => this.update());
  }

  onToggleEdit() {
    super.onToggleEdit();
    this.update();
    this.updateVisibility();
  }

  initSection() {
    this.content.innerHTML = "";
    this.initContainer();
    this.initTalents();
    this.updateVisibility();
    this.update();
  }

  initContainer() {
    for (const [name, id] of this.types) {
      let newElement = document.createElement("div");
      newElement.className = `talents__container talents__${id}`;
      newElement.innerHTML = `<h3>${name}</h3>`;
      this.content.appendChild(newElement);
    }
  }

  initTalents() {
    talentsController
      .getHeroTalents()
      .forEach(
        (talent, index) => new TalentsSectionItem(talent.id, index, this)
      );
  }

  onPlusBtnClick() {
    new ListOfTalents();
  }

  update() {
    this.editToggle
      ? (this.header.innerHTML = `Talente <span>(${talentsController.getSum()})</span>`)
      : (this.header.innerHTML = `Talente`);
  }

  updateVisibility() {
    const containers = this.content.querySelectorAll(".talents__container");
    for (const container of containers) {
      container.classList.toggle("disabled", container.childElementCount <= 1);
    }
    this.section.classList.toggle(
      "disabled",
      !this.editToggle && !talentsController.heroHasTalents()
    );
  }
}
