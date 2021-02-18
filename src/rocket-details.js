/* --------- Rockets --------*/
var rocketElemDetails = document.querySelector(".detail-rocket-section");
var queryString = document.location.search;
var params = new URLSearchParams(queryString);
var id;
if (params.has("id")) {
    id = params.get("id");
    rocketDetails();
}
else {
    //document.location.href = "/";
}
function rocketDetails() {
    var baseUrl = "https://api.spacexdata.com/v3/rockets/";
    var cors = "https://noroffcors.herokuapp.com/";
    var url = cors + baseUrl + id;
    fetch(url)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getRocketDetails(json);
    })
        .catch(function (error) {
        document.location.href = "error.html";
    });
    function getRocketDetails(json) {
        var html = "";
        /* Fix broken spaceX urls from API*/
        var imageArray = json.flickr_images;
        var PATTERN = "spacex.com", imageArray = imageArray.filter(function (str) {
            return str.indexOf(PATTERN) === -1;
        });
        var placeholder = "https://mk0spaceflightnoa02a.kinstacdn.com/wp-content/uploads/2019/07/48380511427_eeafd03bd7_k.jpg";
        if (imageArray.length <= 1) {
        }
        else {
            placeholder = imageArray[1];
        }
        var burnTime = "unknown";
        var layout = "unknown";
        var version = "unknown";
        if (json.first_stage.burn_time_sec === null) {
        }
        else {
            burnTime = json.first_stage.burn_time_sec;
        }
        if (json.engines.layout === null) {
        }
        else {
            layout = json.engines.layout;
        }
        if (json.engines.version === "") {
        }
        else {
            version = json.engines.version;
        }
        html += "\n    <div class=\"detail-rocket-box\">\n      <img class=\"rocket-img\" src=\"" + placeholder + "\" alt=\"" + json.rocket_name + "\">\n      <h1 class=\"header\">" + json.rocket_name + "</h1>\n      <div class=\"backAndDescription-container\">\n        <div class=\"goBack-button-container\">\n          <a href=\"./rockets.html\">\n          <div class=\"goBack-button\">&laquo; Go back</div>\n          </a>\n        </div>\n        <p class=\"rocket-description\">" + json.description + "</p>\n      </div>\n      <h2 class=\"subheading\">Information</h2>\n      <div class=\"detail-list\">\n        <ul>\n          <li><strong>First Flight:</strong> " + json.first_flight + "</li>\n          <li><strong>Country:</strong> " + json.country + "</li>\n          <li><strong>Company:</strong> " + json.company + "</li>\n          <li><strong>Height:</strong> " + json.height.meters + " m</li>\n          <li><strong>Diameter:</strong> " + json.diameter.meters + " m</li>\n          <li><strong>Weight:</strong> " + json.mass.kg + " kg</li>\n          <li><strong>Payload:</strong> " + json.payload_weights[0].kg + " kg</li>\n        <li class=\"thirdLineList\"><strong>First Stage</strong>\n          <ul class=\"secondLineList\">\n            <li><strong>Engines:</strong> " + json.first_stage.engines + "</li>\n            <li><strong>Fuel:</strong> " + json.first_stage.fuel_amount_tons + " ton</li>\n            <li><strong>Burn time:</strong> " + burnTime + "</li>\n          </ul>\n        </li>\n        <li class=\"thirdLineList\"><strong>Second Stage</strong>\n          <ul class=\"secondLineList\">\n            <li><strong>Engines:</strong> " + json.second_stage.engines + "</li>\n            <li><strong>Fuel:</strong> " + json.second_stage.fuel_amount_tons + " ton</li>\n            <li><strong>Burn time:</strong> " + burnTime + "</li>\n          </ul>\n        </li>\n        <li class=\"thirdLineList\"><strong>Engines</strong>\n          <ul class=\"secondLineList\">\n            <li><strong>Number:</strong> " + json.engines.number + "</li>\n            <li><strong>Type:</strong> " + json.engines.type + "</li>\n            <li><strong>Version:</strong> " + version + "</li>\n            <li><strong>Layout:</strong> " + layout + "</li>\n          </li>\n          </ul>\n        </ul>\n      </div>\n    </div>\n    ";
        rocketElemDetails.innerHTML = html;
        document.title = json.rocket_name + " - " + "LASR";
    }
}
/* --------- Roadster --------*/
if (params.has("type")) {
    roadsterDetails();
}
else {
    //document.location.href = "/";
}
function roadsterDetails() {
    var baseUrl = "https://api.spacexdata.com/v3/roadster";
    var cors = "https://noroffcors.herokuapp.com/";
    var url = cors + baseUrl;
    fetch(url)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getRoadsterDetails(json);
    })
        .catch(function (error) {
        document.location.href = "error.html";
    });
    function getRoadsterDetails(json) {
        var html = "";
        var timeConverted = timeConverterRockets(json.launch_date_unix);
        html += "\n    <div class=\"detail-rocket-box\">\n      <img class=\"rocket-img\" src=\"" + json.flickr_images[0] + "\" alt=\"" + json.name + "\">\n      <h1 class=\"header\">" + json.name + "</h1>\n      <div class=\"backAndDescription-container\">\n        <div class=\"goBack-button-container\">\n          <a href=\"./rockets.html\">\n          <div class=\"goBack-button\">&laquo; Go back</div>\n          </a>\n        </div>\n        <p class=\"rocket-description\">" + json.details + "</p>\n      </div>\n      <h2 class=\"subheading\">Information</h2>\n      <div class=\"detail-list\">\n        <ul>\n          <li><strong>Launch date:</strong> " + timeConverted + "</li>\n          <li><strong>launch Mass:</strong> " + json.launch_mass_kg + " kg</li>\n          <li><strong>Orbit type:</strong> " + json.orbit_type + "</li>\n          <li><strong>Speed:</strong> " + json.speed_kph + " kph</li>\n          <li><strong>Earth distance:</strong> " + json.earth_distance_km + " km</li>\n          <li><strong>Mars distance:</strong> " + json.mars_distance_km + " km</li>\n        </ul>\n      </div>\n    </div>\n    ";
        rocketElemDetails.innerHTML = html;
        document.title = json.name + " - " + "LASR";
    }
}
/* --------- Dragons --------*/
var dragonId;
if (params.has("dragon-id")) {
    dragonId = params.get("dragon-id");
    dragonDetails();
}
else {
    //document.location.href = "/";
}
function dragonDetails() {
    var baseUrl = "https://api.spacexdata.com/v3/dragons/";
    var cors = "https://noroffcors.herokuapp.com/";
    var url = cors + baseUrl + dragonId;
    fetch(url)
        .then(function (Response) {
        return Response.json();
    })
        .then(function (json) {
        getDragonDetails(json);
    })
        .catch(function (error) {
        document.location.href = "error.html";
    });
    function getDragonDetails(json) {
        var active = "No";
        var html = "";
        if (json.active === true) {
            active = "Yes";
        }
        html += "\n    <div class=\"detail-rocket-box\">\n      <img class=\"rocket-img\" src=\"" + json.flickr_images[2] + "\" alt=\"" + json.name + "\">\n      <h1 class=\"header\">" + json.name + "</h1>\n      <div class=\"backAndDescription-container\">\n        <div class=\"goBack-button-container\">\n          <a href=\"./rockets.html\">\n          <div class=\"goBack-button\">&laquo; Go back</div>\n          </a>\n        </div>\n        <p class=\"rocket-description\">" + json.description + "</p>\n      </div>\n      <h2 class=\"subheading\">Information</h2>\n      <div class=\"detail-list\">\n        <ul>\n          <li><strong>First flight:</strong> " + json.first_flight + "</li>\n          <li><strong>Active:</strong> " + active + "</li>\n          <li><strong>Dry Mass:</strong> " + json.dry_mass_kg + " kg</li>\n          <li><strong>Type:</strong> " + json.type + "</li>\n          <li><strong>Diameter:</strong> " + json.diameter.meters + " m</li>\n          <li><strong>Height:</strong> " + json.height_w_trunk.meters + " m</li>\n        </ul>\n      </div>\n    </div>\n    ";
        rocketElemDetails.innerHTML = html;
        document.title = json.name + " - " + "LASR";
    }
}
function timeConverterRockets(UNIX_timestamp) {
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
