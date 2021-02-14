const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./src/database/database.db");

module.exports = db;

db.serialize(function () {
  db.run(
    `CREATE TABLE IF NOT EXISTS transactions(
          id INTEGER PRIMARY KEY AUTOINCREMENT,
          category TEXT,
          description TEXT,
          amount TEXT,
          date TEXT
        );
    `
  );
});
