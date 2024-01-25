export default class Database {
  constructor() {
    this.database = firebase.database();
  }

  write(path, data) {
    return this.database.ref(path).set(data);
  }

  read(path) {
    return this.database.ref(path).once("value");
  }
}
