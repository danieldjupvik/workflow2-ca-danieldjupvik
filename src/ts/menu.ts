/*----- Hamburger menu -----*/
function openHamburgerMenu(elem: any): void {
  elem.classList.toggle("change");
  var topnavContainer = document.getElementById(
    "topnav-container"
  ) as HTMLElement;
  var topnav = document.querySelector(".topnav") as Element;

  if (topnavContainer.className === "hideMenu") {
    topnavContainer.classList.remove("hideMenu");
    topnavContainer.classList.add("showMenu");
    topnav.classList.add("shadowAndBorder");
  } else {
    topnavContainer.classList.remove("showMenu");
    topnavContainer.classList.add("hideMenu");
    topnav.classList.remove("shadowAndBorder");
  }
}
/*----- Close hamburger menu by touching outside the navbar-----*/
const bodyElem = document.querySelector("main") as HTMLElement;
const iconContainer = document.querySelector(".icon-container") as Element;

bodyElem.addEventListener("click", function (): void {
  var topnavContainer = document.getElementById(
    "topnav-container"
  ) as HTMLElement;
  var topnav = document.querySelector(".topnav") as Element;
  if (topnavContainer.className === "hideMenu") {
  } else {
    topnavContainer.classList.remove("showMenu");
    topnavContainer.classList.add("hideMenu");
    topnav.classList.remove("shadowAndBorder");
    iconContainer.classList.toggle("change");
  }
});

/* Fix a bug, mobile navbar would not close when resized to desktop and remove shadow and toggle icon */
var topnavContainer = document.getElementById(
  "topnav-container"
) as HTMLElement;
var topnav = document.querySelector(".topnav") as Element;
window.addEventListener("resize", displayWindowSize);

function displayWindowSize(): void {
  var currentWidth: number = window.innerWidth;

  if (currentWidth > 760) {
    topnav.classList.remove("shadowAndBorder");
  } else {
    topnavContainer.classList.remove("showMenu");
    topnavContainer.classList.add("hideMenu");
    iconContainer.classList.remove("change");
  }
}
