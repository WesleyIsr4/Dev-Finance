const sqlite3 = require("sqlite3").verbose();
const path = require('path')


const db = new sqlite3.Database(path.resolve(__dirname, 'database.db'));

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
