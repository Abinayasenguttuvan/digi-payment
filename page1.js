const transactions = [
    { id: 1001, user: "Alice", amount: 50.75, method: "Credit Card", status: "Success", date: "2025-09-01" },
    { id: 1002, user: "Bob", amount: 120, method: "UPI", status: "Pending", date: "2025-09-05" },
    { id: 1003, user: "Charlie", amount: 80.5, method: "Debit Card", status: "Success", date: "2025-09-08" },
    { id: 1004, user: "Eve", amount: 220.1, method: "Credit Card", status: "Success", date: "2025-09-12" },
    { id: 1005, user: "David", amount: 400, method: "Wallet", status: "Failed", date: "2025-09-18" },
    { id: 1006, user: "Bob", amount: 190.75, method: "UPI", status: "Success", date: "2025-09-22" },
    { id: 1007, user: "Alice", amount: 350.5, method: "Credit Card", status: "Success", date: "2025-09-25" },
    { id: 1008, user: "Charlie", amount: 180.2, method: "Debit Card", status: "Success", date: "2025-10-02" },
    { id: 1009, user: "Alice", amount: 230.5, method: "UPI", status: "Pending", date: "2025-10-10" },
    { id: 1010, user: "David", amount: 175.9, method: "Credit Card", status: "Success", date: "2025-10-12" }
  ];
  
  // Compute stats
  const totalRevenue = transactions.reduce((a, b) => a + b.amount, 0);
  const totalTransactions = transactions.length;
  const successRate = (transactions.filter(t => t.status === "Success").length / totalTransactions) * 100;
  const topUser = Object.entries(transactions.reduce((acc, t) => {
    acc[t.user] = (acc[t.user] || 0) + t.amount;
    return acc;
  }, {})).sort((a, b) => b[1] - a[1])[0];
  const pendingCount = transactions.filter(t => t.status === "Pending").length;
  const avgTransaction = totalRevenue / totalTransactions;
  const activeUsers = new Set(transactions.map(t => t.user)).size;
  
  // Update Widgets
  document.getElementById("totalRevenue").textContent = `$${totalRevenue.toFixed(2)}`;
  document.getElementById("successRate").textContent = `${successRate.toFixed(1)}%`;
  document.getElementById("totalTransactions").textContent = totalTransactions;
  document.getElementById("topUser").textContent = `${topUser[0]} ($${topUser[1].toFixed(2)})`;
  
  // Update Stat Boxes
  document.getElementById("avgTransaction").textContent = `$${avgTransaction.toFixed(2)}`;
  document.getElementById("pendingTransactions").textContent = pendingCount;
  document.getElementById("activeUsers").textContent = activeUsers;
  
  // Chart Data
  const methodRevenue = {};
  const statusCount = {};
  const monthlyRevenue = {};
  
  transactions.forEach(t => {
    methodRevenue[t.method] = (methodRevenue[t.method] || 0) + t.amount;
    statusCount[t.status] = (statusCount[t.status] || 0) + 1;
    const month = t.date.slice(0, 7);
    monthlyRevenue[month] = (monthlyRevenue[month] || 0) + t.amount;
  });
  
  // Render Charts
  new Chart(document.getElementById("methodChart"), {
    type: "bar",
    data: {
      labels: Object.keys(methodRevenue),
      datasets: [{ label: "Revenue ($)", data: Object.values(methodRevenue), backgroundColor: "#3b82f6" }]
    }
  });
  
  new Chart(document.getElementById("statusChart"), {
    type: "doughnut",
    data: {
      labels: Object.keys(statusCount),
      datasets: [{ data: Object.values(statusCount), backgroundColor: ["#16a34a", "#f59e0b", "#dc2626"] }]
    }
  });
  
  new Chart(document.getElementById("monthlyChart"), {
    type: "line",
    data: {
      labels: Object.keys(monthlyRevenue),
      datasets: [{
        label: "Monthly Revenue ($)",
        data: Object.values(monthlyRevenue),
        fill: true,
        backgroundColor: "rgba(59,130,246,0.2)",
        borderColor: "#2563eb",
        tension: 0.4
      }]
    }
  });
  