import { Notify } from 'notiflix/build/notiflix-notify-aio';


document.body.style.backgroundColor = '#f06cd8';
const form = document.querySelector('.form');
const options = {
  position: 'center-bottom',
  distance: '20px',
  borderRadius: '20px',
  timeout: 10000,
  clickToClose: true,
  cssAnimationStyle: 'from-bottom',
};

form.addEventListener('click', onPromiseCreate);

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

function onPromiseCreate(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  let inputDelay = Number(delay.value);
  let inputStep = Number(step.value);
  let inputAmount = Number(amount.value);

  for (let i = 1; i <= inputAmount; i += 1) {
   createPromise(i, inputDelay)
      .then(({ position, delay }) => {
        Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`,
          options
        );
      })
      .catch(({ position, delay }) => {
        Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`,
          options
        );
      });
      inputDelay += inputStep;
    e.currentTarget.reset();
  }

}

