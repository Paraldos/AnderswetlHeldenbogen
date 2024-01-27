import Auth from "./data/auth.js";
import Database from "./data/database.js";
import Navbar from "./components/navbar/navbar.js";
import Content from "./components/content/content.js";

const auth = new Auth();
const navbar = new Navbar();
const content = new Content();

auth.onAuthStateChanged(async (user) => {
  auth.disable(user ? true : false);
  navbar.disable(user ? false : true);
  content.disable(user ? false : true);
  if (user) {
    await Database.setUser(user.uid);
    document.dispatchEvent(new Event("resetAll"));
    console.log("User logged in.");
  } else {
    document.dispatchEvent(new Event("resetAll"));
    console.log("No user.");
  }
});
