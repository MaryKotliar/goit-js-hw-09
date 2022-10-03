import { Notify } from 'notiflix/build/notiflix-notify-aio';

const formRef = document.querySelector('form');

formRef.addEventListener("submit", onFormSubmit);
let counter = 0;
function onFormSubmit(event) {
  
event.preventDefault();
const {
  elements: { delay, step, amount }
} = event.currentTarget;
const amountNumber = Number(amount.value);
let stepNumber = Number(step.value) ;
let delayNumber = Number(delay.value) ;


  for (let i = 0; i < amountNumber; i += 1) {
    
    counter += 1;
    createPromise(counter, delayNumber)
    .then(({ position, delay }) => {
      Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    });;

    delayNumber += stepNumber;
  }

counter = 0;
event.target.reset();
};


function createPromise(position, delay) {
  
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

