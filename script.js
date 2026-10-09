
const form = document.querySelector("#loginForm");
const password = document.querySelector("#password");
const toggle = document.querySelector("#togglePassword");
const message = document.querySelector("#message");

toggle.addEventListener("click", () => {
  const showing = password.type === "text";
  password.type = showing ? "password" : "text";
  toggle.textContent = showing ? "Show" : "Hide";
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    form.reportValidity();
    return;
  }

  message.textContent =
    "Demo successful! This UI is ready to customize ✨";
});
