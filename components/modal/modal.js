let modals = [];

document.addEventListener("keydown", (e) => {
  if (e.key != "Escape") return;
  if (modals.length < 1) return;
  modals[modals.length - 1].dispatchEvent(
    new Event("escape", { bubbles: true })
  );
});

export default class Modal {
  constructor() {
    this.body = document.body;
    this.modal = this.createModal();
    this.xBtn = this.modal.querySelector(".modal__x-btn");
    this.background = this.modal.querySelector(".modal__background");
    this.content = this.modal.querySelector(".modal__content");
    modals.push(this.modal);

    this.addXBtnListener();
    this.addBackgroundListener();
    this.addEscListener();
    this.addOverflow();
  }

  addOverflow() {
    this.body.classList.add("overflow-hidden");
  }

  destroyModal() {
    let modal = modals.pop();
    if (modals.length <= 0) this.body.classList.remove("overflow-hidden");
    modal.remove();
  }

  addEscListener() {
    this.modal.addEventListener("escape", () => this.destroyModal());
  }

  addBackgroundListener() {
    this.background.addEventListener("click", () => {
      this.destroyModal();
    });
  }

  addXBtnListener() {
    this.xBtn.addEventListener("click", () => {
      this.destroyModal();
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
