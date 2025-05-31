import "./modern-normalize.css";
import "./styles.css";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email.error");
const country = document.querySelector("#country");
const countryError = document.querySelector(".country.error");

email.addEventListener("input", () => {
  emailError.textContent = "";
});

country.addEventListener("input", () => {
  countryError.textContent = "";
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

  if (!country.validity.valid) {
    countryError.textContent = "Select a country";
  } else {
    countryError.textContent = "";
  }
});
