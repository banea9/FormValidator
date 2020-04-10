const form = document.getElementById("form");
const username = document.getElementById("username");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmPassword = document.getElementById("password2");
const submitBtn = document.querySelector("button");

function showError(input, msg) {
  const formControl = input.parentElement;
  const smallEl = formControl.querySelector("small");
  formControl.className = "form-control error";
  smallEl.textContent = msg;
}

function showSuccess(input) {
  const formControl = input.parentElement;
  formControl.className = "form-control success";
}

function checkEmail(input) {
  let emailRegex = /[A-Za-z0-9]+@[A-Za-z0-9]+\.[A-Za-z]+/gim;
  if (!emailRegex.test(input.value)) {
    showError(input, `${getFieldName(input)} is not valid`);
  } else {
    showSuccess(input);
  }
}
function getFieldName(input) {
  return input.id.replace(input.id.charAt(0), input.id.charAt(0).toUpperCase());
}
function checkRequired(fieldArr) {
  fieldArr.forEach(field => {
    if (field.value.trim() === "") {
      showError(field, `${getFieldName(field)} is required`);
    } else {
      showSuccess(field);
    }
  });
}
function checkLength(input, minLength, maxLength) {
  if (input.value.length < minLength) {
    showError(
      input,
      `${getFieldName(input)} must be at least ${minLength} characters!`
    );
  } else if (input.value.length > maxLength) {
    showError(
      input,
      `${getFieldName(input)} must be less then ${maxLength} characters!`
    );
  } else {
    showSuccess(input);
  }
}

function checkPasswordMatch(firstPass, secondPass) {
  if (firstPass.value !== secondPass.value) {
      showError(secondPass, `Please make sure the passwords match!`)
  }
}
form.addEventListener("submit", function(ev) {
  ev.preventDefault();
  checkRequired([username, email, password, confirmPassword]);
  checkLength(username, 3, 15);
  checkLength(password, 6, 25);
  checkEmail(email);
  checkPasswordMatch(password, confirmPassword);
});
