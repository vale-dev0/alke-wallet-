const addContactBtn = document.getElementById("addContactBtn");
const saveContactBtn = document.getElementById("saveContactBtn");
const contactList = document.getElementById("contactList");

const contactName = document.getElementById("contactName");
const contactRUT = document.getElementById("contactRUT");
const contactAlias = document.getElementById("contactAlias");
const contactBank = document.getElementById("contactBank");
const newContactForm = document.getElementById("newContactForm");

const searchContactInput = document.getElementById("search-contact");
const sendMoneyBtn = document.getElementById("sendMoneyBtn");

let contacts = JSON.parse(localStorage.getItem("contacts")) || [];
let selectedIndex = null;

addContactBtn?.addEventListener("click", () => {
  newContactForm.classList.toggle("d-none");
});

function renderContacts(list = contacts) {
  contactList.innerHTML = "";

  if (list.length === 0) {
    const li = document.createElement("li");
    li.className = "list-group-item text-center";
    li.textContent = "No hay contactos guardados";
    contactList.appendChild(li);
    return;
  }

  list.forEach((contact) => {
    const li = document.createElement("li");
    li.className = "list-group-item";
    li.textContent = `${contact.name} | ${contact.bank}`;

    li.addEventListener("click", () => {
      selectedIndex = contacts.indexOf(contact);
      document
        .querySelectorAll(".list-group-item")
        .forEach((el) => el.classList.remove("active"));
      li.classList.add("active");
    });

    contactList.appendChild(li);
  });
}

renderContacts();

saveContactBtn?.addEventListener("click", () => {
  if (
    !contactName.value ||
    !contactRUT.value ||
    !contactAlias.value ||
    !contactBank.value
  ) {
    alert("Completa todos los campos");
    return;
  }

  contacts.push({
    name: contactName.value,
    rut: contactRUT.value,
    alias: contactAlias.value,
    bank: contactBank.value,
  });

  localStorage.setItem("contacts", JSON.stringify(contacts));

  contactName.value = "";
  contactRUT.value = "";
  contactAlias.value = "";
  contactBank.value = "";

  newContactForm.classList.add("d-none");
  renderContacts();
});

searchContactInput.addEventListener("input", () => {
  const filter = searchContactInput.value.toLowerCase();
  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(filter) ||
      c.alias.toLowerCase().includes(filter) ||
      c.bank.toLowerCase().includes(filter),
  );
  renderContacts(filteredContacts);
});

const contactNames = contacts.map((c) => `${c.name} (${c.alias})`);

$(function () {
  $("#search-contact").autocomplete({
    source: contactNames,
    minLength: 1,
    select: function (event, ui) {
      const selectedText = ui.item.value;
      selectedIndex = contacts.findIndex(
        (c) => `${c.name} (${c.alias})` === selectedText,
      );

      document
        .querySelectorAll(".list-group-item")
        .forEach((el) => el.classList.remove("active"));
      const li = document.querySelectorAll(".list-group-item")[selectedIndex];
      if (li) li.classList.add("active");
    },
  });
});

sendMoneyBtn.addEventListener("click", (event) => {
  event.preventDefault();

  if (selectedIndex === null) {
    alert("Selecciona un contacto");
    return;
  }

  let balance = Number(localStorage.getItem("balance"));
  const amount = Number(prompt("Monto a enviar"));

  if (!amount || amount <= 0) {
    alert("Ingresa un monto válido");
    return;
  }

  if (amount > balance) {
    alert("Fondos insuficientes");
    return;
  }

  balance -= amount;
  localStorage.setItem("balance", balance);

  alert("Transferencia realizada");
  let transactions = JSON.parse(localStorage.getItem("transactions")) || [];
  const contact = contacts[selectedIndex];

  transactions.push({
    type: "Transferencia",
    description: `Enviado a ${contact.name} (${contact.alias})`,
    amount: amount,
  });

  localStorage.setItem("transactions", JSON.stringify(transactions));

  window.location.href = "dashboard.html";
});
