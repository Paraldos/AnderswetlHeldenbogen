/*
import Main from "./components/main/main.js";
new Main();
*/

import Auth from "./data/auth.js";
import Database from "./data/database.js";
import Navbar from "./components/navbar/navbar.js";

const auth = new Auth();
const navbar = new Navbar();

auth.onAuthStateChanged(async (user) => {
  auth.disableButton(user ? true : false);
  navbar.disableNavbar(user ? false : true);
  if (user) {
    Database.userId = user.uid;
    console.log("User logged in.");
  } else {
    console.log("No User signed in.");
  }
});
