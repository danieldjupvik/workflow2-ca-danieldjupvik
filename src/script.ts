/*----- Dynamically update coordinates in DOM -----*/
const cors2: string = "https://noroffcors.herokuapp.com/";
const issBaseUrl: string = "http://api.open-notify.org/iss-now.json";
const issUrl: string = cors2 + issBaseUrl;

function updateFetch(): void {
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

  function updateCoordinates(json: any): void {
    const latiLongElem = document.querySelector(".lati-long") as HTMLElement;
    latiLongElem.innerHTML = `<span id="latitude">${json.iss_position.latitude} ° N</span> <span id="longitude">${json.iss_position.longitude} ° E</span>`;
  }
}

setInterval(updateFetch, 1000);

/*----- Dynamically update people in space in DOM -----*/
const peopleBaseUrl: string = "http://api.open-notify.org/astros.json";
const peopleUrl: string = cors2 + peopleBaseUrl;

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

function peopleInSpace(json: any): void {
  const peopleInSpaceSection = document.querySelector(
    ".people-in-space"
  ) as HTMLElement;
  const apiResult: any = json.people;
  let html: string = "";
  for (let index: number = 0; index < apiResult.length; index++) {
    html += `
    <div class="people-in-space-container">
      <p>${apiResult[index].name} on ${apiResult[index].craft}</p>
    </div>`;
  }
  peopleInSpaceSection.innerHTML = html;
}

/*----- Dynamically update about SpaceX in DOM -----*/
const aboutSpaceXElem = document.getElementById("aboutSpaceX") as HTMLElement;
const spaceXBaseUrl: string = "https://api.spacexdata.com/v3/info";
const spacexUrl: string = cors2 + spaceXBaseUrl;

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

function aboutSpaceX(json: any): void {
  let html: string = `
    <p class="summary">
    ${json.summary}
    </p>
    <ul class="spaceXInfo-list">
      <li class="spaceXInfo-list-name">${json.name}</li>
      <li><strong>Founder:</strong> ${json.founder}</li>
      <li><strong>CEO:</strong> ${json.ceo}</li>
      <li><strong>Founded:</strong> ${json.founded}</li>
      
      <li><strong>Employees:</strong> ${json.employees} </li>
      <li><strong>Test sites:</strong> ${json.test_sites} </li>
      <li><strong>Launch sites:</strong> ${json.launch_sites} </li>
      
    </ul>
    `;
  aboutSpaceXElem.innerHTML = html;
}
