export default class Section {
  constructor(title, plusBtn = false) {
    this.main = document.querySelector(".main");
    this.section = this.createSection(title, plusBtn);
    this.text = this.section.querySelector(".section__text");
    this.editBtn = this.section.querySelector(".section__edit-btn");
    this.plusBtn = this.section.querySelector(".section__plus-btn");
    this.contentContainer = this.section.querySelector(".section__content");
  }

  updateHeader(text) {
    this.text.innerText = text;
  }

  toggleEditBtn() {
    this.editBtn.classList.toggle("on");
    return this.editBtn.classList.contains("on");
  }

  createSection(title, plusBtn) {
    let section = document.createElement("section");
    section.classList.add("section");
    let id = this.transformeTitleIntoId(title);
    section.innerHTML = `
    <div class="section__header">
      <h1 class="section__text">${title}</h1>
      ${this.addPlusBtn(plusBtn)}
      <button class="section__edit-btn">
        <i class="fa-solid fa-wrench"></i>
      </button>
    </div>
    <div class="${id}__content section__content"></div>`;
    this.main.appendChild(section);
    return section;
  }

  addPlusBtn(plusBtn) {
    return plusBtn
      ? `<button class="section__plus-btn"><i class="fa-solid fa-plus"></i></button>`
      : "";
  }

  transformeTitleIntoId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}