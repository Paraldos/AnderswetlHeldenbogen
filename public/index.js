/*
import db from "./data/db.js";
import hero from "./data/hero.js";
import Main from "./components/main/main.js";

new Main();
*/

import Auth from "./components/auth/auth.js";
import Navbar from "./components/navbar/navbar.js";

const firebaseConfig = {
  apiKey: "AIzaSyB7_PhEgJSPJxpA5bKc8SerZLTBS43znRM",
  authDomain: "andersweltheldenbogen.firebaseapp.com",
  databaseURL:
    "https://andersweltheldenbogen-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "andersweltheldenbogen",
  storageBucket: "andersweltheldenbogen.appspot.com",
  messagingSenderId: "957537234013",
  appId: "1:957537234013:web:6f273a31706248770031b4",
};
const auth = new Auth(firebaseConfig);
const navbar = new Navbar();

auth.onAuthStateChanged((user) => {
  auth.disableButton(user ? true : false);
  navbar.disableNavbar(user ? false : true);

  if (user) {
    console.log("User is signed in");
  } else {
    console.log("User is signed out");
  }
});
