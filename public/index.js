import Auth from "./data/auth.js";
import database from "./data/database.js";
import Navbar from "./components/navbar/navbar.js";
import CharacterSheet from "./components/characterSheet/characterSheet.js";

const auth = new Auth();
const navbar = new Navbar();
const content = new CharacterSheet();

auth.onAuthStateChanged(async (user) => {
  auth.disable(user ? true : false);
  navbar.disable(user ? false : true);
  content.disable(user ? false : true);
  if (user) {
    await database.setUser(user.uid);
    await database.init();
    document.dispatchEvent(new Event("resetAll"));
    console.log("User logged in.");
  } else {
    document.dispatchEvent(new Event("resetAll"));
    console.log("No user.");
  }
});
