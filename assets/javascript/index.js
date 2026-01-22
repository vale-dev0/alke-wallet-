const form = $("#login-form");
const loginButton = $("#login-button");
const emailInput = $("#email");
const passwordInput = $("#password");
let disableButton = true;

loginButton.prop("disabled", true);

emailInput.on("input", function () {
  const thisEmail = $(this).val();
  if (
    thisEmail.length > 0 &&
    passwordInput.val().length > 0 &&
    thisEmail.includes("@")
  ) {
    disableButton = false;
    loginButton.prop("disabled", false);
  } else {
    disableButton = true;
    loginButton.prop("disabled", true);
  }
});

passwordInput.on("input", function () {
  const thisPassword = $(this).val();
  if (thisPassword.length > 0 && emailInput.val().length > 0) {
    disableButton = false;
    loginButton.prop("disabled", false);
  } else {
    disableButton = true;
    loginButton.prop("disabled", true);
  }
});

form.on("submit", function (event) {
  event.preventDefault();

  if (!disableButton) {
    const email = emailInput.val().trim();
    const password = passwordInput.val();
    const savedUser = JSON.parse(localStorage.getItem("user"));

    localStorage.setItem(
      "user",
      JSON.stringify({
        email: email,
        password: password,
      }),
    );

    $("#alert-container").empty();

    if (!savedUser) {
      $("#alert-container").html(`
        <div class="alert alert-warning mt-3">
          No hay usuarios registrados. Regístrate primero.
        </div>
      `);
      return;
    }

    if (email === savedUser.email && password === savedUser.password) {
      $("#alert-container").html(`
        <div class="alert alert-success mt-3">
          Login exitoso. Redirigiendo...
        </div>
      `);

      setTimeout(() => {
        window.location.href = "pages/dashboard.html";
      }, 1500);
    } else {
      $("#alert-container").html(`
        <div class="alert alert-danger mt-3">
          Email o contraseña incorrectos
        </div>
      `);
    }
  }
});
