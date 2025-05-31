import "./modern-normalize.css";
import "./styles.css";

const form = document.querySelector("form");
const email = document.querySelector("#email");
const emailError = document.querySelector(".email.error");
const country = document.querySelector("#country");
const countryError = document.querySelector(".country.error");
const postalCode = document.querySelector("#postal-code");
const postalCodeError = document.querySelector(".postal-code.error");
const password = document.querySelector("#password");
const passwordError = document.querySelector(".password.error");
const confirmPassword = document.querySelector("#confirm-password");
const confirmPasswordError = document.querySelector(".confirm-password.error");
const feedback = document.querySelector(".feedback");

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

password.addEventListener("input", () => {
  passwordError.textContent = "";
});

confirmPassword.addEventListener("input", () => {
  confirmPasswordError.textContent = "";
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

  if (password.validity.tooShort) {
    passwordError.textContent = "Password must be at least 8 characters";
  } else {
    passwordError.textContent = "";
  }

  checkPassword();
  if (!confirmPassword.validity.valid) {
    confirmPasswordError.textContent = "Password must be equal";
  } else {
    confirmPasswordError.textContent = "";
  }

  if (form.checkValidity()) {
    feedback.textContent = "Form successfully submitted";
  } else {
    feedback.textContent = "Invalid form";
  }
});

function checkPassword() {
  const password = document.querySelector("#password").value;
  const confirmPasswordElement = document.querySelector("#confirm-password");

  if (password === confirmPassword.value) {
    confirmPassword.setCustomValidity("");
  } else {
    confirmPassword.setCustomValidity("Passwords must be equal");
  }
}

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
