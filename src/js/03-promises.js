import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const delayInput = document.querySelector(`input[name ="delay"]`);
const stepInput = document.querySelector(`input[name="step"]`);
const amountInput = document.querySelector(`input[name="amount"]`);

const form = document.querySelector(`.form`);
form.addEventListener(`submit`, event => {
  event.preventDefault();

  const delay = parseInt(delayInput.value, 10);
  const step = parseInt(stepInput.value, 10);
  const amount = parseInt(amountInput.value, 10);

  processPromises(amount, delay, step);

  form.reset();
});

function processPromises(amount, initialDelay, step) {
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, initialDelay + i * step)
      .then(({ position, delay }) => {
        iziToast.success({
          title: `Fulfilled Promise`,
          message: `Promise ${position} resolved in ${delay}ms`,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: `Rejected Promise`,
          message: `Promise ${position} rejected in ${delay}ms`,
        });
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}
