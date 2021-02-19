"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateEmail = exports.validateNotEmpty = exports.validateLength = void 0;
/* ----- Validate contact form ------ */
var formElem = document.getElementById("contactForm");
var firstNameElem = document.getElementById("firstName");
var lastNameElem = document.getElementById("lastName");
var emailElem = document.getElementById("email");
var messageElem = document.getElementById("message");
var validForm = document.querySelector(".form-valid");
var invalidForm = document.querySelectorAll(".form-error");
formElem === null || formElem === void 0 ? void 0 : formElem.addEventListener("submit", function (event) {
    event.preventDefault();
    var firstNameValue = firstNameElem.value;
    var lastNameValue = lastNameElem.value;
    var emailValue = emailElem.value;
    var messageValue = messageElem.value;
    var isValid = true;
    if (validateNotEmpty(firstNameValue) === false) {
        invalidForm[0].style.display = "block";
        isValid = false;
    }
    else {
        invalidForm[0].style.display = "none";
    }
    if (validateNotEmpty(lastNameValue) === false) {
        invalidForm[1].style.display = "block";
        isValid = false;
    }
    else {
        invalidForm[1].style.display = "none";
    }
    if (validateEmail(emailValue) === false) {
        invalidForm[2].style.display = "block";
        isValid = false;
    }
    else {
        invalidForm[2].style.display = "none";
    }
    if (validateNotEmpty(emailValue) === false) {
        invalidForm[3].style.display = "block";
        isValid = false;
    }
    else {
        invalidForm[3].style.display = "none";
    }
    if (validateLength(messageValue)) {
        invalidForm[4].style.display = "block";
        isValid = false;
    }
    else {
        invalidForm[4].style.display = "none";
    }
    for (var index = 0; index < invalidForm.length; index++) {
        if (isValid === true) {
            validForm.style.display = "block";
            invalidForm[index].style.display = "none";
        }
        else {
            validForm.style.display = "none";
        }
    }
});
// Functions to check validation
function validateLength(value) {
    if (value.length < 5) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateLength = validateLength;
function validateNotEmpty(value) {
    var trimmedValue = value.trim();
    if (trimmedValue.length > 0) {
        return true;
    }
    else {
        return false;
    }
}
exports.validateNotEmpty = validateNotEmpty;
function validateEmail(email) {
    var regEx = /\S+@\S+\.\S+/;
    if (validateNotEmpty(email)) {
        var checkMail = regEx.test(email);
        return checkMail;
    }
}
exports.validateEmail = validateEmail;
