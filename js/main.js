import Attribute from "./attribute/attribute.js";
import Grundlagen from "./grundlagen/grundlagen.js";
import DB from "./db/db.js";

let db = new DB();
new Grundlagen(db);
new Attribute(db);
