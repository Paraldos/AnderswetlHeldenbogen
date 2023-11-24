export default class Modal {
  constructor() {
    this.body = document.body;
    this.modal = this.createModal();
    this.xBtn = this.modal.querySelector(".modal__x-btn");
    this.background = this.modal.querySelector(".modal__background");
    this.content = this.modal.querySelector(".modal__content");

    this.addXBtnListener();
    this.addBackgroundListener();
  }

  addBackgroundListener() {
    this.background.addEventListener("click", () => {
      this.modal.remove();
    });
  }

  addXBtnListener() {
    this.xBtn.addEventListener("click", () => {
      this.modal.remove();
    });
  }

  createModal() {
    let modal = document.createElement("div");
    modal.classList.add("modal");
    modal.innerHTML = `
    <div class="modal__box">
        <div class="modal__background"></div>
        <div class="modal__x-btn"><i class="fa-solid fa-x"></i></div>
        <div class="modal__content"></div>
    </div>
    `;
    this.body.appendChild(modal);
    return modal;
  }
}
