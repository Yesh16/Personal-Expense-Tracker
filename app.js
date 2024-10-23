const express = require("express");
const bodyParser = require("body-parser");
const db = require("./database");
const app = express();
app.use(bodyParser.json());

// Root endpoint for testing
app.get('/', (req, res) => {
  res.send('Hello, world!');
});


app.post("/transactions", (request, response) => {
    const { type, category, amount, date, description } = request.body;
    db.run(`INSERT INTO transactions (type, category, amount, date, description) VALUES ('expense', 'Food', 50, '2024-10-22', 'Lunch At Restaurant');`,
        [type, category, amount, date, description],
    function(err) {
      if (err) {
        return response.status(500).json({ error: err.message });
      }
      response.status(201).json({ id: this.lastID });
    }
  );
});

// Retrieve all transactions
app.get('/transactions', (request, response) => {
    db.all(`SELECT * FROM transactions`, [], (err, rows) => {
      if (err) {
        return response.status(500).json({ error: err.message });
      }
      response.status(200).json(rows);
    });
});

// Retrieve a transaction by ID
app.get('/transactions/:id', (request, response) => {
  const { id } = request.params;
  db.get(`SELECT * FROM transactions WHERE id = ?`, [id], (err, row) => {
    if (err) {
      return response.status(500).json({ error: err.message });
    }
    response.status(200).json(row);
  });
});

// Update a transaction by ID
app.put('/transactions/:id', (request, response) => {
    const { id } = request.params;
    const { type, category, amount, date, description } = request.body;
    db.run(
      `UPDATE transactions SET type = ?, category = ?, amount = ?, date = ?, description = ? WHERE id = ?`,
      [type, category, amount, date, description, id],
      function (err) {
        if (err) {
          return response.status(500).json({ error: err.message });
        }
        response.status(200).json({ updated: this.changes });
      }
    );
});

// Delete a transaction by ID
app.delete('/transactions/:id', (request, response) => {
    const { id } = request.params;
    db.run(`DELETE FROM transactions WHERE id = ?`, [id], function (err) {
      if (err) {
        return response.status(500).json({ error: err.message });
      }
      response.status(200).json({ deleted: this.changes });
    });
  });
  
  // Retrieve summary of transactions
  app.get('/summary', (request, response) => {
    db.all(
      `SELECT 
        SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) AS total_income,
        SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END) AS total_expenses,
        (SUM(CASE WHEN type = 'income' THEN amount ELSE 0 END) - SUM(CASE WHEN type = 'expense' THEN amount ELSE 0 END)) AS balance
      FROM transactions`,
      [],
      (err, rows) => {
        if (err) {
          return response.status(500).json({ error: err.message });
        }
        response.status(200).json(rows[0]);
      }
    );
  });


  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });