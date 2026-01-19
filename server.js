const express = require("express");
const app = express();

app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "CashBridge Pay API is running",
    status: "success"
  });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
