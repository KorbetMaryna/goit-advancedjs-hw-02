import iziToast from "izitoast";

const form = document.querySelector('.form');
const btn = document.querySelector('[type="submit"]');

form.addEventListener('submit', onSubmitForm);

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
  }
    }, delay)
  })
}

function onSubmitForm(e){
  e.preventDefault();
  const element = e.currentTarget.elements;
  btn.disabled = true;

  let delay = parseInt(element.delay.value);
  const step = parseInt(element.step.value);
  const amount = parseInt(element.amount.value);

  setTimeout(() => {
    btn.disabled = false;
  }, amount * step + delay)
  
  for (let i = 1; i <= amount; i += 1) {
    createPromise(i, delay)
      .then(({ position, delay }) => {  
        iziToast.success({
          title: 'OK',
          message: `✅ Fulfilled promise ${position} in ${delay}ms`,
          position: 'center',
          backgroundColor: 'lightgray',
          timeout: 5000,
        });
      })
      .catch(({ position, delay }) => {
        iziToast.error({
          title: 'Error',
          message: `❌ Rejected promise ${position} in ${delay}ms`,
          position: 'center',
          backgroundColor: 'grey',
          timeout: 5000,
        }); 
      });
    delay += step;
  }
} 

