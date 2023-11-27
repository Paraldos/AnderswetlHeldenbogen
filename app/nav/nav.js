export default class Nav {
  constructor() {
    this.heldenBtn = document.querySelector(".nav__helden-btn");
    this.heldenMenu = document.querySelector(".nav__helden-menu");
    this.addHeldenBtnListener();
  }

  addHeldenBtnListener() {
    this.heldenBtn.addEventListener("click", () => {
      this.heldenMenu.classList.toggle("nav__helden-menu--active");
    });
  }
}
