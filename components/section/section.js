export default class Section {
  constructor(title, id, plusBtn = false) {
    this.main = document.querySelector(".main");
    this.section = this.createSection(title, id, plusBtn);
    this.headerText = this.section.querySelector(".section__header-text");
    this.editBtn = this.section.querySelector(".section__edit-btn");
    this.plusBtn = this.section.querySelector(".section__plus-btn");
    this.contentContainer = this.section.querySelector(".section__content");

    this.editBtn.addEventListener("click", () => {
      this.section.classList.toggle("no-edit");
      document.dispatchEvent(new Event("toggleEdit"));
    });
  }

  updateHeader(text) {
    this.headerText.innerHTML = text;
  }

  toggleEditBtn() {
    this.editBtn.classList.toggle("on");
    return this.editBtn.classList.contains("on");
  }

  createSection(title, id, plusBtn) {
    let section = Object.assign(document.createElement("section"), {
      classList: "section no-edit",
      innerHTML: `
        <div class="section__header">
          <h1 class="section__header-text">${title}</h1>
          ${this.addPlusBtn(plusBtn)}
          <button class="section__edit-btn">
            <i class="fa-solid fa-wrench"></i>
          </button>
        </div>
        <div class="${id}__content section__content"></div>
      `,
    });
    this.main.appendChild(section);
    return section;
  }

  addPlusBtn(plusBtn) {
    return plusBtn
      ? `<button class="section__plus-btn"><i class="fa-solid fa-plus"></i></button>`
      : "";
  }
}
