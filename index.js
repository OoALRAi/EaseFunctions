console.log("hello, world!");

ease = x => {
    return (1 - Math.pow((1 - 2 * x), easeGrad)) * 0.5;
}
//ease = x => (-Math.cos(Math.PI * x) + 1) / 2;
ease2 = x => Math.pow(x, easeGrad);
currentEase = ease;

var canvas = document.getElementById("canvas");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight - 500;
var ctx = canvas.getContext("2d");

var progress = document.getElementById("progress");

progress.oninput = function (e) {
    var animT = e.target.value / 100;
    animT = ease(animT);
    var x_pos = lerp(0, canvas.width - 50, animT)
    drawRect(x_pos, 0, 50, 50)
}

easeGrad = 6
var easeGradSlider = document.getElementById("easeGradSlider");
easeGradSlider.oninput = function (e) {
    easeGrad = e.target.value;
}

duration = 2; // seconds
var durationSlider = document.getElementById("durationSlider");
durationSlider.oninput = function (e) {
    duration = e.target.value;
}

const start = document.getElementById("start");
const back = document.getElementById("back");

start.addEventListener("click", () => animate(0, canvas.width - 50, move, ease, duration));
back.addEventListener("click", () => animate(canvas.width - 50, 0, move, ease, duration))


console.log(ctx);

ctx.fillStyle = "#000";
ctx.fillRect(0, 0, 50, 50);

var startTime = new Date();
lerp = (start, end, t) => (end - start) * t + start;
clamp01 = value => value < 0 ? 0 : value > 1 ? 1 : value

function calcProgress(duration, startTime, currentTime) {
    var elapsedTime = (currentTime - startTime) / 1000; // ms to sec;
    var progress = clamp01(elapsedTime / duration);
    return progress;
}
function drawRect(x, y, w, h, color) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = color ? color : "#000";
    ctx.fillRect(x, y, w, h);
    console.log(x, y, w, h)
}

function animate_h(startValue, endValue, onAnimationFunc, ease, duration) {
    progress = calcProgress(duration, startTime, Date.now());
    easedProgress = ease(progress);

    x = lerp(startValue, endValue, easedProgress);
    if (onAnimationFunc) {
        onAnimationFunc(x);
    }
    console.log(progress);
    if (progress == 1) return;
    requestAnimationFrame(() => animate_h(startValue, endValue, onAnimationFunc, ease, duration));
}

function animate(startValue, endValue, onAnimationFunc, ease, duration) {
    startTime = new Date();
    animate_h(startValue, endValue, onAnimationFunc, ease, duration)
}

function move(value) {
    drawRect(value, 0, 50, 50);
}

console.log(new Date() - startTime);