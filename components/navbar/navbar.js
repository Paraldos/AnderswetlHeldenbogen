import HerosModal from "./herosModal.js";

export default class Navbar {
  constructor() {
    this.heroBtn = document.querySelector(".navbar__hero-btn");
    this.heroBtn.addEventListener("click", () => new HerosModal());
  }
}
