import helpers from './helpers.js';

const { calculateTip, calculateTotal, populateNumericField } = helpers;

// buttons
const percentageBtns = document.querySelectorAll('.percentage-btn');
const customPercentageBtn = document.querySelector('.custom-btn');
const resetButton = document.querySelector('.result .reset-btn');
// additional percentage container (custom tip %)
const customPercentageContainer = document.querySelector(
  '.custom-percentage-container',
);
// inputs
const inputs = document.querySelectorAll('input');
// sums (tip amount & total amount)
const tipSum = document.querySelector('.tip-sum span');
const totalSum = document.querySelector('.total-sum span');

const recalc = (state) => {
  const { bill, numberOfPpl, percentage } = state;
  const tip = calculateTip(bill, percentage, numberOfPpl);
  const total = calculateTotal(bill, percentage, numberOfPpl);

  populateNumericField(tipSum, tip);
  populateNumericField(totalSum, total);
};

const clearErrorSuccessClasses = () => {
  document
    .querySelectorAll('.success')
    .forEach((successEl) => successEl.classList.remove('success'));
  document
    .querySelectorAll('.error')
    .forEach((successEl) => successEl.classList.remove('error'));
};

const clearAllUserMessages = () => {
  document
    .querySelectorAll('usr.msg')
    .forEach((usrMsgEl) => (usrMsgEl.textContent = ''));
};

export default {
  inputs,
  resetButton,
  percentageBtns,
  customPercentageBtn,
  customPercentageContainer,
  recalc,
  clearErrorSuccessClasses,
  clearAllUserMessages,
};
