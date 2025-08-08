// Stopwatch functionality
const hourHand = document.querySelector('.hour-hand');
const minuteHand = document.querySelector('.minute-hand');
const secondHand = document.querySelector('.second-hand');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsContainer = document.getElementById('lapsContainer');

let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

function toggleMode() {
    document.body.classList.toggle('dark');
    document.body.classList.toggle('light');
}

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = Math.floor((ms % 1000) / 10);

    return {
        hours,
        minutes,
        seconds,
        milliseconds,
        formatted: `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${milliseconds.toString().padStart(2, '0')}`
    };
}

function updateDisplay(time) {
    const { hours, minutes, seconds } = formatTime(time);

    // Calculate angles
    const secondAngle = seconds * 6;
    const minuteAngle = minutes * 6 + seconds / 10;
    const hourAngle = hours * 30 + minutes / 2;

    // Apply rotations
    secondHand.style.transform = `translateX(-50%) rotate(${secondAngle}deg)`;
    if (minuteHand) minuteHand.style.transform = `translateX(-50%) rotate(${minuteAngle}deg)`;
    if (hourHand) hourHand.style.transform = `translateX(-50%) rotate(${hourAngle}deg)`;
}

function startTimer() {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay(elapsedTime);
        }, 10);
        isRunning = true;

        startBtn.disabled = true;
        stopBtn.disabled = false;
        resetBtn.disabled = true;
        lapBtn.disabled = false;
    }
}

function stopTimer() {
    if (isRunning) {
        clearInterval(timerInterval);
        isRunning = false;

        startBtn.disabled = false;
        stopBtn.disabled = true;
        resetBtn.disabled = false;
        lapBtn.disabled = true;
    }
}

function resetTimer() {
    stopTimer();
    elapsedTime = 0;
    updateDisplay(elapsedTime);
    lapsContainer.innerHTML = '';
}

function recordLap() {
    if (isRunning) {
        const lapTime = elapsedTime;
        const { formatted } = formatTime(lapTime);

        const lapItem = document.createElement('div');
        lapItem.className = 'lap-item';
        lapItem.textContent = `Lap ${lapsContainer.children.length + 1}: ${formatted}`;
        lapsContainer.prepend(lapItem);
    }
}

// Event listeners
startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', resetTimer);
lapBtn.addEventListener('click', recordLap);

// Initialize display
updateDisplay(0);
