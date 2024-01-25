/*
import db from "./data/db.js";
import hero from "./data/hero.js";
import Main from "./components/main/main.js";
new Main();
*/
import Auth from "./components/auth/auth.js";
import Navbar from "./components/navbar/navbar.js";
import Database from "./database.js";
import firebaseConfig from "./firebaseConfig.js";

firebase.initializeApp(firebaseConfig);

const auth = new Auth();
const navbar = new Navbar();
const database = new Database();

database.write("/test", { key: "value" });
database.read("/test").then((snapshot) => {
  console.log("Data read successfully:", snapshot.val());
});

auth.onAuthStateChanged((user) => {
  auth.disableButton(user ? true : false);
  navbar.disableNavbar(user ? false : true);
  if (user) {
    console.log(user);
  } else {
    console.log("No User signed in.");
  }
});
