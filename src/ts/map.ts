/*----- Map -----*/
import * as L from "leaflet";

const cors2: string = "https://noroffcors.herokuapp.com/";
const issBaseUrl: string = "http://api.open-notify.org/iss-now.json";
const issUrl: string = cors2 + issBaseUrl;

var map = L.map("map").setView([0, 0], 0);
setInterval(function () {
  fetch(issUrl)
    .then(function (Response) {
      return Response.json();
    })
    .then(function (json) {
      setCoordinates(json);
    })
    .catch(function (error) {
      console.log(error);
    });

  function setCoordinates(json: any): void {
    var lat = json.iss_position.latitude;
    var lon = json.iss_position.longitude;

    iss.setLatLng([lat, lon]);
    isscirc.setLatLng([lat, lon]);
    map.panTo([lat, lon]);
  }
}, 5000);

L.tileLayer(
  "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}",
  {
    maxZoom: 3,
    id: "mapbox/outdoors-v11",
    accessToken:
      "pk.eyJ1IjoiaW50ZXJuYXRpb25hbGFkdmljZTAiLCJhIjoiY2thb25vcnNqMHNsMjJ5cGY0eWJ2YnA5dyJ9.7MMhRDg557_gO0SKmh5Hgw",
  }
).addTo(map);

var ISSIcon = L.icon({
  iconUrl: "https://lasr.danieldjupvik.dev/assets/icons/ISSIcon.png",
  iconSize: [50, 30],
  iconAnchor: [25, 15],
  popupAnchor: [50, 25],
  shadowUrl: "https://lasr.danieldjupvik.dev/assets/icons/ISSIcon_shadow.png",
  shadowSize: [60, 40],
  shadowAnchor: [30, 15],
});
var alt = "icon of satellite";

var iss = L.marker([0, 0], { icon: ISSIcon, alt: alt }).addTo(map);

var isscirc = L.circle([0, 0], 2200e3, {
  color: "#203140",
  opacity: 0.3,
  weight: 1,
  fillColor: "#203140",
  fillOpacity: 0.1,
}).addTo(map);
