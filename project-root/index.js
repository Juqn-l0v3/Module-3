import { deletes, get, post } from "./services.js";

const app = document.getElementById("app");

const routes = {
  "/": "./pages/index.html",
  "/login": "./pages/login.html",
  "/registeruser": "./pages/register.html",
};

function router() {
  const hash = window.location.hash || "#/";
  const route = hash.slice(1);

  fetch(routes[route])
    .then((res) => res.text())
    .then((data) => {
      const user_current = JSON.parse(localStorage.getItem("user"));

      if (route === "login" && user_current) {
        window.location.hash = "/";
      }

      if (
        route === "/registeruser" &&
        (!user_current || !user_current.is_visitor)
      ) {
        window.location.hash = "/";
      }

      app.innerHTML = data;
      setListeners(route);
    });
}

async function setListeners(route) {
  if (route === "/login") {
    const formLogin = document.getElementById("login-form");
    if (formLogin) {
      formLogin.addEventListener("submit", async (e) => {
        e.preventDefault();
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        const users = await get("/users");
        const found_user = users.find(
          (user) => user.email === email && user.password === password
        );

        if (found_user) {
          localStorage.setItem("user", JSON.stringify(found_user));
        }
      });
    }
  }
}


if (route === "/registeruser") {
  const formRegisterUser = document.getElementById("register-user-form");
  if (formRegisterUser) {
    formRegisterUser.addEventListener("submit", async (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;

      const user = { name, email, password };

      try {
        const response = await post("/visitors", user);
        if (response && response.ok) {
          alert("Usuario registrado correctamente");
          window.location.hash = "/visitor";
        } else {
          alert("Error al registrar usuario");
        }
      } catch (error) {
        alert("Error en la petición");
      }
    });
  }
}
