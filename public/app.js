function showLogin() {
  document.getElementById("login").style.display = "block";
  document.getElementById("register").style.display = "none";
  document.getElementById("dashboard").style.display = "none";
}

function showRegister() {
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "block";
  document.getElementById("dashboard").style.display = "none";
}

function showDashboard() {
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  loadTransactions();
}

async function login() {
  const username = document.getElementById("login-username").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    showDashboard();
  } else {
    alert("Login failed");
  }
}

async function register() {
  const username = document.getElementById("register-username").value;
  const password = document.getElementById("register-password").value;

  const response = await fetch("/api/register", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.ok) {
    showLogin();
  } else {
    alert("Registration failed");
  }
}

async function logout() {
  document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  showLogin();
}

async function addTransaction() {
  const description = document.getElementById("transaction-description").value;
  const amount = document.getElementById("transaction-amount").value;

  const response = await fetch("/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ description, amount }),
  });

  if (response.ok) {
    loadTransactions();
  } else {
    alert("Failed to add transaction");
  }
}

async function loadTransactions() {
  const response = await fetch("/api/transactions");
  if (response.ok) {
    const transactions = await response.json();
    const transactionsList = document.getElementById("transactions-list");
    transactionsList.innerHTML = "";
    transactions.forEach((tx) => {
      const li = document.createElement("li");
      li.textContent = `${tx.description}: $${tx.amount} (on ${new Date(
        tx.date
      ).toLocaleString()})`;
      transactionsList.appendChild(li);
    });
  } else {
    alert("Failed to load transactions");
  }
}

// Initialize
showLogin();
