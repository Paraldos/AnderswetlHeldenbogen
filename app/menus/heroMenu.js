import db from "../db/db.js";

export default class HeroMenu {
  constructor() {
    this.newHeroBtn = document.querySelector(".hero-menu__new-hero-btn");
    this.heroContainer = document.querySelector(".hero-menu__hero-container");
    this.updateHeroContainer();
    this.addNewHeroBtnListener();
  }

  addNewHeroBtnListener() {
    this.newHeroBtn.addEventListener("click", () => {
      db.newHero();
      this.updateHeroContainer();
    });
  }

  updateHeroContainer() {
    this.heroContainer.innerHTML = "";
    db.heroList.forEach((el) => {
      let newElement = document.createElement("button");
      newElement.classList.add("hero-menu__hero-btn");
      newElement.innerText = "Blub";
      this.heroContainer.appendChild(newElement);
    });
  }
}
