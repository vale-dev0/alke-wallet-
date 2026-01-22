$(document).ready(function () {
  const $transactionsList = $("#transactionsList");
  const $currentBalance = $("#currentBalance");
  const $filterType = $("#filterType");

  const balance = Number(localStorage.getItem("balance")) || 0;
  const listaTransacciones =
    JSON.parse(localStorage.getItem("transactions")) || [];

  $currentBalance.text(
    balance.toLocaleString("es-CL", {
      style: "currency",
      currency: "CLP",
      minimumFractionDigits: 0,
    }),
  );

  mostrarUltimosMovimientos("todos");

  $filterType.on("change", function () {
    mostrarUltimosMovimientos($(this).val());
  });

  function mostrarUltimosMovimientos(filtro) {
    $transactionsList.empty();

    const filtradas =
      filtro === "todos"
        ? listaTransacciones
        : listaTransacciones.filter((t) => normalizarTipo(t.type) === filtro);

    if (filtradas.length === 0) {
      $transactionsList.append(`
        <li class="list-group-item text-center">
          No hay movimientos para este tipo
        </li>
      `);
      return;
    }

    filtradas
      .slice()
      .reverse()
      .forEach((t) => {
        const monto = t.amount.toLocaleString("es-CL", {
          style: "currency",
          currency: "CLP",
          minimumFractionDigits: 0,
        });

        const esTransferencia = t.type === "Transferencia";

        $transactionsList.append(`
          <li class="list-group-item d-flex justify-content-between">
            <span>${t.type} - ${t.description}</span>
            <span class="${
              esTransferencia ? "amount-negative" : "amount-positive"
            }">
              ${esTransferencia ? "-" : "+"}${monto}
            </span>
          </li>
        `);
      });
  }

  function normalizarTipo(tipo) {
    if (tipo === "Depósito") return "deposito";
    if (tipo === "Transferencia") return "transferencia";
    return "";
  }
});
