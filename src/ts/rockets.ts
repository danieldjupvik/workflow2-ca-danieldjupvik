/* --------- Rockets --------*/
const rocketElem = document.querySelector(".rocket-section") as Element;
const roadsterSpan = document.querySelector(".roadster") as Element;
const dragonsSpan = document.querySelector(".dragons") as Element;
const rocketSpan = document.querySelector(".rockets") as Element;
const cors: string = "https://noroffcors.herokuapp.com/";
const rocketBaseUrl: string = "https://api.spacexdata.com/v3/rockets";
const rocketUrl: string = cors + rocketBaseUrl;

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

function getRockets(json: any): void {
  var html: string = "";
  for (let index: number = 0; index < json.length; index++) {
    /* Fix broken spaceX urls from API*/
    var imageArray: any = json[index].flickr_images;
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

    html += `
    <div class="rocket-box">
      <a href="rocket-details.html?id=${json[index].rocket_id}">
        <img class="rocket-img" src="${placeholder}" alt="${json[index].rocket_name}">
      </a>
      <h2 class="rocket-heading">${json[index].rocket_name}</h2>
      <p class="rocket-description">${json[index].description}</p>
      <div class="readMore-button-container">
      <a href="rocket-details.html?id=${json[index].rocket_id}">
       <div class="readMore-button">Read more</div>
      </a>
      </div>
    </div>
    `;
  }
  rocketElem.innerHTML = html;
}

rocketSpan.classList.add("selection-active");

rocketSpan.addEventListener("click", fetchRockets);
rocketSpan.addEventListener("keypress", function (elem: any): void {
  if (elem.key === "Enter") {
    fetchRockets();
  }
});

function fetchRockets(): void {
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
roadsterSpan.addEventListener("keypress", function (elem: any): void {
  if (elem.key === "Enter") {
    fetchRoadster();
  }
});

function fetchRoadster(): void {
  const roadsterBaseUrl: string = "https://api.spacexdata.com/v3/roadster";
  const roadsterUrl: string = cors + roadsterBaseUrl;

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

  function getRoadster(json: any): void {
    var html: string = "";
    html += `
        <div class="rocket-box">
          <a href="rocket-details.html?type=roadster">
           <img class="rocket-img" src="${json.flickr_images[0]}" alt="${json.name}">
          </a>
          <h2 class="rocket-heading">${json.name}</h2>
          <p class="rocket-description">${json.details}</p>
          <div class="readMore-button-container">
            <a href="rocket-details.html?type=roadster">
            <div class="readMore-button">Read more</div>
            </a>
          </div>
        </div>
        `;
    rocketElem.innerHTML = html;
  }
  rocketSpan.classList.remove("selection-active");
  dragonsSpan.classList.remove("selection-active");
  roadsterSpan.classList.add("selection-active");
}

/* --------- Dragons --------*/

dragonsSpan.addEventListener("click", fetchDragons);
dragonsSpan.addEventListener("keypress", function (elem: any): void {
  if (elem.key === "Enter") {
    fetchDragons();
  }
});

function fetchDragons(): void {
  const dragonsBaseUrl: string = "https://api.spacexdata.com/v3/dragons";
  const dragonsUrl: string = cors + dragonsBaseUrl;

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

  function getDragons(json: any): void {
    var html: string = "";
    for (let index: number = 0; index < json.length; index++) {
      var imageArray: any = json[index].flickr_images;
      var PATTERN: string = "spacex.com",
        imageArray = imageArray.filter(function (str: any) {
          return str.indexOf(PATTERN) === -1;
        });
      html += `
        <div class="rocket-box">
          <a href="rocket-details.html?dragon-id=${json[index].id}">
            <img class="rocket-img" src="${json[index].flickr_images[2]}" alt="${json[index].name}">
          </a>
          <h2 class="rocket-heading">${json[index].name}</h2>
          <p class="rocket-description">${json[index].description}</p>
          <div class="readMore-button-container">
          <a href="rocket-details.html?dragon-id=${json[index].id}">
           <div class="readMore-button">Read more</div>
          </a>
          </div>
        </div>
        `;
      rocketElem.innerHTML = html;
    }
  }
  rocketSpan.classList.remove("selection-active");
  dragonsSpan.classList.add("selection-active");
  roadsterSpan.classList.remove("selection-active");
}
