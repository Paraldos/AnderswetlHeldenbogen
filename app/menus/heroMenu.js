import DB from "../db/db.js";
import hero from "../hero/hero.js";
import DeleteHeroModal from "./deleteHeroModal.js";

export default class HeroMenu {
  constructor() {
    this.heldenMenu = document.querySelector(".hero-menu");
    this.newHeroBtn = document.querySelector(".hero-menu__new-hero");
    this.heroContainer = document.querySelector(".hero-menu__hero-container");
    this.resetHeroContainer();
    this.addNewHeroBtnListener();
    this.addResetListener();
    this.addEscapeListener();
  }

  resetHeroContainer() {
    this.heroContainer.innerHTML = "";
    this.createHeroBtns();
    this.addLoadBtnListener();
    this.addDeleteBtnListener();
  }

  addNewHeroBtnListener() {
    this.newHeroBtn.addEventListener("click", () => {
      hero.newHero();
      document.dispatchEvent(new Event("resetAll"));
    });
  }

  addResetListener() {
    document.addEventListener("resetAll", () => this.resetHeroContainer());
    document.addEventListener("resetHeroMenu", () => this.resetHeroContainer());
  }

  addEscapeListener() {
    document.addEventListener("keydown", (event) =>
      event.key === "Escape" ? this.closeMenu() : ""
    );
  }

  // Helper
  createHeroBtns() {
    hero.arrayOfHeros.forEach((el, index) => {
      const name = el.grundlagen.name != "" ? el.grundlagen.name : "...";
      const isActive =
        hero.heroIndex == index ? "hero-menu__hero-btn--active" : "";
      let newBtn = document.createElement("div");
      newBtn.classList.add("hero-menu__hero-btn");
      newBtn.innerHTML = `
        <button class="hero-menu__hero-btn--load ${isActive}">${name}</button>
        <button class="hero-menu__hero-btn--delete"><i class="fa-solid fa-x"></i></button>`;
      this.heroContainer.appendChild(newBtn);
    });
  }

  addLoadBtnListener() {
    this.btns = document.querySelectorAll(".hero-menu__hero-btn--load");
    this.btns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        hero.loadHero(index);
        this.resetToMain();
      });
    });
  }

  addDeleteBtnListener() {
    this.btns = document.querySelectorAll(".hero-menu__hero-btn--delete");
    this.btns.forEach((btn, index) => {
      btn.addEventListener("click", () => {
        new DeleteHeroModal(index);
      });
    });
  }

  resetToMain() {
    document.dispatchEvent(new Event("resetAll"));
    this.closeMenu();
    this.resetHeroContainer();
  }

  closeMenu() {
    this.heldenMenu.classList.remove("hero-menu--active");
  }
}
