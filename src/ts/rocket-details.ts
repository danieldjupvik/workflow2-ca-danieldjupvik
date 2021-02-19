/* --------- Rockets --------*/
const rocketElemDetails = document.querySelector(
  ".detail-rocket-section"
) as HTMLLIElement;
const queryString: string = document.location.search;
const params: URLSearchParams = new URLSearchParams(queryString);

let id: any;

if (params.has("id")) {
  id = params.get("id");
  rocketDetails();
} else {
  //document.location.href = "/";
}
function rocketDetails(): void {
  const baseUrl: string = "https://api.spacexdata.com/v3/rockets/";
  const cors: string = "https://noroffcors.herokuapp.com/";
  const url: string = cors + baseUrl + id;

  fetch(url)
    .then(function (Response: any) {
      return Response.json();
    })
    .then(function (json: any) {
      getRocketDetails(json);
    })
    .catch(function (error: any) {
      document.location.href = "error.html";
    });

  function getRocketDetails(json: any): void {
    var html: string = "";
    /* Fix broken spaceX urls from API*/
    var imageArray: any = json.flickr_images;
    var PATTERN: string = "spacex.com",
      imageArray = imageArray.filter(function (str: any) {
        return str.indexOf(PATTERN) === -1;
      });
    let placeholder: string =
      "https://mk0spaceflightnoa02a.kinstacdn.com/wp-content/uploads/2019/07/48380511427_eeafd03bd7_k.jpg";
    if (imageArray.length <= 1) {
    } else {
      placeholder = imageArray[1];
    }

    let burnTime: string = "unknown";
    let layout: string = "unknown";
    let version: string = "unknown";

    if (json.first_stage.burn_time_sec === null) {
    } else {
      burnTime = json.first_stage.burn_time_sec;
    }

    if (json.engines.layout === null) {
    } else {
      layout = json.engines.layout;
    }

    if (json.engines.version === "") {
    } else {
      version = json.engines.version;
    }

    html += `
    <div class="detail-rocket-box">
      <img class="rocket-img" src="${placeholder}" alt="${json.rocket_name}">
      <h1 class="header">${json.rocket_name}</h1>
      <div class="backAndDescription-container">
        <div class="goBack-button-container">
          <a href="./rockets.html">
          <div class="goBack-button">&laquo; Go back</div>
          </a>
        </div>
        <p class="rocket-description">${json.description}</p>
      </div>
      <h2 class="subheading">Information</h2>
      <div class="detail-list">
        <ul>
          <li><strong>First Flight:</strong> ${json.first_flight}</li>
          <li><strong>Country:</strong> ${json.country}</li>
          <li><strong>Company:</strong> ${json.company}</li>
          <li><strong>Height:</strong> ${json.height.meters} m</li>
          <li><strong>Diameter:</strong> ${json.diameter.meters} m</li>
          <li><strong>Weight:</strong> ${json.mass.kg} kg</li>
          <li><strong>Payload:</strong> ${json.payload_weights[0].kg} kg</li>
        <li class="thirdLineList"><strong>First Stage</strong>
          <ul class="secondLineList">
            <li><strong>Engines:</strong> ${json.first_stage.engines}</li>
            <li><strong>Fuel:</strong> ${json.first_stage.fuel_amount_tons} ton</li>
            <li><strong>Burn time:</strong> ${burnTime}</li>
          </ul>
        </li>
        <li class="thirdLineList"><strong>Second Stage</strong>
          <ul class="secondLineList">
            <li><strong>Engines:</strong> ${json.second_stage.engines}</li>
            <li><strong>Fuel:</strong> ${json.second_stage.fuel_amount_tons} ton</li>
            <li><strong>Burn time:</strong> ${burnTime}</li>
          </ul>
        </li>
        <li class="thirdLineList"><strong>Engines</strong>
          <ul class="secondLineList">
            <li><strong>Number:</strong> ${json.engines.number}</li>
            <li><strong>Type:</strong> ${json.engines.type}</li>
            <li><strong>Version:</strong> ${version}</li>
            <li><strong>Layout:</strong> ${layout}</li>
          </li>
          </ul>
        </ul>
      </div>
    </div>
    `;
    rocketElemDetails.innerHTML = html;
    document.title = json.rocket_name + " - " + "LASR";
  }
}

