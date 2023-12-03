export default class NavMenu {
  constructor() {
    this.heldenBtn = document.querySelector(".nav__hero-btn");
    this.heldenMenu = document.querySelector(".hero-menu");
    this.addHeldenBtnListener();
  }

  addHeldenBtnListener() {
    this.heldenBtn.addEventListener("click", () => {
      this.heldenMenu.classList.toggle("hero-menu--active");
    });
  }
}
