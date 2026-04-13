fetch("http://localhost:5000/analytics")
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById("list");
    list.innerHTML = "";

    data.forEach(item => {
      let li = document.createElement("li");

      li.textContent =
        `${item.site} → ${Math.round(item.time / 1000)} sec (${item.type})`;

      list.appendChild(li);
    });
  });