/* ----- Validate contact form ------ */
const formElem = document.getElementById("contactForm") as HTMLInputElement;
const firstNameElem = document.getElementById("firstName") as HTMLInputElement;
const lastNameElem = document.getElementById("lastName") as HTMLInputElement;
const emailElem = document.getElementById("email") as HTMLInputElement;
const messageElem = document.getElementById("message") as HTMLInputElement;
const validForm = document.querySelector(".form-valid") as HTMLInputElement;
const invalidForm = document.querySelectorAll(
  ".form-error"
) as NodeListOf<Element>;

formElem?.addEventListener("submit", function (event) {
  event.preventDefault();

  const firstNameValue: string = firstNameElem.value;
  const lastNameValue: string = lastNameElem.value;
  const emailValue: string = emailElem.value;
  const messageValue: string = messageElem.value;

  let isValid = true;

  if (validateNotEmpty(firstNameValue) === false) {
    (<HTMLElement>invalidForm[0]).style.display = "block";
    isValid = false;
  } else {
    (<HTMLElement>invalidForm[0]).style.display = "none";
  }

  if (validateNotEmpty(lastNameValue) === false) {
    (<HTMLElement>invalidForm[1]).style.display = "block";
    isValid = false;
  } else {
    (<HTMLElement>invalidForm[1]).style.display = "none";
  }

  if (validateEmail(emailValue) === false) {
    (<HTMLElement>invalidForm[2]).style.display = "block";
    isValid = false;
  } else {
    (<HTMLElement>invalidForm[2]).style.display = "none";
  }

  if (validateNotEmpty(emailValue) === false) {
    (<HTMLElement>invalidForm[3]).style.display = "block";
    isValid = false;
  } else {
    (<HTMLElement>invalidForm[3]).style.display = "none";
  }

  if (validateLength(messageValue)) {
    (<HTMLElement>invalidForm[4]).style.display = "block";
    isValid = false;
  } else {
    (<HTMLElement>invalidForm[4]).style.display = "none";
  }

  for (let index = 0; index < invalidForm.length; index++) {
    if (isValid === true) {
      validForm.style.display = "block";
      (<HTMLElement>invalidForm[index]).style.display = "none";
    } else {
      validForm.style.display = "none";
    }
  }
});

// Functions to check validation
function validateLength(value: any): boolean {
  if (value.length < 5) {
    return true;
  } else {
    return false;
  }
}

export function validateNotEmpty(value: string): boolean {
  let trimmedValue = value.trim();

  if (trimmedValue.length > 0) {
    return true;
  } else {
    return false;
  }
}

export function validateEmail(email: string): boolean | undefined {
  let regEx = /\S+@\S+\.\S+/;
  if (validateNotEmpty(email)) {
    let checkMail = regEx.test(email);
    return checkMail;
  }
}
