/*----- Toggle collapsible -----*/
var collapsible = document.getElementsByClassName("collapsible");
for (var index = 0; index < collapsible.length; index++) {
    collapsible[index].addEventListener("click", function () {
        this.classList.toggle("showContent");
        var content = this.nextElementSibling;
        if (content.style.display === "block") {
            content.style.display = "none";
        }
        else {
            content.style.display = "block";
        }
    });
}
/*----- Dynamically add Upcoming launches in DOM -----*/
var corsLaunches = "https://noroffcors.herokuapp.com/";
var upcomingBaseUrl = "https://api.spacexdata.com/v3/launches/upcoming";
var upcomingUrl = corsLaunches + upcomingBaseUrl;
fetch(upcomingUrl)
    .then(function (Response) {
    return Response.json();
})
    .then(function (json) {
    getUpcomingLaunches(json);
})
    .catch(function (error) {
    console.log(error);
});
function getUpcomingLaunches(json) {
    var timelineElem = document.querySelector(".timeline");
    var html = "";
    for (var index = 0; index < json.length; index++) {
        var convertedTime = timeConverter(json[index].launch_date_unix);
        html += "\n    <div class=\"upcoming container\">\n      <div class=\"timeline-content\">\n        <h2>" + convertedTime + "</h2>\n        <div class=\"missionName-container\">\n          <p class=\"missionNameTitle\">Mission Name</p>\n          <p class=\"missionName\">" + json[index].mission_name + "</p>\n        </div>\n        <div class=\"launchSite-container\">\n        <p class=\"launchSiteTitle\">Launch site</p>\n        <p class=\"launchSiteName\">" + json[index].launch_site.site_name + "</p>\n        </div>\n      </div>\n    </div>\n   ";
    }
    timelineElem.innerHTML += html;
    upcomingAddLeftAndRight();
}
function upcomingAddLeftAndRight() {
    var container = document.getElementsByClassName("upcoming container");
    for (var index = 0; index < container.length; index++) {
        if (index % 2 == 0) {
            container[index].classList.add("left");
        }
        else {
            container[index].classList.add("right");
        }
    }
}
function timeConverter(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
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
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + " " + month + " " + year;
    return time;
}
/*----- Past launches Custom Length -----*/
var pastBaseUrl = "https://api.spacexdata.com/v3/launches/past?order=desc";
var pastUrl = corsLaunches + pastBaseUrl;
fetch(pastUrl)
    .then(function (Response) {
    return Response.json();
})
    .then(function (json) {
    getRecentLaunchesCustomLength(json);
})
    .catch(function (error) {
    console.log(error);
});
function getRecentLaunchesCustomLength(json) {
    var recentTimelineElem = document.querySelector(".recent-timeline");
    var html = "";
    for (var index = 0; index < 14; index++) {
        var convertedTime = timeConverter(json[index].launch_date_unix);
        html += "\n    <div class=\"recent container\">\n      <div class=\"timeline-content\">\n        <h2>" + convertedTime + "</h2>\n        <p class=\"missionNameTitle\">Mission Name</p>\n        <h3>" + json[index].mission_name + "</h3>\n        <p class=\"launchSiteTitle\">Launch site</p>\n        <p class=\"launchSiteName\">" + json[index].launch_site.site_name + "</p>\n      </div>\n    </div>\n   ";
    }
    recentTimelineElem.innerHTML = html;
    recentAddLeftAndRight();
    var loader = document.getElementsByClassName("lds-ellipsis");
    loader[1].classList.add("hidden");
    loader[1].classList.remove("show");
    loader[0].classList.add("hidden");
    loader[0].classList.remove("show");
}
/*----- Add left and right class -----*/
function recentAddLeftAndRight() {
    var container = document.getElementsByClassName("recent container");
    for (var index = 0; index < container.length; index++) {
        if (index % 2 == 0) {
            container[index].classList.add("left");
        }
        else {
            container[index].classList.add("right");
        }
    }
}
/*----- View All Past launches -----*/
var viewMoreButton = document.querySelector(".view-more");
var viewLessButton = document.querySelector(".view-less");
viewMoreButton.addEventListener("click", function () {
    fetch(pastUrl)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getRecentLaunchesAll(json);
    })
        .catch(function (error) {
        console.log(error);
    });
    function getRecentLaunchesAll(json) {
        var recentTimelineElem = document.querySelector(".recent-timeline");
        var html = "";
        for (var index = 0; index < json.length; index++) {
            var convertedTime = timeConverter(json[index].launch_date_unix);
            html += "\n          <div class=\"recent container\">\n            <div class=\"timeline-content\">\n              <h2>" + convertedTime + "</h2>\n              <p class=\"missionNameTitle\">Mission Name</p>\n              <h3>" + json[index].mission_name + "</h3>\n              <p class=\"launchSiteTitle\">Launch site</p>\n              <p class=\"launchSiteName\">" + json[index].launch_site.site_name + "</p>\n            </div>\n          </div>\n         ";
        }
        recentTimelineElem.innerHTML = html;
        recentAddLeftAndRight();
        var loader = document.getElementsByClassName("lds-ellipsis");
        loader[1].classList.add("hidden");
        loader[1].classList.remove("show");
        loader[0].classList.add("hidden");
        loader[0].classList.remove("show");
    }
    viewMoreButton.style.display = "none";
    viewLessButton.style.display = "block";
    var loader = document.getElementsByClassName("lds-ellipsis");
    loader[1].classList.add("show");
    loader[1].classList.remove("hidden");
});
/*----- View Less Past launches Custom Length -----*/
viewLessButton.addEventListener("click", function () {
    fetch(pastUrl)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getRecentLaunchesCustomLength(json);
    })
        .catch(function (error) {
        console.log(error);
    });
    viewMoreButton.style.display = "block";
    viewLessButton.style.display = "none";
});
/*----- Countdown to next launch -----*/
function timeConverterFull(UNIX_timestamp) {
    var a = new Date(UNIX_timestamp * 1000);
    var months = [
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
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var hour = a.getHours();
    var min = a.getMinutes();
    var sec = a.getSeconds();
    var time = month + " " + date + ", " + year + " " + hour + ":" + min + ":" + sec;
    return time;
}
var nextLaunchBaseUrl = "https://api.spacexdata.com/v3/launches/next";
var nextLaunchUrl = corsLaunches + nextLaunchBaseUrl;
fetch(nextLaunchUrl)
    .then(function (Response) {
    return Response.json();
})
    .then(function (json) {
    getUpcomingDate(json);
})
    .catch(function (error) {
    console.log(error);
});
function getUpcomingDate(json) {
    setInterval(function () {
        var unixTimeFromApi = json.launch_date_unix;
        var convertedTime = timeConverterFull(unixTimeFromApi);
        var countDownDate = new Date(convertedTime).getTime();
        var countDownElem = document.querySelector(".countdown-container");
        var now = new Date().getTime();
        var distance = countDownDate - now;
        var days = Math.floor(distance / (1000 * 60 * 60 * 24));
        var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        var seconds = Math.floor((distance % (1000 * 60)) / 1000);
        var html = "<span>" + days + "d</span> <span>" + hours + "h</span> <span>" + minutes + "m</span> <span>" + seconds + "s</span>";
        countDownElem.innerHTML = html;
    }, 1000);
}
