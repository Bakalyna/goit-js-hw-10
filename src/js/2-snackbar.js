import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
const formRef = document.querySelector('.form');
formRef.addEventListener('submit', onCreateNotification);

function onCreateNotification(event) {
  event.preventDefault();
  const delay = formRef.delay.value;
  const state = formRef.state.value;

  const promise = new Promise((resolve, reject) => {
    if (state === 'fulfilled') {
      setTimeout(() => resolve(delay), delay);
    } else if (state === 'rejected') {
      setTimeout(() => reject(delay), delay);
    }
  });

  promise
    .then(delay => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
        position: 'topCenter',
      });
    })

    .catch(delay => {
      iziToast.error({
        message: `❌Rejected promise in ${delay}ms`,
        position: 'topCenter',
      });
    });
}
