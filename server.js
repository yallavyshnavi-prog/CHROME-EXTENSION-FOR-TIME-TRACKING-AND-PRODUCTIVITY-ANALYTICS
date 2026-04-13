const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 📌 In-memory storage (for demo)
let data = {};

/*
STRUCTURE:
data = {
  "Mon Apr 13 2026": {
      "github.com": 5000,
      "youtube.com": 8000
  }
}
*/

// 🟢 PRODUCTIVE SITES LIST
const productiveSites = [
  "github.com",
  "stackoverflow.com",
  "leetcode.com",
  "geeksforgeeks.org"
];

// ========================================
// 📌 API 1: Track time
// ========================================
app.post("/track", (req, res) => {
  const { domain, timeSpent } = req.body;

  const today = new Date().toDateString();

  if (!data[today]) data[today] = {};

  if (!data[today][domain]) data[today][domain] = 0;

  data[today][domain] += timeSpent;

  res.send("Time tracked successfully");
});

// ========================================
// 📊 API 2: Daily Analytics
// ========================================
app.get("/analytics", (req, res) => {
  const today = new Date().toDateString();
  const todayData = data[today] || {};

  let result = [];

  for (let site in todayData) {
    let type = productiveSites.includes(site)
      ? "Productive"
      : "Unproductive";

    result.push({
      site,
      time: todayData[site],
      type
    });
  }

  res.json(result);
});

// ========================================
// 📅 API 3: Weekly Report
// ========================================
app.get("/weekly", (req, res) => {
  const now = new Date();
  let result = {};

  // last 7 days
  for (let i = 0; i < 7; i++) {
    let d = new Date();
    d.setDate(now.getDate() - i);

    let day = d.toDateString();

    if (data[day]) {
      for (let site in data[day]) {
        if (!result[site]) result[site] = 0;
        result[site] += data[day][site];
      }
    }
  }

  // add classification
  let finalResult = [];

  for (let site in result) {
    let type = productiveSites.includes(site)
      ? "Productive"
      : "Unproductive";

    finalResult.push({
      site,
      time: result[site],
      type
    });
  }

  res.json(finalResult);
});

// ========================================
// 🚀 Start Server
// ========================================
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`🚀 Backend running on port ${PORT}`);
});