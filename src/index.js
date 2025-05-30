import "./modern-normalize.css";
import "./styles.css";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email.error");

email.addEventListener("input", () => {
  emailError.textContent = "";
});

form.addEventListener("submit", (e) => {
  e.preventDefault();

  if (email.validity.valueMissing) {
    emailError.textContent = "Missing email";
  } else if (email.validity.typeMismatch) {
    emailError.textContent = "Not an email address";
  } else {
    emailError.textContent = "";
  }
});
