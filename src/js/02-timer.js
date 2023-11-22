import flatpickr from "flatpickr";
import iziToast from "izitoast";
import "flatpickr/dist/flatpickr.min.css";
import "izitoast/dist/css/iziToast.min.css";

const refs = {
    input: document.querySelector('#datetime-picker'),
    startBtn: document.querySelector('[data-start]'),
    days: document.querySelector('[data-days]'),
    hours: document.querySelector('[data-hours]'),
    minutes: document.querySelector('[data-minutes]'),
    seconds: document.querySelector('[data-seconds]'),
}

refs.startBtn.disabled = true;
let intervalId = null;

//Сalendar setting and error iziToast
const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,

    onClose(selectedDates) {
        if (selectedDates[0] < options.defaultDate) {
            // window.alert('Please choose a date in the future');
            refs.startBtn.disabled = true;
            iziToast.error({
                title: 'Alert',
                message: 'Please choose a date in the future',
                position: 'center',
            });    
        }
        else {
            refs.startBtn.disabled = false;
            refs.startBtn.addEventListener('click', startTimer);
        }
    }
}
flatpickr(refs.input, options);

function startTimer() {
    intervalId = setInterval(() => {
        timeUpdate();
    }, 1000);
    refs.input.disabled = true;
    refs.startBtn.disabled = true;
}

function timeUpdate() {
    const currentDate = new Date();
    const startDate = new Date(refs.input.value);
    const deltaDate = startDate - currentDate;

    if (deltaDate <= 0) {
        return;
    }
    else {
        if (deltaDate > 0) {
        const { days, hours, minutes, seconds } = convertMs(deltaDate);
            refs.days.textContent = `${days}`;
            refs.hours.textContent = `${hours}`;
            refs.minutes.textContent = `${minutes}`;
            refs.seconds.textContent = `${seconds}`;
        }
        else {
            clearInterval(intervalId);
        }
    }
}

//Сhanges the date format
function addLeadingZero(value) {
    return String(value).padStart(2, 0);
}

//Converts to the format 00:00:00:00
function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
    // Remaining days
    const days = addLeadingZero(Math.floor(ms / day));
    // Remaining hours
    const hours = addLeadingZero(Math.floor((ms % day) / hour));
    // Remaining minutes
    const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
    // Remaining seconds
    const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));
    return { days, hours, minutes, seconds };
}


