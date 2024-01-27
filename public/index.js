/*
import db from "./data/db.js";
import hero from "./data/hero.js";
import Main from "./components/main/main.js";
new Main();
*/

import Auth from "./components/auth/auth.js";
import Navbar from "./components/navbar/navbar.js";
import Database from "./data/database.js";

const auth = new Auth();
const navbar = new Navbar();

auth.onAuthStateChanged(async (user) => {
  auth.disableButton(user ? true : false);
  navbar.disableNavbar(user ? false : true);
  if (user) {
    Database.userId = user.uid;
    // await database.write("/", { name: "Test" });
    // const data = await database.read("/");
    // console.log(data);
  } else {
    // console.log("No User signed in.");
  }
});
