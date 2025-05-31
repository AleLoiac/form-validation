import "./modern-normalize.css";
import "./styles.css";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email.error");
const country = document.querySelector("#country");
const countryError = document.querySelector(".country.error");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector(".postal-code.error");

email.addEventListener("input", () => {
  emailError.textContent = "";
});

country.addEventListener("input", () => {
  countryError.textContent = "";
});

postalCode.addEventListener("input", () => {
  postalCodeError.textContent = "";
  if (country.validity.valid) {
    checkPostalCode();
  }
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

  const error = checkPostalCode();
  if (!postalCode.validity.valid) {
    postalCodeError.textContent = error;
  } else {
    postalCodeError.textContent = "";
  }
});

function checkPostalCode() {
  const constraints = {
    italy: ["^[0-9]{5}$", "Italian postal codes must have exactly 5 digits"],
    switzerland: [
      "^[1-9]\\d{3}$",
      "Swiss postal codes must have exactly 4 digits, where the first digit is not 0",
    ],
    spain: [
      "^(?:0[1-9]|[1-4]\\d|5[0-2])\\d{3}$",
      "Spanish postal codes are five-digit numbers ranging from 01001 to 52006",
    ],
  };

  const country = document.querySelector("#country").value;
  const postalCodeElement = document.querySelector("#postal-code");

  if (!country) {
    postalCode.setCustomValidity("Unsupported country");
    return "Unsupported country";
  }

  const constraint = new RegExp(constraints[country][0], "");

  if (constraint.test(postalCodeElement.value)) {
    postalCodeElement.setCustomValidity("");
  } else {
    postalCodeElement.setCustomValidity(constraints[country][1]);
    return constraints[country][1];
  }
}
