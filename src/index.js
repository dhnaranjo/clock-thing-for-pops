import "./styles.css";

const clockPos = {
  x: 100,
  y: 100,
  radius: 50
};

const anglePerMinute = 360.0 / 60.0;
const anglePerHour = 360.0 / 12.0;

function findPoint(cx, cy, rad, cornerGrad) {
  var cornerRad = (cornerGrad * Math.PI) / 180;
  var nx = Math.cos(cornerRad) * rad + cx;
  var ny = Math.sin(cornerRad) * rad + cy;
  return { x: nx, y: ny };
}

function clockHandPos(angle, length) {
  return findPoint(clockPos.x, clockPos.y, length, angle - 90);
}

function minuteHandPos(minutes, length) {
  return clockHandPos(minutes * anglePerMinute, length);
}

function hourHandPos(hours, length) {
  return clockHandPos(hours * anglePerHour, length);
}

const clock = document.getElementById("clock");

var faceOutline = document.createElementNS(
  "http://www.w3.org/2000/svg",
  "circle"
);
faceOutline.setAttribute("cx", clockPos.x);
faceOutline.setAttribute("cy", clockPos.y);
faceOutline.setAttribute("r", clockPos.radius);
faceOutline.setAttribute("fill", "none");
faceOutline.setAttribute("stroke", "black");
faceOutline.setAttribute("stroke-width", 3);
clock.appendChild(faceOutline);

function drawHand(x, y, color, id) {
  let hand;
  hand = document.getElementById(id);
  if (!hand) {
    hand = document.createElementNS("http://www.w3.org/2000/svg", "line");
  }
  hand.setAttribute("id", id);
  hand.setAttribute("x1", clockPos.x);
  hand.setAttribute("y1", clockPos.y);
  hand.setAttribute("x2", x);
  hand.setAttribute("y2", y);
  hand.setAttribute("stroke", color);
  clock.appendChild(hand);
}

function drawMinuteHand({ minutes, length, color }) {
  const { x, y } = minuteHandPos(minutes, length);
  drawHand(x, y, color, "minute-hand");
}

function drawHourHand({ hours, length, color }) {
  const { x, y } = hourHandPos(hours, length);
  drawHand(x, y, color, "hour-hand");
}

const timeInput = document.getElementById("time-input");
timeInput.addEventListener("keyup", e => {
  const time = {
    minutes: 30,
    hours: e.target.value
  };

  const minuteHand = {
    length: 45,
    color: "blue",
    minutes: time.minutes
  };

  const hourHand = {
    length: 30,
    color: "red",
    hours: time.hours
  };

  drawMinuteHand(minuteHand);
  drawHourHand(hourHand);
});
