// ---- Real-time Dashboard Logic ---- //
let transactions = [];
let totalRevenue = 0;
let methodChart, statusChart;

// --- DOM Elements ---
const revenueEl = document.getElementById("totalRevenue");
const successRateEl = document.getElementById("successRate");
const activeUsersEl = document.getElementById("activeUsers");
const txnCountEl = document.getElementById("transactionCount");
const feedList = document.getElementById("feedList");

// --- Initialize Charts ---
function initCharts() {
  const ctx1 = document.getElementById("methodChart");
  const ctx2 = document.getElementById("statusChart");

  methodChart = new Chart(ctx1, {
    type: "bar",
    data: { labels: [], datasets: [{ label: "Revenue ($)", data: [], backgroundColor: "#3b82f6" }] },
    options: { plugins: { legend: { display: false } } }
  });

  statusChart = new Chart(ctx2, {
    type: "doughnut",
    data: { labels: ["Success", "Pending", "Failed"], datasets: [{ data: [0,0,0], backgroundColor: ["#16a34a","#f59e0b","#dc2626"] }] },
    options: { cutout: "70%" }
  });
}

// --- Update Charts ---
function updateCharts() {
  const methodTotals = {};
  const statusTotals = { Success:0, Pending:0, Failed:0 };

  transactions.forEach(t => {
    methodTotals[t.method] = (methodTotals[t.method] || 0) + t.amount;
    statusTotals[t.status]++;
  });

  methodChart.data.labels = Object.keys(methodTotals);
  methodChart.data.datasets[0].data = Object.values(methodTotals);
  methodChart.update();

  statusChart.data.datasets[0].data = Object.values(statusTotals);
  statusChart.update();
}

// --- Update Stats ---
function updateStats() {
  const successCount = transactions.filter(t => t.status === "Success").length;
  const successRate = (successCount / transactions.length) * 100 || 0;
  const uniqueUsers = new Set(transactions.map(t => t.user)).size;

  totalRevenue = transactions.reduce((sum, t) => sum + t.amount, 0);

  revenueEl.textContent = `$${totalRevenue.toFixed(2)}`;
  successRateEl.textContent = `${successRate.toFixed(1)}%`;
  activeUsersEl.textContent = uniqueUsers;
  txnCountEl.textContent = transactions.length;
}

// --- Add New Transaction ---
function addTransaction() {
  const users = ["Alice","Bob","Eve","Charlie","David","Grace"];
  const methods = ["Credit Card","Debit Card","UPI","Wallet"];
  const statuses = ["Success","Pending","Failed"];
  
  const txn = {
    id: 1000 + transactions.length + 1,
    user: users[Math.floor(Math.random()*users.length)],
    amount: +(Math.random()*500+20).toFixed(2),
    method: methods[Math.floor(Math.random()*methods.length)],
    status: statuses[Math.floor(Math.random()*statuses.length)],
    time: new Date().toLocaleTimeString()
  };

  transactions.unshift(txn);
  if (transactions.length > 20) transactions.pop();

  const li = document.createElement("li");
  li.classList.add(txn.status.toLowerCase());
  li.innerHTML = `
    <span><b>${txn.user}</b> - $${txn.amount.toFixed(2)} via ${txn.method}</span>
    <span class="status">${txn.status}</span>
  `;
  feedList.prepend(li);
  if (feedList.children.length > 20) feedList.removeChild(feedList.lastChild);

  updateStats();
  updateCharts();
}

// --- Simulate Real-time Updates ---
initCharts();
setInterval(addTransaction, 3000); // new transaction every 3s
