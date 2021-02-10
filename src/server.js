const express = require("express");
const nunjucks = require("nunjucks");
const app = express();

const db = require("./database/db");

app.use(express.urlencoded({ extended: true }));

app.use(express.static("public"));
app.use(express.json());

nunjucks.configure("src/view", {
  express: app,
  noCache: true,
});

app.get("/", (req, res) => {
  db.all(`SELECT * FROM transactions`, function (err, rows) {
    if (err) {
      console.log(err);
      return res.send("Error in database");
    }

    const reverseTransactions = [...rows].reverse();

    let lastTransactions = [];

    let income = Number(0);
    let expense = Number(0);

    for (let transaction of reverseTransactions) {
      lastTransactions.push(transaction);
      let formattedAmount = transaction.amount
        .split("-")
        .join("")
        .split("R$")
        .join("");
      if (transaction.amount >= 0) {
        income += Number(formattedAmount);
      } else {
        expense += Number(formattedAmount);
      }
    }
    let total = income - expense;

    return res.render("index.html", {
      transactions: lastTransactions,
      income: income,
      expense: expense,
      total: total,
    });
  });

  app.post("/", function (req, res) {
    let { category, description, amount, date } = req.body;
    const reverseDate = date.replace(/-/g, "/").split("/").reverse().join("/");
    const query = `
        INSERT INTO transactions(
            category,
            description,
            amount,
            date
        ) VALUES (?, ?,?,?)
    `;

    if (amount <= -1) {
      formatAmount = amount.split("-").join("");
      amount = `- R$ ${formatAmount}`;
    }

    const values = [category, description, amount, reverseDate];

    db.run(query, values, function (err) {
      if (err) {
        console.log(err);
        return res.send("Error in database");
      }
      return res.redirect("/");
    });
  });

  app.get("/:id", (req, res) => {
    db.all(
      `DELETE FROM transactions WHERE id = "${req.params.id}"`,
      function (err) {
        if (err) {
          console.log(err);
          return res.send("Error in database");
        }
        return res.redirect("/");
      }
    );
  });

  app.post("/edit", (req, res) => {
    let { transactions, category, description, amount, date } = req.body;

    const reverseDate = date.replace(/-/g, "/").split("/").reverse().join("/");

    if (amount <= -1) {
      formatAmount = amount.split("").join("");
      amount = `- R$ ${formatAmount}`;
    }

    let query = `
    UPDATE transactions SET category="${category}", description="${description}", amount="${amount}", date="${reverseDate}" WHERE id="${transactions}"
    `;

    db.all(query, function (err) {
      if (err) {
        console.log(err);
        return res.send("Error in database");
      }

      return res.redirect("/");
    });
  });
});

app.listen(process.env.PORT || 8080, () =>
  console.log("https://127.0.0.1:8080 ou https://localhost:8080")
);
