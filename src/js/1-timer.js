import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const datetimePickerRef = document.querySelector('#datetime-picker');
const startButtonRef = document.querySelector('[data-start]');
const daysRef = document.querySelector('[data-days]');
const hoursRef = document.querySelector('[data-hours]');
const minutesRef = document.querySelector('[data-minutes]');
const secondsRef = document.querySelector('[data-seconds]');
let userSelectedDate;
startButtonRef.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] - new Date() <= 0) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
      startButtonRef.disabled = true;
    } else {
      userSelectedDate = selectedDates[0];
      startButtonRef.disabled = false;
    }
  },
};

datetimePickerRef.flatpickr(options);

startButtonRef.addEventListener('click', onStartBtnClick);

function onStartBtnClick() {
  startButtonRef.disabled = true;
  datetimePickerRef.disabled = true;
  const intervalId = setInterval(() => {
    if (userSelectedDate - new Date() >= 0) {
      const dataObj = convertMs(userSelectedDate - new Date());
      daysRef.textContent = addLeadingZero(dataObj.days);
      hoursRef.textContent = addLeadingZero(dataObj.hours);
      minutesRef.textContent = addLeadingZero(dataObj.minutes);
      secondsRef.textContent = addLeadingZero(dataObj.seconds);
    } else {
      clearInterval(intervalId);
      datetimePickerRef.disabled = false;
    }
  }, 1000);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
