const express = require("express");
const app = express();

// Middleware
app.use(express.json());

// Simulated in-memory wallet data
let wallet = {
  balance: 0,
  transactions: []
};

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "CashBridge Pay API is running",
    status: "success"
  });
});

// Cash-in endpoint
app.post("/api/cash-in", (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  wallet.balance += amount;
  wallet.transactions.push({
    type: "CASH_IN",
    amount,
    date: new Date()
  });

  res.json({
    message: "Cash-in successful",
    balance: wallet.balance
  });
});

// Cash-out endpoint
app.post("/api/cash-out", (req, res) => {
  const { amount } = req.body;

  if (!amount || amount <= 0) {
    return res.status(400).json({ error: "Invalid amount" });
  }

  if (amount > wallet.balance) {
    return res.status(400).json({ error: "Insufficient balance" });
  }

  wallet.balance -= amount;
  wallet.transactions.push({
    type: "CASH_OUT",
    amount,
    date: new Date()
  });

  res.json({
    message: "Cash-out successful",
    balance: wallet.balance
  });
});

// Transaction history
app.get("/api/transactions", (req, res) => {
  res.json(wallet.transactions);
});

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
