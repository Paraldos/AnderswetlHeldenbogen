import talentsController from "../../javascript/talentsController.js";
import Section from "../section/section.js";
import ListOfTalents from "./selectTalentModal.js";
import HeroTalent from "./heroTalent.js";
import ControllElement from "../controllElement/controllElement.js";

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
    for (const [name, key] of this.types) {
      let newElement = document.createElement("div");
      newElement.className = `talents__container talents__${key}`;
      newElement.innerHTML = `<h3>${name}</h3>`;
      this.content.appendChild(newElement);
    }
  }

  initTalents() {
    talentsController
      .getHeroTalents()
      .forEach((talent, index) => new Item(talent.id, index, this));
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

class Item extends ControllElement {
  constructor(key, index, section) {
    super("talents");
    this.index = index;
    this.dbEntry = talentsController.getDBEntry(key);
    this.heroEntry = talentsController.getTalentIndex(index);
    this.section = section;
    this.container = section.content.querySelector(
      `.talents__${this.dbEntry.type}`
    );
    this.update();
    this.container.appendChild(this.wrapper);
    document.addEventListener("toggleEdit", () => this.update());
  }

  onMainBtnClick() {
    new HeroTalent(this.dbEntry, this.index);
  }

  onMinusBtnClick() {
    talentsController.minusTalent(this.index);
    document.dispatchEvent(new Event("resetTalentHeader"));
    document.dispatchEvent(new Event("updateConditions"));
  }

  onPlusBtnClick() {
    talentsController.plusTalent(this.index);
    document.dispatchEvent(new Event("resetTalentHeader"));
    document.dispatchEvent(new Event("updateConditions"));
  }

  update() {
    this.mainBtn.innerHTML = this.getMainBtnText();
    this.minusBtn.classList.toggle("disabled", !this.section.editToggle);
    this.minusBtn.disabled = this.heroEntry.level <= 1 && this.heroEntry.innate;
    if (this.dbEntry.max_level > 1) {
      this.plusBtn.classList.toggle("disabled", !this.section.editToggle);
      this.plusBtn.disabled = this.heroEntry.level >= this.dbEntry.max_level;
    } else {
      this.plusBtn.classList.add("disabled");
    }
  }

  getMainBtnText() {
    let txt = this.dbEntry.name;
    if (this.heroEntry.comment) {
      txt += "*";
    }
    if (this.dbEntry.max_level > 1) {
      txt += ` (${this.heroEntry.level})`;
    }
    return txt;
  }
}
