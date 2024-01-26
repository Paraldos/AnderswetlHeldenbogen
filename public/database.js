import firebaseConfig from "./firebaseConfig.js";
firebase.initializeApp(firebaseConfig);

class Database {
  constructor() {
    this.database = firebase.database();
    this.userId = null;
  }

  setUser(userId) {
    this.userId = userId;
  }

  async write(path, data) {
    this.database.ref("users/" + this.userId + path).set(data);
  }

  async read(path) {
    const snapshot = await this.database
      .ref("users/" + this.userId + path)
      .once("value");
    return snapshot.val();
  }
}

let database = new Database();
export default database;
