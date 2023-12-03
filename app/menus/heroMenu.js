import DB from "../db/db.js";
import hero from "../hero/hero.js";

export default class HeroMenu {
  constructor() {
    this.newHeroBtn = document.querySelector(".hero-menu__new-hero-btn");
    this.heroContainer = document.querySelector(".hero-menu__hero-container");
    this.updateHeroContainer();
    this.addNewHeroBtnListener();
  }

  addNewHeroBtnListener() {
    this.newHeroBtn.addEventListener("click", () => {
      hero.newHero();
      this.updateHeroContainer();
    });
  }

  updateHeroContainer() {
    this.heroContainer.innerHTML = "";
    hero.arrayOfHeros.forEach((hero, index) => this.createHeroBtn(hero, index));
  }

  createHeroBtn(el, index) {
    let newBtn = document.createElement("button");
    newBtn.classList.add("hero-menu__btn");
    newBtn.innerText =
      el.grundlagen.name != "" ? el.grundlagen.name : "Namenloser Held";
    this.heroContainer.appendChild(newBtn);

    newBtn.addEventListener("click", () => {
      hero.loadHero(index);
    });
  }
}
