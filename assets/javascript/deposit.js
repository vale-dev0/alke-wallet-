$(document).ready(function () {
  const $depositInput = $("#depositAmount");
  const $depositBtn = $("#depositBtn");
  const $currentBalance = $("#currentBalance");
  const $depositMessage = $("#depositMessage");

  let balance = localStorage.getItem("balance");
  if (balance === null) {
    balance = 1000;
    localStorage.setItem("balance", balance);
  } else {
    balance = Number(balance);
  }

  $currentBalance.text(
    balance.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }),
  );

  $depositBtn.click(function () {
    const amount = Number($depositInput.val());

    if (!amount || amount <= 0) {
      $depositMessage.css("color", "red").text("Ingresa un monto válido");
      return;
    }

    balance += amount;
    localStorage.setItem("balance", balance);

    $currentBalance.text(
      balance.toLocaleString("es-CL", {
        style: "currency",
        currency: "CLP",
        minimumFractionDigits: 0,
      }),
    );

    let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
    transactions.push({
      type: "Depósito",
      description: "Depósito en efectivo",
      amount: amount,
      date: new Date().toLocaleString(),
    });
    localStorage.setItem("transactions", JSON.stringify(transactions));

    $depositMessage
      .css("color", "green")
      .text(
        `Depósito de ${amount.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })} realizado. Nuevo saldo: ${balance.toLocaleString("es-CL", { style: "currency", currency: "CLP", minimumFractionDigits: 0 })}`,
      );

    $depositInput.val("");
  });
});
