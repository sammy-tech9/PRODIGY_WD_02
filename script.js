let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById('display');
const laps = document.getElementById('laps');

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = String(Math.floor(totalSeconds / 60)).padStart(2, '0');
    const seconds = String(totalSeconds%60).padStart(2,'0');
    const milliseconds = String(ms%1000).padStart(3, '0').slice(0, 2);
    return `${minutes}:${seconds}:${milliseconds}`;
}

function startTimer(){
    if (!running){
        running = true;
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            display.textContent = formatTime(elapsedTime);
        }, 50);
    }
}

function pauseTimer(){
    clearInterval(timerInterval);
    running = false;
}

function resetTimer(){
    clearInterval(timerInterval);
    running = false;
    elapsedTime = 0;
    display.textContent = "00:00:00";
    laps.innerHTML = "";
}

function recordLap(){
    if(elapsedTime>0){
        const li = document.createElement("li");
        li.textContent = formatTime(elapsedTime);
        laps.appendChild(li);
    }
}

document.getElementById("start").addEventListener("click", startTimer);
document.getElementById("pause").addEventListener("click", pauseTimer);
document.getElementById("reset").addEventListener("click", resetTimer);
document.getElementById("lap").addEventListener("click", recordLap);
