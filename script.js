let startTime;
let pausedTime = 0;
let running = false;
let laps = [];

function startStopwatch() {
    if (!running) {
        if (pausedTime === 0) {
            startTime = new Date().getTime();
        } else {
            startTime = new Date().getTime() - pausedTime;
            pausedTime = 0;
        }
        running = true;
        updateDisplay();
        updateButtons();
    }
}

function pauseStopwatch() {
    if (running) {
        pausedTime = new Date().getTime() - startTime;
        running = false;
        updateDisplay();
        updateButtons();
    }
}

function resetStopwatch() {
    running = false;
    startTime = 0;
    pausedTime = 0;
    laps = [];
    updateDisplay();
    updateButtons();
    updateLapList();
}

function recordLap() {
    if (running) {
        const lapTime = new Date().getTime() - startTime;
        laps.push(formatTime(lapTime));
        updateLapList();
    }
}

function updateDisplay() {
    const currentTime = running ? new Date().getTime() - startTime : pausedTime;
    document.getElementById('display').textContent = formatTime(currentTime);
}


function updateButtons() {
    const startButton = document.getElementsByTagName('button')[0];
    const pauseButton = document.getElementsByTagName('button')[1];

    startButton.textContent = running ? 'Resume' : 'Start';
    pauseButton.disabled = !running;
}

function updateLapList() {
    const lapList = document.getElementById('lapList');
    lapList.innerHTML = '';

    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapList.appendChild(li);
    });
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const millis = Math.floor((milliseconds % 1000) / 10);

    return `${pad(minutes)}:${pad(seconds)}:${pad(millis)}`;
}

function pad(num) {
    return num.toString().padStart(2, '0');
}

// Update the display every 100 milliseconds
setInterval(updateDisplay, 100);