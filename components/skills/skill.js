import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";

export default class Skill {
  constructor(key) {
    this.key = key;
    this.dbEntry = db.skills[key];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".skills__skill-main-btn");
    this.plusBtn = this.element.querySelector(".skills__skill-plus-btn");
    this.minusBtn = this.element.querySelector(".skills__skill-minus-btn");
    this.updateElement();
    this.mainBtn.addEventListener("click", () => new SkillsModal(this.dbEntry));
    this.plusBtn.addEventListener("click", () => this.onPlusBtnClick());
    this.minusBtn.addEventListener("click", () => this.onMinusBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  createElement() {
    let container = document.querySelector(`.skills__${this.dbEntry.type}`);
    const newElement = document.createElement("div");
    newElement.classList.add("skill");
    newElement.innerHTML = `
      <button class="skills__skill-main-btn">???</button>
      <button class="skills__skill-minus-btn symbol-btn invisible">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="skills__skill-plus-btn symbol-btn invisible">
        <i class="fa-solid fa-plus"></i>
      </button>`;
    container.appendChild(newElement);
    return newElement;
  }

  updateElement() {
    this.mainBtn.innerHTML = `${this.dbEntry.name}: ${
      hero.skills[this.key].value
    }`;
    document.dispatchEvent(new Event("updateSkillsHeader"));
  }

  onPlusBtnClick() {
    if (hero.skills[this.key].value < 5) {
      hero.skills[this.key].value += 1;
      hero.saveHero();
      this.updateElement();
    }
  }

  onMinusBtnClick() {
    if (hero.skills[this.key].value > 0) {
      hero.skills[this.key].value -= 1;
      hero.saveHero();
      this.updateElement();
    }
  }

  onToggleEdit() {
    this.plusBtn.classList.toggle("invisible");
    this.minusBtn.classList.toggle("invisible");
  }
}

class SkillsModal {
  constructor(dbEntry) {
    this.modal = new Modal();
    this.modal.content.innerHTML = `
    <h2>${dbEntry.name}</h2>
    <p>${dbEntry.description}</p>`;
  }
}
