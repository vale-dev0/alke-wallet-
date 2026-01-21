document.addEventListener("DOMContentLoaded", function () {
  const registerForm = document.getElementById("register-form");

  registerForm.addEventListener("submit", function (e) {
    e.preventDefault();

    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value;
    const repPassword = document.getElementById("rep-password").value;

    if (!email || !password || !repPassword) {
      alert("Completa todos los campos");
      return;
    }

    if (password !== repPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const passwordRegex = /[0-9*]/;
    if (!passwordRegex.test(password)) {
      alert("La contraseña debe tener al menos un número o un *");
      return;
    }

    const user = { email, password };
    localStorage.setItem("user", JSON.stringify(user));

    alert("Usuario registrado con éxito!");
    window.location.href = "../index.html";
  });
});
