import db from "../../data/db.js";
import hero from "../../data/hero.js";
import Section from "../section/section.js";
import Skill from "./skill.js";

export default class Skills {
    constructor() {
        this.section = new Section("Fertigkeiten", "skills");
        this.container = this.createContainer();
        this.skills = this.fillSkillsArray();
        this.addEditButtonListener();
        this.addUpdateSectionHeader();
    }

    createContainer() {
        let container = document.querySelector(".skills__content");
        container.innerHTML = `
            <div class="skills__container skills__geistig"><h3>Geistig</h3></div>
            <div class="skills__container skills__koerperlich"><h3>Körperlich</h3></div>
            <div class="skills__container skills__sozial"><h3>Sozial</h3></div>`;
        return container;
    }

    fillSkillsArray() {
        let arr = [];
        for (let key in db.skills) {
            arr.push(new Skill(key));
        }
        return arr;
    }

    addEditButtonListener() {
        this.section.editBtn.addEventListener("click", () => {
            const btnIsOn = this.section.toggleEditBtn();
            this.updateSectionHeader();
            this.skills.forEach((el) => el.toggleEditBtn(btnIsOn));
        });
    }

    addUpdateSectionHeader() {
        document.addEventListener("updateSkillsHeader", () =>
            this.updateSectionHeader()
        );
    }

    updateSectionHeader() {
        if (this.section.editBtn.classList.contains("on")) {
            this.section.updateHeader(`Fertigkeiten (${this.getSkillsSum()})`);
        } else {
            this.section.updateHeader("Fertigkeiten");
        }
    }

    getSkillsSum() {
        let sum = 0;
        for (let key in db.skills) {
            sum += hero.skills[key].value;
        }
        return sum;
    }
}
