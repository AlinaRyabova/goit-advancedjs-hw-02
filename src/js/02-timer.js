import flatpickr from 'flatpickr';
import iziToast from 'izitoast';
import 'flatpickr/dist/flatpickr.min.css';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePicker = document.querySelector(`#datetime-picker`);

flatpickr(datetimePicker, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] <= new Date()) {
      iziToast.warning({
        title: 'Warning',
        message: 'Please choose a date in the future',
      });
      return;
    }
    startButton.disabled = false;
  },
});

const startButton = document.querySelector(`[data-start]`);
const daysValue = document.querySelector(`[data-days]`);
const hoursValue = document.querySelector(`[data-hours]`);
const minutesValue = document.querySelector(`[data-minutes]`);
const secondsValue = document.querySelector(`[data-seconds]`);

let countdownInterval;
let targetDate;

function updateTimer() {
  const now = new Date();
  const timeLeft = targetDate - now;

  if (timeLeft <= 0) {
    clearInterval(countdownInterval);
    displayTimeLeft(0, 0, 0, 0);
    datetimePicker._flatpickr._input.disabled = false;
    return;
  }
  const { days, hours, minutes, seconds } = convertMs(timeLeft);
  displayTimeLeft(days, hours, minutes, seconds);
}

function startCountdown() {
  const selectedDate = datetimePicker._flatpickr.selectedDates[0];
  if (selectedDate <= new Date()) {
    iziToast.warning({
      title: `Warning`,
      message: `Please choose a date in the future`,
    });
    return;
  }
  targetDate = selectedDate;
  countdownInterval = setInterval(updateTimer, 1000);
  startButton.disabled = true;
  datetimePicker._flatpickr._input.disabled = true;
}

function displayTimeLeft(days, hours, minutes, seconds) {
  daysValue.textContent = addLeadingZero(days);
  hoursValue.textContent = addLeadingZero(hours);
  minutesValue.textContent = addLeadingZero(minutes);
  secondsValue.textContent = addLeadingZero(seconds);
}

function addLeadingZero(value) {
  return String(value).padStart(2, `0`);
}

startButton.addEventListener(`click`, startCountdown);

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
