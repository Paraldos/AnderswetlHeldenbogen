import toolsController from "../../../javascript/toolsController.js";

export default class ToolsItem {
  constructor(index, section, container) {
    this.item = toolsController.getHeroItem(index);
    this.index = index;
    this.section = section;
    this.container = container;
    // init
    this.tool = this.initElement();
    this.name = this.tool.querySelector(".inventory__name");
    this.bonus = this.tool.querySelector(".inventory__bonus");
    this.pool = this.tool.querySelector(".inventory__pool");
    this.description = this.tool.querySelector(".inventory__description");
    this.deleteBtn = this.tool.querySelector(".inventory__delete-btn");
    this.onToggleEdit();
    // events
    this.name.addEventListener("change", () => this.onNameChange());
    this.bonus.addEventListener("change", () => this.onBonusChange());
    this.pool.addEventListener("change", () => this.onPoolChange());
    this.description.addEventListener("change", () =>
      this.onDescriptionChange()
    );
    this.deleteBtn.addEventListener("click", () => this.onDeleteBtnClick());
    document.addEventListener("toggleEdit", () => this.onToggleEdit());
  }

  onToggleEdit() {
    const enabled = this.section.editToggle;
    this.name.disabled = !enabled;
    this.bonus.disabled = !enabled;
    this.pool.disabled = !enabled;
    this.description.disabled = !enabled;
    this.deleteBtn.classList.toggle("disabled", !enabled);
  }

  initElement() {
    let visibility = !this.section.editToggle ? "" : "disabled";
    let item = document.createElement("div");
    item.className = "inventory__item";
    item.innerHTML = `
        <input class="inventory__name" type="text" value="${this.item.name}" />
        <input class="inventory__bonus" type="text" value="${this.item.bonus}" />
        <input class="inventory__pool" type="text" value="${this.item.pool}" />
        <input class="inventory__description" type="text" value="${this.item.description}" />
        <button class="inventory__delete-btn ${visibility}"><i class="fa-solid fa-x"></i></button>`;
    this.container.appendChild(item);
    return item;
  }

  // ================== events
  onNameChange() {
    toolsController.changeName(this.index, this.name.value);
  }

  onBonusChange() {
    toolsController.changeBonus(this.index, this.bonus.value);
  }

  onPoolChange() {
    toolsController.changePool(this.index, this.pool.value);
  }

  onDescriptionChange() {
    toolsController.changeDescription(this.index, this.description.value);
  }

  onDeleteBtnClick() {
    toolsController.remove(this.index);
  }
}
