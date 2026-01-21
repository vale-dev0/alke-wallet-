const logoutButton = $("#logout-btn");

logoutButton.on("click", function () {
  localStorage.clear();
  window.location.replace("/index.html");
});
