import HerosModal from "./herosModal.js";

export default class Navbar {
  constructor() {
    this.heroBtn = document.querySelector(".navbar__hero-btn");
    this.wikiBtn = document.querySelector(".navbar__wiki-btn");
    this.editBtn = document.querySelector(".navbar__edit-btn");
    // events
    this.heroBtn.addEventListener("click", () => new HerosModal());
    this.editBtn.addEventListener("click", () => this.onToggleEdit());
  }

  onToggleEdit() {
    document.dispatchEvent(new Event("toggleEdit"));
  }
}
