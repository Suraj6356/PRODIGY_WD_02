// scripts.js
let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const timeElement = document.getElementById('time');
const startButton = document.getElementById('startButton');
const pauseButton = document.getElementById('pauseButton');
const resetButton = document.getElementById('resetButton');
const lapButton = document.getElementById('lapButton');
const lapsElement = document.getElementById('laps');

startButton.addEventListener('click', start);
pauseButton.addEventListener('click', pause);
resetButton.addEventListener('click', reset);
lapButton.addEventListener('click', recordLap);

function start() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(updateTime, 1000);
        isRunning = true;
    }
}

function pause() {
    if (isRunning) {
        clearInterval(timerInterval);
        elapsedTime = Date.now() - startTime;
        isRunning = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    startTime = null;
    elapsedTime = 0;
    isRunning = false;
    timeElement.innerText = '00:00:00';
    lapsElement.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = timeElement.innerText;
        const lapElement = document.createElement('div');
        lapElement.innerText = lapTime;
        lapsElement.appendChild(lapElement);
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    const totalSeconds = Math.floor(elapsedTime / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    timeElement.innerText = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

function pad(number) {
    return number.toString().padStart(2, '0');
}
