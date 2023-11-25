export default class Section {
  constructor(title) {
    this.main = document.querySelector("main");
    this.section = this.createSection(title);
    this.contentContainer = this.section.querySelector(".section__content");
    this.editBtn = this.section.querySelector(".section__edit-btn");
  }

  toggleEditBtn() {
    this.editBtn.classList.toggle("on");
    return this.editBtn.classList.contains("on");
  }

  createSection(title) {
    let section = document.createElement("section");
    section.classList.add("section");
    let id = this.transformeTitleIntoId(title);
    section.innerHTML = `
    <div class="section__header">
      <h1>${title}</h1>
      <button class="section__edit-btn">
        <i class="fa-solid fa-wrench"></i>
      </button>
    </div>
    <ul class="${id}__content section__content"></ul>`;
    this.main.appendChild(section);
    return section;
  }

  transformeTitleIntoId(string) {
    let value = string.toLowerCase();
    value = value.replace(/ä/g, "ae");
    value = value.replace(/ö/g, "oe");
    value = value.replace(/ü/g, "ue");
    return value;
  }
}
