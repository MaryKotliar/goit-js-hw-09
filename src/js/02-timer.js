import { Notify } from 'notiflix/build/notiflix-notify-aio';
// Описан в документации
import flatpickr from "flatpickr";
// Дополнительный импорт стилей
import "flatpickr/dist/flatpickr.min.css";
const pickerRef = document.querySelector('#datetime-picker');
const buttonRef = document.querySelector('button');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');


buttonRef.disabled = true;
const date = new Date;

const options = {
    enableTime: true,
    enableSeconds: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
    const choosedDate = selectedDates[0].getTime();
    const currentDate = date.getTime();
    const delta = choosedDate - currentDate;
    
    if(choosedDate < currentDate) {
        Notify.failure("Please choose a date in the future");
    } else {
        buttonRef.disabled = false
    }
    
    },
};

flatpickr('#datetime-picker', options);
const timer = {
    intervalId: null,
    isActive:false,
    start() {
        if(this.isActive){
            return
        }
        this.isActive = true;
        const timeInput = new Date(pickerRef.value);
        const startTime = timeInput.getTime();

        
    this.intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = startTime - currentTime
        if(deltaTime < 1000) {
            timer.stop();
            }
        const { days, hours, minutes, seconds } = convertMs(deltaTime)
        updateClock({ days, hours, minutes, seconds });
        // if(days === String(00) && hours === String(00) && minutes === String(00) && seconds === String(00)) {
        //     stop()
        // } 
        }, 1000);
        
    },
    stop() {
        clearInterval(this.intervalId);
        this.isActive = false;
    }
}
buttonRef.addEventListener('click', timer.start.bind(timer));

// function onClick() {
//     timer.start();
// }

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

function addLeadingZero(value) {
    return String(value).padStart(2,'0');
}

function updateClock({ days, hours, minutes, seconds }) {
daysRef.textContent = days;
hoursRef.textContent = hours;
minutesRef.textContent = minutes;
secondsRef.textContent = seconds;
}