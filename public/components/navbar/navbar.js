import HerosModal from "./herosModal.js";
import PlusModal from "./plusModal.js";

export default class Navbar {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.heroBtn = document.querySelector(".navbar__hero-btn");
    this.wikiBtn = document.querySelector(".navbar__wiki-btn");
    this.editBtn = document.querySelector(".navbar__edit-btn");
    this.plusBtn = document.querySelector(".navbar__plus-btn");
    // events
    this.heroBtn.addEventListener("click", () => this.onHeroBtn());
    this.editBtn.addEventListener("click", () => this.onEditBtn());
    this.plusBtn.addEventListener("click", () => this.onPlusBtn());
  }

  onHeroBtn() {
    new HerosModal();
  }

  onEditBtn() {
    document.dispatchEvent(new Event("toggleEdit"));
  }

  disable(disabled) {
    this.navbar.classList.toggle("disabled", disabled);
  }

  onPlusBtn() {
    new PlusModal();
  }
}
