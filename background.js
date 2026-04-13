let currentTab = null;
let startTime = Date.now();

chrome.tabs.onActivated.addListener(activeInfo => {
  updateTime();
  currentTab = activeInfo.tabId;
  startTime = Date.now();
});

function updateTime() {
  if (!currentTab) return;

  chrome.tabs.get(currentTab, tab => {
    let url = new URL(tab.url);
    let domain = url.hostname;
    let timeSpent = Date.now() - startTime;

    fetch("http://localhost:5000/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ domain, timeSpent })
    });
  });
}