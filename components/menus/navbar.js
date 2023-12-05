export default class Navbar {
  constructor() {
    this.heldenBtn = document.querySelector(".navbar__hero-btn");
    this.heldenMenu = document.querySelector(".hero-menu");
    this.addHeldenBtnListener();
  }

  addHeldenBtnListener() {
    this.heldenBtn.addEventListener("click", () => {
      this.heldenMenu.classList.toggle("hero-menu--active");
      document.dispatchEvent(new Event("resetHeroMenu"));
    });
  }
}
