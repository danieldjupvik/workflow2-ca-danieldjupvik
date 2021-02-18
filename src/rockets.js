/* --------- Rockets --------*/
var rocketElem = document.querySelector(".rocket-section");
var roadsterSpan = document.querySelector(".roadster");
var dragonsSpan = document.querySelector(".dragons");
var rocketSpan = document.querySelector(".rockets");
var cors = "https://noroffcors.herokuapp.com/";
var rocketBaseUrl = "https://api.spacexdata.com/v3/rockets";
var rocketUrl = cors + rocketBaseUrl;
fetch(rocketUrl)
    .then(function (Response) {
    return Response.json();
})
    .then(function (json) {
    getRockets(json);
})
    .catch(function (error) {
    console.log(error);
});
function getRockets(json) {
    var html = "";
    for (var index = 0; index < json.length; index++) {
        /* Fix broken spaceX urls from API*/
        var imageArray = json[index].flickr_images;
        var PATTERN = "spacex.com", imageArray = imageArray.filter(function (str) {
            return str.indexOf(PATTERN) === -1;
        });
        var placeholder = "https://mk0spaceflightnoa02a.kinstacdn.com/wp-content/uploads/2019/07/48380511427_eeafd03bd7_k.jpg";
        if (imageArray.length <= 1) {
        }
        else {
            placeholder = imageArray[1];
        }
        html += "\n    <div class=\"rocket-box\">\n      <a href=\"rocket-details.html?id=" + json[index].rocket_id + "\">\n        <img class=\"rocket-img\" src=\"" + placeholder + "\" alt=\"" + json[index].rocket_name + "\">\n      </a>\n      <h2 class=\"rocket-heading\">" + json[index].rocket_name + "</h2>\n      <p class=\"rocket-description\">" + json[index].description + "</p>\n      <div class=\"readMore-button-container\">\n      <a href=\"rocket-details.html?id=" + json[index].rocket_id + "\">\n       <div class=\"readMore-button\">Read more</div>\n      </a>\n      </div>\n    </div>\n    ";
    }
    rocketElem.innerHTML = html;
}
rocketSpan.classList.add("selection-active");
rocketSpan.addEventListener("click", fetchRockets);
rocketSpan.addEventListener("keypress", function (elem) {
    if (elem.key === "Enter") {
        fetchRockets();
    }
});
function fetchRockets() {
    fetch(rocketUrl)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getRockets(json);
    })
        .catch(function (error) {
        console.log(error);
    });
    rocketSpan.classList.add("selection-active");
    roadsterSpan.classList.remove("selection-active");
    dragonsSpan.classList.remove("selection-active");
}
/* --------- Roadster --------*/
roadsterSpan.addEventListener("click", fetchRoadster);
roadsterSpan.addEventListener("keypress", function (elem) {
    if (elem.key === "Enter") {
        fetchRoadster();
    }
});
function fetchRoadster() {
    var roadsterBaseUrl = "https://api.spacexdata.com/v3/roadster";
    var roadsterUrl = cors + roadsterBaseUrl;
    fetch(roadsterUrl)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getRoadster(json);
    })
        .catch(function (error) {
        console.log(error);
    });
    function getRoadster(json) {
        var html = "";
        html += "\n        <div class=\"rocket-box\">\n          <a href=\"rocket-details.html?type=roadster\">\n           <img class=\"rocket-img\" src=\"" + json.flickr_images[0] + "\" alt=\"" + json.name + "\">\n          </a>\n          <h2 class=\"rocket-heading\">" + json.name + "</h2>\n          <p class=\"rocket-description\">" + json.details + "</p>\n          <div class=\"readMore-button-container\">\n            <a href=\"rocket-details.html?type=roadster\">\n            <div class=\"readMore-button\">Read more</div>\n            </a>\n          </div>\n        </div>\n        ";
        rocketElem.innerHTML = html;
    }
    rocketSpan.classList.remove("selection-active");
    dragonsSpan.classList.remove("selection-active");
    roadsterSpan.classList.add("selection-active");
}
/* --------- Dragons --------*/
dragonsSpan.addEventListener("click", fetchDragons);
dragonsSpan.addEventListener("keypress", function (elem) {
    if (elem.key === "Enter") {
        fetchDragons();
    }
});
function fetchDragons() {
    var dragonsBaseUrl = "https://api.spacexdata.com/v3/dragons";
    var dragonsUrl = cors + dragonsBaseUrl;
    fetch(dragonsUrl)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getDragons(json);
    })
        .catch(function (error) {
        console.log(error);
    });
    function getDragons(json) {
        var html = "";
        for (var index = 0; index < json.length; index++) {
            var imageArray = json[index].flickr_images;
            var PATTERN = "spacex.com", imageArray = imageArray.filter(function (str) {
                return str.indexOf(PATTERN) === -1;
            });
            html += "\n        <div class=\"rocket-box\">\n          <a href=\"rocket-details.html?dragon-id=" + json[index].id + "\">\n            <img class=\"rocket-img\" src=\"" + json[index].flickr_images[2] + "\" alt=\"" + json[index].name + "\">\n          </a>\n          <h2 class=\"rocket-heading\">" + json[index].name + "</h2>\n          <p class=\"rocket-description\">" + json[index].description + "</p>\n          <div class=\"readMore-button-container\">\n          <a href=\"rocket-details.html?dragon-id=" + json[index].id + "\">\n           <div class=\"readMore-button\">Read more</div>\n          </a>\n          </div>\n        </div>\n        ";
            rocketElem.innerHTML = html;
        }
    }
    rocketSpan.classList.remove("selection-active");
    dragonsSpan.classList.add("selection-active");
    roadsterSpan.classList.remove("selection-active");
}
