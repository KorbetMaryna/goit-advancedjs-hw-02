const body = document.querySelector('body');
const startBtn = document.querySelector('[data-start]');
const stopBtn = document.querySelector('[data-stop]');

let timerId = null;

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);

stopBtn.disabled = true;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function backgroundColorSwitcher() {
    const newColor = getRandomHexColor();
    body.style.backgroundColor = newColor;
}

function startTimer() {
    timerId = setInterval(backgroundColorSwitcher, 1000);
    startBtn.disabled = true;
    stopBtn.disabled = false;
}

function stopTimer() {
    clearInterval(timerId);
    startBtn.disabled = false;
    stopBtn.disabled = true;
}

