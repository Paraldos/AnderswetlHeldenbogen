export default class NameElement {
  constructor(section) {
    this.section = section;
    this.name = this.addName();
    this.nameInput = this.name.querySelector(".grundlagen__name-input");
    this.addNameEvent();
  }

  addName() {
    let name = document.createElement("div");
    name.classList.add("grundlagen__name");
    name.innerHTML = `
    <form>
      <label>Name:</label>
      <input type="text" class="grundlagen__name-input">
    </form>
    `;
    this.section.contentContainer.appendChild(name);
    return name;
  }

  addNameEvent() {
    this.nameInput.addEventListener("input", () => {
      console.log(this.nameInput.value);
    });
  }
}
