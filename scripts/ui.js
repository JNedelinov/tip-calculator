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

export default {
  inputs,
  resetButton,
  percentageBtns,
  customPercentageBtn,
  customPercentageContainer,
  recalc,
};

/* 

bakshish - 50% => 50$
bill - 100$
total = 150

-- 

bakshish 50 / 2 = 25
bill / 2 = 50
totalPerPerson = 75

100 + (100 * )

*/
