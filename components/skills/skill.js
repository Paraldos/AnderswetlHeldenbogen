import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Modal from "../modal/modal.js";

export default class Skill {
  constructor(key) {
    this.key = key;
    this.dbEntry = db.skills[key];
    this.element = this.createElement();
    this.mainBtn = this.element.querySelector(".skill__main-btn");
    this.plusBtn = this.element.querySelector(".skill__plus-btn");
    this.minusBtn = this.element.querySelector(".skill__minus-btn");
    this.updateElement();
    this.addMainBtnListener();
    this.addPlusListener();
    this.addMinusListener();
  }

  createElement() {
    let container = document.querySelector(
      `.skills__${this.dbEntry.type}`
    );
    const newElement = document.createElement("div");
    newElement.classList.add("skill");
    newElement.innerHTML = `
      <button class="skill__main-btn">???</button>
      <button class="skill__minus-btn invisible symbol-btn">
        <i class="fa-solid fa-minus"></i>
      </button>
      <button class="skill__plus-btn invisible symbol-btn">
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

  addMainBtnListener() {
    this.mainBtn.addEventListener(
      "click",
      () => new SkillsModal(this.dbEntry)
    );
  }

  addPlusListener() {
    this.plusBtn.addEventListener("click", () => {
      if (hero.skills[this.key].value < 5) {
        hero.skills[this.key].value += 1;
        hero.saveHero();
        this.updateElement();
      }
    });
  }

  addMinusListener() {
    this.minusBtn.addEventListener("click", () => {
      if (hero.skills[this.key].value > 0) {
        hero.skills[this.key].value -= 1;
        hero.saveHero();
        this.updateElement();
      }
    });
  }

  toggleEditBtn(btnsVisible) {
    btnsVisible
      ? this.plusBtn.classList.remove("invisible")
      : this.plusBtn.classList.add("invisible");
    btnsVisible
      ? this.minusBtn.classList.remove("invisible")
      : this.minusBtn.classList.add("invisible");
  }
}

class SkillsModal {
  constructor(dbEntry) {
    this.dbEntry = dbEntry;
    this.addModal();
  }

  addModal() {
    let modal = new Modal();
    modal.content.innerHTML = `
    <h2>${this.dbEntry.name}</h2>`;
    this.addComment(modal);
    this.addTalentDescription(modal);
  }

  addTalentDescription(modal) {
    let newElement = document.createElement("p");
    newElement.innerText = this.dbEntry.description;
    modal.content.appendChild(newElement);
  }

  addComment(modal) {
    console.log();
  }
}
