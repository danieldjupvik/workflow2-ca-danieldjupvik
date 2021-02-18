"use strict";
/*----- Hamburger menu -----*/
function openHamburgerMenu(elem) {
    elem.classList.toggle("change");
    var topnavContainer = document.getElementById("topnav-container");
    var topnav = document.querySelector(".topnav");
    if (topnavContainer.className === "hideMenu") {
        topnavContainer.classList.remove("hideMenu");
        topnavContainer.classList.add("showMenu");
        topnav.classList.add("shadowAndBorder");
    }
    else {
        topnavContainer.classList.remove("showMenu");
        topnavContainer.classList.add("hideMenu");
        topnav.classList.remove("shadowAndBorder");
    }
}
/*----- Close hamburger menu by touching outside the navbar-----*/
var bodyElem = document.querySelector("main");
var iconContainer = document.querySelector(".icon-container");
bodyElem.addEventListener("click", function () {
    var topnavContainer = document.getElementById("topnav-container");
    var topnav = document.querySelector(".topnav");
    if (topnavContainer.className === "hideMenu") {
    }
    else {
        topnavContainer.classList.remove("showMenu");
        topnavContainer.classList.add("hideMenu");
        topnav.classList.remove("shadowAndBorder");
        iconContainer.classList.toggle("change");
    }
});
/* Fix a bug, mobile navbar would not close when resized to desktop and remove shadow and toggle icon */
var topnavContainer = document.getElementById("topnav-container");
var topnav = document.querySelector(".topnav");
window.addEventListener("resize", displayWindowSize);
function displayWindowSize() {
    var currentWidth = window.innerWidth;
    if (currentWidth > 760) {
        topnav.classList.remove("shadowAndBorder");
    }
    else {
        topnavContainer.classList.remove("showMenu");
        topnavContainer.classList.add("hideMenu");
        iconContainer.classList.remove("change");
    }
}
