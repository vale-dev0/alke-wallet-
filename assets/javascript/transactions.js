document.addEventListener("DOMContentLoaded", () => {
  const transactionsList = document.getElementById("transactionsList");
  const currentBalance = document.getElementById("currentBalance");

  let balance = Number(localStorage.getItem("balance")) || 0;
  currentBalance.textContent = balance.toLocaleString("es-CL", {
    style: "currency",
    currency: "CLP",
    minimumFractionDigits: 0,
  });

  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

  if (transactions.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-center";
    li.textContent = "No hay movimientos registrados";
    transactionsList.appendChild(li);
  } else {
    transactions
      .slice()
      .reverse()
      .forEach((t) => {
        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between";

        const text = document.createElement("span");
        text.textContent = `${t.type} - ${t.description}`;

        const amount = document.createElement("span");

        const formattedAmount = t.amount.toLocaleString("es-CL", {
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
        transactionsList.appendChild(li);
      });
  }

  const msg = sessionStorage.getItem("transactionMessage");
  if (msg) {
    $("#transactionMessage").text(msg).fadeIn();

    sessionStorage.removeItem("transactionMessage");
  }
});