/* --------- Roadster --------*/

if (params.has("type")) {
  roadsterDetails();
} else {
  //document.location.href = "/";
}
function roadsterDetails(): void {
  const baseUrl: string = "https://api.spacexdata.com/v3/roadster";
  const cors: string = "https://noroffcors.herokuapp.com/";
  const url: string = cors + baseUrl;

  fetch(url)
    .then(function (Response: any) {
      return Response.json();
    })
    .then(function (json: any) {
      getRoadsterDetails(json);
    })
    .catch(function (error: any) {
      document.location.href = "error.html";
    });

  function getRoadsterDetails(json: any): void {
    var html: string = "";
    let timeConverted: string = timeConverterRockets(json.launch_date_unix);

    html += `
    <div class="detail-rocket-box">
      <img class="rocket-img" src="${json.flickr_images[0]}" alt="${json.name}">
      <h1 class="header">${json.name}</h1>
      <div class="backAndDescription-container">
        <div class="goBack-button-container">
          <a href="./rockets.html">
          <div class="goBack-button">&laquo; Go back</div>
          </a>
        </div>
        <p class="rocket-description">${json.details}</p>
      </div>
      <h2 class="subheading">Information</h2>
      <div class="detail-list">
        <ul>
          <li><strong>Launch date:</strong> ${timeConverted}</li>
          <li><strong>launch Mass:</strong> ${json.launch_mass_kg} kg</li>
          <li><strong>Orbit type:</strong> ${json.orbit_type}</li>
          <li><strong>Speed:</strong> ${json.speed_kph} kph</li>
          <li><strong>Earth distance:</strong> ${json.earth_distance_km} km</li>
          <li><strong>Mars distance:</strong> ${json.mars_distance_km} km</li>
        </ul>
      </div>
    </div>
    `;
    rocketElemDetails.innerHTML = html;
    document.title = json.name + " - " + "LASR";
  }
}

/* --------- Dragons --------*/
let dragonId: any;

if (params.has("dragon-id")) {
  dragonId = params.get("dragon-id");
  dragonDetails();
} else {
  //document.location.href = "/";
}

function dragonDetails(): void {
  const baseUrl: string = "https://api.spacexdata.com/v3/dragons/";
  const cors: string = "https://noroffcors.herokuapp.com/";
  const url: string = cors + baseUrl + dragonId;

  fetch(url)
    .then(function (Response: any) {
      return Response.json();
    })
    .then(function (json: any) {
      getDragonDetails(json);
    })
    .catch(function (error: any) {
      document.location.href = "error.html";
    });

  function getDragonDetails(json: any): void {
    let active: string = "No";
    var html: string = "";
    if (json.active === true) {
      active = "Yes";
    }
    html += `
    <div class="detail-rocket-box">
      <img class="rocket-img" src="${json.flickr_images[2]}" alt="${json.name}">
      <h1 class="header">${json.name}</h1>
      <div class="backAndDescription-container">
        <div class="goBack-button-container">
          <a href="./rockets.html">
          <div class="goBack-button">&laquo; Go back</div>
          </a>
        </div>
        <p class="rocket-description">${json.description}</p>
      </div>
      <h2 class="subheading">Information</h2>
      <div class="detail-list">
        <ul>
          <li><strong>First flight:</strong> ${json.first_flight}</li>
          <li><strong>Active:</strong> ${active}</li>
          <li><strong>Dry Mass:</strong> ${json.dry_mass_kg} kg</li>
          <li><strong>Type:</strong> ${json.type}</li>
          <li><strong>Diameter:</strong> ${json.diameter.meters} m</li>
          <li><strong>Height:</strong> ${json.height_w_trunk.meters} m</li>
        </ul>
      </div>
    </div>
    `;
    rocketElemDetails.innerHTML = html;
    document.title = json.name + " - " + "LASR";
  }
}

function timeConverterRockets(UNIX_timestamp: number): string {
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
