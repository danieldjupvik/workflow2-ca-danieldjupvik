global.fetch = require("node-fetch");

/*----- Toggle collapsible -----*/
var collapsible = document.getElementsByClassName(
  "collapsible"
) as HTMLCollectionOf<Element>;

for (let index: number = 0; index < collapsible.length; index++) {
  collapsible[index].addEventListener("click", function (this: any): void {
    this.classList.toggle("showContent");
    var content: any = this.nextElementSibling;
    if (content.style.display === "block") {
      content.style.display = "none";
    } else {
      content.style.display = "block";
    }
  });
}

/*----- Dynamically add Upcoming launches in DOM -----*/
const corsLaunches: string = "https://noroffcors.herokuapp.com/";
const upcomingBaseUrl: string =
  "https://api.spacexdata.com/v3/launches/upcoming";
const upcomingUrl: string = corsLaunches + upcomingBaseUrl;

fetch(upcomingUrl)
  .then(function (Response: any) {
    return Response.json();
  })
  .then(function (json: any) {
    getUpcomingLaunches(json);
  })
  .catch(function (error: any) {
    // console.log(error);
  });

function getUpcomingLaunches(json: any): void {
  const timelineElem = document.querySelector(".timeline") as Element;
  let html: string = "";
  for (let index: number = 0; index < json.length; index++) {
    var convertedTime: string = timeConverter(json[index].launch_date_unix);

    html += `
    <div class="upcoming container">
      <div class="timeline-content">
        <h2>${convertedTime}</h2>
        <div class="missionName-container">
          <p class="missionNameTitle">Mission Name</p>
          <p class="missionName">${json[index].mission_name}</p>
        </div>
        <div class="launchSite-container">
        <p class="launchSiteTitle">Launch site</p>
        <p class="launchSiteName">${json[index].launch_site.site_name}</p>
        </div>
      </div>
    </div>
   `;
  }
  timelineElem.innerHTML += html;
  upcomingAddLeftAndRight();
}

function upcomingAddLeftAndRight(): void {
  var container = document.getElementsByClassName("upcoming container");
  for (let index: number = 0; index < container.length; index++) {
    if (index % 2 == 0) {
      container[index].classList.add("left");
    } else {
      container[index].classList.add("right");
    }
  }
}

export function timeConverter(UNIX_timestamp: number): string {
  var a: Date = new Date(UNIX_timestamp * 1000);
  var months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year: number = a.getFullYear();
  var month: string = months[a.getMonth()];
  var date: number = a.getDate();
  var time: string = date + " " + month + " " + year;
  return time;
}

/*----- Past launches Custom Length -----*/
const pastBaseUrl: string =
  "https://api.spacexdata.com/v3/launches/past?order=desc";
const pastUrl: string = corsLaunches + pastBaseUrl;

fetch(pastUrl)
  .then(function (Response: any) {
    return Response.json();
  })
  .then(function (json: any) {
    getRecentLaunchesCustomLength(json);
  })
  .catch(function (error: any) {
    // console.log(error);
  });

function getRecentLaunchesCustomLength(json: any): void {
  const recentTimelineElem = document.querySelector(
    ".recent-timeline"
  ) as Element;
  let html: string = "";
  for (let index: number = 0; index < 14; index++) {
    var convertedTime: string = timeConverter(json[index].launch_date_unix);

    html += `
    <div class="recent container">
      <div class="timeline-content">
        <h2>${convertedTime}</h2>
        <p class="missionNameTitle">Mission Name</p>
        <h3>${json[index].mission_name}</h3>
        <p class="launchSiteTitle">Launch site</p>
        <p class="launchSiteName">${json[index].launch_site.site_name}</p>
      </div>
    </div>
   `;
  }
  recentTimelineElem.innerHTML = html;
  recentAddLeftAndRight();
  const loader = document.getElementsByClassName(
    "lds-ellipsis"
  ) as HTMLCollectionOf<Element>;
  loader[1].classList.add("hidden");
  loader[1].classList.remove("show");

  loader[0].classList.add("hidden");
  loader[0].classList.remove("show");
}

/*----- Add left and right class -----*/
function recentAddLeftAndRight(): void {
  var container = document.getElementsByClassName(
    "recent container"
  ) as HTMLCollectionOf<Element>;
  for (let index: number = 0; index < container.length; index++) {
    if (index % 2 == 0) {
      container[index].classList.add("left");
    } else {
      container[index].classList.add("right");
    }
  }
}

