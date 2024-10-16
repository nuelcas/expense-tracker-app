// // server.js
// const express = require("express");
// const bodyParser = require("body-parser");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const cookieParser = require("cookie-parser");

// const app = express();
// const PORT = process.env.PORT || 3000;

// app.use(bodyParser.json());
// app.use(cookieParser());

// // Dummy data for users and transactions
// let users = [];
// let transactions = [];

// // Secret key for JWT
// const SECRET_KEY = "ggsysu746tjbkdnvs";

// // Middleware for authentication
// const authenticateToken = (req, res, next) => {
//   const token = req.cookies.token;
//   if (!token) return res.sendStatus(401);

//   jwt.verify(token, SECRET_KEY, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };

// // Register endpoint
// app.post("/api/register", async (req, res) => {
//   const { username, password } = req.body;
//   const hashedPassword = await bcrypt.hash(password, 10);
//   users.push({ username, password: hashedPassword });
//   res.status(201).send("User registered");
// });

// // Login endpoint
// app.post("/api/login", async (req, res) => {
//   const { username, password } = req.body;
//   const user = users.find((user) => user.username === username);
//   if (!user || !(await bcrypt.compare(password, user.password))) {
//     return res.status(400).send("Invalid credentials");
//   }
//   const token = jwt.sign({ username: user.username }, SECRET_KEY);
//   res.cookie("token", token, { httpOnly: true });
//   res.send("Logged in");
// });

// // Get transactions endpoint
// app.get("/api/transactions", authenticateToken, (req, res) => {
//   const userTransactions = transactions.filter(
//     (tx) => tx.username === req.user.username
//   );
//   res.json(userTransactions);
// });

// // Add transaction endpoint
// app.post("/api/transactions", authenticateToken, (req, res) => {
//   const { amount, description } = req.body;
//   transactions.push({
//     username: req.user.username,
//     amount,
//     description,
//     date: new Date(),
//   });
//   res.status(201).send("Transaction added");
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });

// const path = require("path");

// app.use(express.static(path.join(__dirname, "public")));

// server.js
const express = require("express");
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cookieParser());

// Serve static files from the public directory (where your CSS should be)
app.use(express.static(path.join(__dirname, "public")));

// Dummy data for users and transactions
let users = [];
let transactions = [];

// Secret key for JWT
const SECRET_KEY = "ggsysu746tjbkdnvs";

// Middleware for authentication
const authenticateToken = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.sendStatus(401);

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register endpoint
app.post("/api/register", async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  users.push({ username, password: hashedPassword });
  res.status(201).send("User registered");
});

// Login endpoint
app.post("/api/login", async (req, res) => {
  const { username, password } = req.body;
  const user = users.find((user) => user.username === username);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).send("Invalid credentials");
  }
  const token = jwt.sign({ username: user.username }, SECRET_KEY);
  res.cookie("token", token, { httpOnly: true });
  res.send("Logged in");
});

// Get transactions endpoint
app.get("/api/transactions", authenticateToken, (req, res) => {
  const userTransactions = transactions.filter(
    (tx) => tx.username === req.user.username
  );
  res.json(userTransactions);
});

// Add transaction endpoint
app.post("/api/transactions", authenticateToken, (req, res) => {
  const { amount, description } = req.body;
  transactions.push({
    username: req.user.username,
    amount,
    description,
    date: new Date(),
  });
  res.status(201).send("Transaction added");
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html")); // Serve the index.html file
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
