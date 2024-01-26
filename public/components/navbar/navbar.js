import HerosModal from "./herosModal.js";

export default class Navbar {
  constructor() {
    this.navbar = document.querySelector(".navbar");
    this.heroBtn = document.querySelector(".navbar__hero-btn");
    this.wikiBtn = document.querySelector(".navbar__wiki-btn");
    this.editBtn = document.querySelector(".navbar__edit-btn");
    // events
    this.heroBtn.addEventListener("click", () => this.onHeroBtn());
    this.editBtn.addEventListener("click", () => this.onEditBtn());
  }

  onHeroBtn() {
    new HerosModal();
  }

  onEditBtn() {
    document.dispatchEvent(new Event("toggleEdit"));
  }

  disableNavbar(disabled) {
    this.navbar.classList.toggle("disabled", disabled);
  }
}