/*----- View All Past launches -----*/
const viewMoreButton = document.querySelector(".view-more") as Element;
const viewLessButton = document.querySelector(".view-less") as Element;

viewMoreButton?.addEventListener("click", function (): void {
  fetch(pastUrl)
    .then(function (Response: any) {
      return Response.json();
    })
    .then(function (json: any) {
      getRecentLaunchesAll(json);
    })
    .catch(function (error: any) {
      // console.log(error);
    });

  function getRecentLaunchesAll(json: any): void {
    const recentTimelineElem = document.querySelector(
      ".recent-timeline"
    ) as Element;
    let html: string = "";
    for (let index: number = 0; index < json.length; index++) {
      var convertedTime: string = timeConverter(json[index].launch_date_unix);

      html += `
          <div class="recent container">
            <div class="timeline-content">
              <h2>${convertedTime}</h2>
              <p class="missionNameTitle">Mission Name</p>
              <h3>${json[index].mission_name}</h3>
              <p class="launchSiteTitle">Launch site</p>
              <p class="launchSiteName">${json[index].launch_site.site_name}</p>
            </div>
          </div>
         `;
    }
    recentTimelineElem.innerHTML = html;
    recentAddLeftAndRight();
    const loader = document.getElementsByClassName(
      "lds-ellipsis"
    ) as HTMLCollectionOf<Element>;
    loader[1].classList.add("hidden");
    loader[1].classList.remove("show");

    loader[0].classList.add("hidden");
    loader[0].classList.remove("show");
  }
  (<HTMLElement>viewMoreButton).style.display = "none";
  (<HTMLElement>viewLessButton).style.display = "block";
  const loader = document.getElementsByClassName(
    "lds-ellipsis"
  ) as HTMLCollectionOf<Element>;
  loader[1].classList.add("show");
  loader[1].classList.remove("hidden");
});

/*----- View Less Past launches Custom Length -----*/
viewLessButton?.addEventListener("click", function (): void {
  fetch(pastUrl)
    .then(function (Response: any) {
      return Response.json();
    })
    .then(function (json: any) {
      getRecentLaunchesCustomLength(json);
    })
    .catch(function (error: any) {
      // console.log(error);
    });

  (<HTMLElement>viewMoreButton).style.display = "block";
  (<HTMLElement>viewLessButton).style.display = "none";
});

/*----- Countdown to next launch -----*/
function timeConverterFull(UNIX_timestamp: number): string {
  var a: Date = new Date(UNIX_timestamp * 1000);
  var months: string[] = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  var year: number = a.getFullYear();
  var month: string = months[a.getMonth()];
  var date: number = a.getDate();
  var hour: number = a.getHours();
  var min: number = a.getMinutes();
  var sec: number = a.getSeconds();
  var time: string =
    month + " " + date + ", " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}

const nextLaunchBaseUrl: string = "https://api.spacexdata.com/v3/launches/next";
const nextLaunchUrl: string = corsLaunches + nextLaunchBaseUrl;

fetch(nextLaunchUrl)
  .then(function (Response: any) {
    return Response.json();
  })
  .then(function (json: any) {
    getUpcomingDate(json);
  })
  .catch(function (error: any) {
    // console.log(error);
  });

function getUpcomingDate(json: any): void {
  setInterval(function (): void {
    var unixTimeFromApi: any = json.launch_date_unix;

    let convertedTime: string = timeConverterFull(unixTimeFromApi);
    var countDownDate: number = new Date(convertedTime).getTime();
    const countDownElem = document.querySelector(
      ".countdown-container"
    ) as Element;

    var now: number = new Date().getTime();
    var distance: number = countDownDate - now;
    var days: number = Math.floor(distance / (1000 * 60 * 60 * 24));
    var hours: number = Math.floor(
      (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    var minutes: number = Math.floor(
      (distance % (1000 * 60 * 60)) / (1000 * 60)
    );
    var seconds: number = Math.floor((distance % (1000 * 60)) / 1000);
    var html: string = `<span>${days}d</span> <span>${hours}h</span> <span>${minutes}m</span> <span>${seconds}s</span>`;
    countDownElem.innerHTML = html;
  }, 1000);
}
