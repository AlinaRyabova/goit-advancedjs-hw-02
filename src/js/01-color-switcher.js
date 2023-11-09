const startButton = document.querySelector(`[data-start]`);
const stopButton = document.querySelector(`[data-stop]`);
const body = document.body;

let intervalId = null;
stopButton.disabled = true;

startButton.addEventListener(`click`, () => {
  if (intervalId) return;

  intervalId = setInterval(() => {
    const randomColor = getRandomHexColor();
    body.style.backgroundColor = randomColor;
  }, 1000);
  startButton.disabled = true;
  stopButton.disabled = false;
});

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, '0')}`;
}
stopButton.addEventListener(`click`, () => {
  clearInterval(intervalId);
  intervalId = null;
  startButton.disabled = false;
  stopButton.disabled = true;
});
