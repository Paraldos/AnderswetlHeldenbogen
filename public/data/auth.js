export default class Auth {
  constructor() {
    this.provider = new firebase.auth.GoogleAuthProvider();
    this.signInButton = document.getElementById("sign-in-with-google");
    this.signInButton.addEventListener("click", () => this.signInWithGoogle());
  }

  signInWithGoogle() {
    return firebase.auth().signInWithRedirect(this.provider);
  }

  signOut() {
    return firebase.auth().signOut();
  }

  onAuthStateChanged(callback) {
    return firebase.auth().onAuthStateChanged(callback);
  }

  disable(disabled) {
    this.signInButton.classList.toggle("disabled", disabled);
  }
}
