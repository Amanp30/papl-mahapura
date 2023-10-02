// Import JSON data from files
import file1 from "../json/Vehicle_No_0774.json" assert { type: "json" };
import file2 from "../json/Vehicle_No_2524.json" assert { type: "json" };
import file3 from "../json/Vehicle_No_3539.json" assert { type: "json" };
import file4 from "../json/Vehicle_No_5104.json" assert { type: "json" };

// Combine the JSON data into a single array
const data = [...file1, ...file2, ...file3, ...file4];
const monthNames = [
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

// Variables
let thedata, ZoomValue, latLogArray;

// DOM Elements
const viewBtn = document.getElementById("viewBtn");
const ignition = document.getElementById("ignition");
const speedCheckbox = document.getElementById("speedCheckbox");
const vehicleBox = document.getElementById("vehicleBox");
const startDate = document.getElementById("startDate");
const endDate = document.getElementById("endDate");
const startTime = document.getElementById("startTime");
const endTime = document.getElementById("endTime");
const speedValue = document.getElementById("speedValue");
const theZoom = document.getElementById("theZoom");
const topdate = document.getElementById("topdate");

// Event Listener for Zoom Change
theZoom.addEventListener("change", function () {
  ZoomValue = theZoom.value;
  initMap(ZoomValue);
});

// Event Listener for View Button Click
viewBtn.addEventListener("click", function () {
  const selectedVehicle = vehicleBox.value;
  const startDateTime = new Date(`${startDate.value}T${startTime.value}`);
  const endDateTime = new Date(`${endDate.value}T${endTime.value}`);
  const speedThreshold = parseFloat(speedValue.value);

  const filteredData = data.filter((item) => {
    const isVehicleMatch = item?.VehicleNo === selectedVehicle;
    const isIgnitionMatch = ignition.checked
      ? item?.Ignition === 1
      : item?.Ignition === 0;
    const isSpeedMatch = speedCheckbox.checked
      ? Number(item?.Speed) > Number(speedThreshold)
      : true;
    const isDateTimeMatch =
      item?.Date &&
      new Date(item.Date) >= startDateTime &&
      new Date(item.Date) <= endDateTime;

    return isVehicleMatch && isDateTimeMatch && isIgnitionMatch && isSpeedMatch;
  });

  latLogArray = filteredData.map((item) => ({
    lat: parseFloat(item.Lattitude),
    lng: parseFloat(item.Longitude),
  }));

  thedata = [...filteredData];

  ZoomValue = theZoom.value;

  console.log(filteredData);
  initMap(latLogArray);
  topdate.textContent =
    startDateTime.getDate() +
    " " +
    monthNames[startDateTime.getMonth()] +
    " " +
    startDateTime.getFullYear() +
    " To " +
    endDateTime.getDate() +
    " " +
    monthNames[endDateTime.getMonth()] +
    " " +
    endDateTime.getFullYear();
  changeDetails(thedata[0]);
});

// Function to update details
function changeDetails(data) {
  const kmrun = document.getElementById("kmrun");
  const thespeed = document.getElementById("thespeed");
  const thelatitude = document.getElementById("thelatitude");
  const thelongitude = document.getElementById("thelongitude");
  const thedatetime = document.getElementById("thedatetime");

  kmrun.textContent = data?.Odometer || 0;
  thespeed.textContent = data?.Speed || 0;
  thelatitude.textContent = data?.Lattitude || 0;
  thelongitude.textContent = data?.Longitude || 0;
  thedatetime.textContent = data?.Date ? formatDate(data.Date) : "--";
}

// Function to format date
function formatDate(inputDate) {
  const date = new Date(inputDate);

  const formattedDate = `${date.getDate()} ${
    monthNames[date.getMonth()]
  } ${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}`;
  return formattedDate;
}

// Initialize Google Maps
let map;

async function initMap(zoom = 4) {
  const jaipurLocation = [{ lat: 26.9124, lng: 75.7873 }];
  const positions = latLogArray || jaipurLocation;

  const { Map } = await google.maps.importLibrary("maps");

  map = new Map(document.getElementById("map"), {
    zoom: ZoomValue ? Number(ZoomValue) : zoom,
    center: positions[0],
    mapId: "DEMO_MAP_ID",
  });

  const firstMarkerIcon = {
    url: "https://cdn1.iconfinder.com/data/icons/basic-ui-elements-color-round/3/46-512.png",
    scaledSize: new google.maps.Size(50, 50),
  };

  const lastMarkerIcon = {
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRhCo1eLkCDPcjZAeEfGbqK-I0qrcoN4956C9VWUA9MqA&s",
    scaledSize: new google.maps.Size(50, 50),
  };

  positions.forEach((position, index) => {
    let icon =
      index === 0
        ? firstMarkerIcon
        : index === latLogArray.length - 1
        ? lastMarkerIcon
        : "";

    const marker = new google.maps.Marker({
      position: position,
      map: map,
      icon: icon,
      content: "uas dginasdg ",
      optimized: true,
      zIndex: 100,
    });

    marker.addListener("click", () => {
      changeDetails(thedata[index]);
    });
  });
}

// Initialize Google Maps on page load
await initMap();
