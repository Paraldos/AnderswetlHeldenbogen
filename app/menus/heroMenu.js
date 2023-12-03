import DB from "../db/db.js";
import hero from "../hero/hero.js";
import DeleteHeroModal from "./deleteHeroModal.js";

export default class HeroMenu {
  constructor() {
    this.heldenMenu = document.querySelector(".hero-menu");
    this.newHeroBtn = document.querySelector(".hero-menu__new-hero");
    this.heroContainer = document.querySelector(".hero-menu__hero-container");
    this.resetHeroContainer();
    this.addEventListener();
  }

  addEventListener() {
    this.newHeroBtn.addEventListener("click", () => hero.newHero());
    document.addEventListener("resetHeroMenu", () => this.resetHeroContainer());
    document.addEventListener("keydown", (event) =>
      event.key === "Escape" ? this.closeMenu() : ""
    );
  }

  resetHeroContainer() {
    this.heroContainer.innerHTML = "";
    hero.arrayOfHeros.forEach((hero, index) => this.createHeroBtn(hero, index));
  }

  createHeroBtn(el, index) {
    const name = el.grundlagen.name != "" ? el.grundlagen.name : "...";
    const isActive =
      hero.heroIndex == index ? "hero-menu__hero-btn--active" : "";
    let newBtn = document.createElement("div");
    newBtn.classList.add("hero-menu__hero-btn");
    newBtn.innerHTML = `
      <button class="hero-menu__hero-btn--load ${isActive}">${name}</button>
      <button class="hero-menu__hero-btn--delete"><i class="fa-solid fa-x"></i></button>`;
    this.heroContainer.appendChild(newBtn);

    const loadBtn = newBtn.querySelector(".hero-menu__hero-btn--load");
    loadBtn.addEventListener("click", () => {
      hero.loadHero(index);
      this.resetToMain();
    });

    const deleteBtn = newBtn.querySelector(".hero-menu__hero-btn--delete");
    deleteBtn.addEventListener("click", () => {
      new DeleteHeroModal(index);
    });
  }

  resetToMain() {
    document.dispatchEvent(new Event("resetMain"));
    this.closeMenu();
    this.resetHeroContainer();
  }

  closeMenu() {
    this.heldenMenu.classList.remove("hero-menu--active");
  }
}
