/*
import db from "./data/db.js";
import hero from "./data/hero.js";
import Main from "./components/main/main.js";
import Navbar from "./components/navbar/navbar.js";

new Main();
new Navbar();
*/

const signInButton = document.getElementById("sign-in-with-google");
const signOutButton = document.getElementById("sign-out");

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

firebase.initializeApp(firebaseConfig);

const provider = new firebase.auth.GoogleAuthProvider();

firebase.auth().onAuthStateChanged((user) => {
  if (user) {
    signInButton.classList.add("invisible");
    signOutButton.classList.remove("invisible");
    console.log("User is signed in");
  } else {
    signInButton.classList.remove("invisible");
    signOutButton.classList.add("invisible");
    console.log("No user is signed in");
  }
});

function signInWithGoogle() {
  firebase.auth().signInWithRedirect(provider);

  firebase
    .auth()
    .getRedirectResult()
    .then((result) => {
      if (result.credential) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const token = result.credential.accessToken;
      }
      // The signed-in user info.
      const user = result.user;
    })
    .catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
    });
}

function signOut() {
  firebase
    .auth()
    .signOut()
    .then(() => {
      console.log("User is signed out");
    });
}

document.addEventListener("DOMContentLoaded", (event) => {
  signInButton.addEventListener("click", signInWithGoogle);
  signOutButton.addEventListener("click", () => signOut());
});
