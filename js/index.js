import vehicleData from "../json/Vehicle_No_3539.json" assert { type: "json" };

console.time();
const blueColor = "#4a4ab0";

function formatDate(inputDate) {
  const date = new Date(inputDate);

  const day = date.getDate();
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
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const formattedDate = `${day} ${month} ${year} ${hours}:${minutes}:${seconds}`;

  return formattedDate;
}

function idleTimeFunc(inputDate) {
  const date = new Date(inputDate);

  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();
  const formatedIdleTime = `${hours}:${minutes}:${seconds}`;
  return formatedIdleTime;
}

const targetTable = document.getElementById("tableContent");

vehicleData.slice(0, 300).forEach((item, index) => {
  var newRow = document.createElement("div");
  newRow.classList.add("tableGrid");

  var indexDiv = document.createElement("div");
  indexDiv.classList.add("numberCount");

  var checkBoxInput = document.createElement("input");
  checkBoxInput.setAttribute("type", "checkbox");
  checkBoxInput.checked = true;
  checkBoxInput.classList.add("checkBox");
  var checkBoxDiv = document.createElement("div");
  var groupNameDiv = document.createElement("div");
  var vechicleDiv = document.createElement("div");
  var lastSeen = document.createElement("div");
  var ignition = document.createElement("div");
  var battery = document.createElement("div");
  var info = document.createElement("div");
  var nearestSite = document.createElement("div");
  var nearestLocation = document.createElement("div");
  var speed = document.createElement("div");
  var idleTime = document.createElement("div");
  var specification = document.createElement("div");

  indexDiv.textContent = index + 1;
  checkBoxDiv.appendChild(checkBoxInput);

  vechicleDiv.textContent = item.VehicleNo;
  vechicleDiv.style.backgroundColor = "yellow";
  lastSeen.textContent = formatDate(item.Date);
  lastSeen.style.color = blueColor;

  ignition.textContent = item.Ignition == 1 ? "ON" : "OFF";
  ignition.style.color = item.Ignition == 1 ? "green" : "red";

  battery.textContent = "Connected";
  battery.style.color = "green";

  info.textContent = "ℹ";

  nearestSite.textContent = `${item.Location} (${item.LatLongDistance}KM)`;
  nearestSite.style.color = blueColor;

  nearestLocation.textContent = `${item.Location}`;
  nearestLocation.style.color = blueColor;

  speed.textContent = item.Speed;
  speed.style.color = blueColor;

  idleTime.textContent = idleTimeFunc(item.callingTime);
  idleTime.style.color = blueColor;

  specification.textContent = "Specification";

  newRow.appendChild(indexDiv);
  newRow.appendChild(checkBoxDiv);
  newRow.appendChild(groupNameDiv);
  newRow.appendChild(vechicleDiv);
  newRow.appendChild(lastSeen);
  newRow.appendChild(ignition);
  newRow.appendChild(battery);
  newRow.appendChild(info);
  newRow.appendChild(nearestSite);
  newRow.appendChild(nearestLocation);
  newRow.appendChild(speed);
  newRow.appendChild(idleTime);
  newRow.appendChild(specification);

  targetTable.appendChild(newRow);
});

console.timeEnd();
