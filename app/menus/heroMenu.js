import DB from "../db/db.js";

export default class HeroMenu {
  constructor() {
    this.newHeroBtn = document.querySelector(".hero-menu__new-hero-btn");
    this.heroContainer = document.querySelector(".hero-menu__hero-container");
    this.updateHeroContainer();
    this.addNewHeroBtnListener();
  }

  addNewHeroBtnListener() {
    this.newHeroBtn.addEventListener("click", () => {
      this.updateHeroContainer();
    });
  }

  updateHeroContainer() {
    this.heroContainer.innerHTML = "";
  }
}
