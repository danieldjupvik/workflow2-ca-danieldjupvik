/*----- Dynamically update coordinates in DOM -----*/
var cors2 = "https://noroffcors.herokuapp.com/";
var issBaseUrl = "http://api.open-notify.org/iss-now.json";
var issUrl = cors2 + issBaseUrl;
function updateFetch() {
    fetch(issUrl)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        updateCoordinates(json);
    })
        .catch(function (error) {
        console.log(error);
    });
    function updateCoordinates(json) {
        var latiLongElem = document.querySelector(".lati-long");
        latiLongElem.innerHTML = "<span id=\"latitude\">" + json.iss_position.latitude + " \u00B0 N</span> <span id=\"longitude\">" + json.iss_position.longitude + " \u00B0 E</span>";
    }
}
setInterval(updateFetch, 1000);
/*----- Dynamically update people in space in DOM -----*/
var peopleBaseUrl = "http://api.open-notify.org/astros.json";
var peopleUrl = cors2 + peopleBaseUrl;
fetch(peopleUrl)
    .then(function (Response) {
    return Response.json();
})
    .then(function (json) {
    peopleInSpace(json);
})
    .catch(function (error) {
    console.log(error);
});
function peopleInSpace(json) {
    var peopleInSpaceSection = document.querySelector(".people-in-space");
    var apiResult = json.people;
    var html = "";
    for (var index = 0; index < apiResult.length; index++) {
        html += "\n    <div class=\"people-in-space-container\">\n      <p>" + apiResult[index].name + " on " + apiResult[index].craft + "</p>\n    </div>";
    }
    peopleInSpaceSection.innerHTML = html;
}
/*----- Dynamically update about SpaceX in DOM -----*/
var aboutSpaceXElem = document.getElementById("aboutSpaceX");
var spaceXBaseUrl = "https://api.spacexdata.com/v3/info";
var spacexUrl = cors2 + spaceXBaseUrl;
fetch(spacexUrl)
    .then(function (Response) {
    return Response.json();
})
    .then(function (json) {
    aboutSpaceX(json);
})
    .catch(function (error) {
    console.log(error);
});
function aboutSpaceX(json) {
    var html = "\n    <p class=\"summary\">\n    " + json.summary + "\n    </p>\n    <ul class=\"spaceXInfo-list\">\n      <li class=\"spaceXInfo-list-name\">" + json.name + "</li>\n      <li><strong>Founder:</strong> " + json.founder + "</li>\n      <li><strong>CEO:</strong> " + json.ceo + "</li>\n      <li><strong>Founded:</strong> " + json.founded + "</li>\n      \n      <li><strong>Employees:</strong> " + json.employees + " </li>\n      <li><strong>Test sites:</strong> " + json.test_sites + " </li>\n      <li><strong>Launch sites:</strong> " + json.launch_sites + " </li>\n      \n    </ul>\n    ";
    aboutSpaceXElem.innerHTML = html;
}
