document.addEventListener("DOMContentLoaded", () => {
  const balanceText = document.getElementById("balanceText");

  let balance = Number(localStorage.getItem("balance"));

  if (!balance || balance < 0) {
    balance = 0;
    localStorage.setItem("balance", balance);
  }

  balanceText.textContent = `$${balance.toLocaleString("es-CL")}`;

  const list = document.getElementById("lastTransactions");
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  list.innerHTML = "";

  if (transactions.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-center text-muted";
    li.textContent = "No hay movimientos registrados";
    list.appendChild(li);
    return;
  }

  transactions
    .slice(-3)
    .reverse()
    .forEach((t) => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between";

      const text = document.createElement("span");
      text.textContent = t.description;

      const amount = document.createElement("span");

      const formattedAmount = Number(t.amount).toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      });

      if (t.type === "Transferencia") {
        amount.textContent = `-${formattedAmount}`;
        amount.classList.add("amount-negative"); // rojo
      } else {
        amount.textContent = `+${formattedAmount}`;
        amount.classList.add("amount-positive"); // verde
      }

      li.appendChild(text);
      li.appendChild(amount);
      list.appendChild(li);
    });
});
