import db from "../app/db/db.js";
import Nav from "./app/nav/nav.js";
import Attribute from "./app/attribute/attribute.js";
import Grundlagen from "./app/grundlagen/grundlagen.js";
import Fertigkeiten from "./app/fertigkeiten/fertigkeiten.js";
import Talente from "./app/talente/talente.js";
import HeroMenu from "./app/menus/heroMenu.js";

new Nav();
new HeroMenu();

new Grundlagen();
// new Attribute();
// new Fertigkeiten();
// new Talente();
