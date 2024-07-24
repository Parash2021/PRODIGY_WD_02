// script.js
let startTime, updatedTime, difference;
let tInterval; // Timer Interval
let running = false;
let laps = [];

const display = document.getElementById('display');
const lapsContainer = document.getElementById('laps');

document.getElementById('start').addEventListener('click', startTimer);
document.getElementById('stop').addEventListener('click', stopTimer);
document.getElementById('reset').addEventListener('click', resetTimer);
document.getElementById('lap').addEventListener('click', recordLap);

function startTimer() {
    if (!running) {
        startTime = new Date().getTime() - (difference || 0);
        tInterval = setInterval(updateTime, 1);
        running = true;
        display.classList.add('running');
    }
}

function stopTimer() {
    if (running) {
        clearInterval(tInterval);
        difference = new Date().getTime() - startTime;
        running = false;
        display.classList.remove('running');
    }
}

function resetTimer() {
    clearInterval(tInterval);
    running = false;
    difference = 0;
    display.textContent = "00:00:00";
    laps = [];
    renderLaps();
    display.classList.remove('running');
}

function updateTime() {
    updatedTime = new Date().getTime() - startTime;
    display.textContent = formatTime(updatedTime);
}

function recordLap() {
    if (running) {
        laps.push(formatTime(updatedTime));
        renderLaps();
        // Automatically scroll to the latest lap
        lapsContainer.scrollTop = lapsContainer.scrollHeight;
    }
}

function formatTime(ms) {
    let date = new Date(ms);
    let minutes = String(date.getUTCMinutes()).padStart(2, '0');
    let seconds = String(date.getUTCSeconds()).padStart(2, '0');
    let milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function renderLaps() {
    lapsContainer.innerHTML = '';
    laps.forEach((lap, index) => {
        let li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsContainer.appendChild(li);
    });
}
