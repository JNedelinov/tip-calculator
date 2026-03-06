const initialState = {
  // input field values
  bill: 0,
  numberOfPpl: 0,
  percentage: 0,
  // total values (tip and total)
  tip: 0,
  total: 0,
  // total values per person
  tipPP: 0,
  totalPP: 0,

  currentlyActiveBtn: null,
};

// shallow copy since it's a simple one-level object
const state = { ...initialState };

let currentlyActiveBtn = null;

let bill = 0;
let numberOfPpl = 0;
let percentage = 0;

let tip = 0;
let total = 0;
let tipPP = tip / numberOfPpl || tip;
let totalPP = total / numberOfPpl || total;

const billInput = document.querySelector('input[id=bill]');
const numberOfPplInput = document.querySelector('input[id=number-ppl]');
const customPercentageInput = document.querySelector(
  'input[id=custom-percentage]',
);

const tipSum = document.querySelector('.tip-sum span');
const totalSum = document.querySelector('.total-sum span');

const customPercentageContainer = document.querySelector(
  '.custom-percentage-container',
);

const resetButton = document.querySelector('.result .reset-btn');

resetButton.addEventListener('click', () => {
  // all html elements' values/textContents to 0/''
  billInput.value = '';
  numberOfPplInput.value = '';
  customPercentageInput.value = '';
  tipSum.textContent = '0.00';
  totalSum.textContent = '0.00';

  // button deactivation
  customPercentageContainer.classList.add('hidden');
  currentlyActiveBtn.classList.remove('active');
  currentlyActiveBtn = null;

  bill = 0;
  numberOfPpl = 0;
  percentage = 0;

  tip = 0;
  total = 0;
  tipPP = 0;
  totalPP = 0;

  disableResetBtn();
});

document.querySelectorAll('.percentage-btn').forEach((btn) =>
  btn.addEventListener('click', (e) => {
    if (!btn.classList.contains('custom')) {
      customPercentageContainer.classList.add('hidden');
    } else {
      customPercentageContainer.classList.toggle('hidden');
      customPercentageInput.value = 0;
    }

    total -= tip;

    if (currentlyActiveBtn) {
      if (e.target.textContent === currentlyActiveBtn.textContent) {
        percentage = 0;
        tip = 0;

        tipPP = tip / numberOfPpl;
        totalPP = total / numberOfPpl;

        tipSum.textContent =
          numberOfPpl > 0 ? tipPP.toFixed(2) : tip.toFixed(2);
        totalSum.textContent =
          numberOfPpl > 0 ? totalPP.toFixed(2) : total.toFixed(2);

        e.target.classList.remove('active');
        currentlyActiveBtn = null;
        disableResetBtn();
        return;
      }

      currentlyActiveBtn.classList.remove('active');
    }

    enableResetBtn();

    e.target.classList.add('active');
    currentlyActiveBtn = e.target;

    if (!btn.classList.contains('custom')) {
      percentage = Number(e.target.textContent.replace('%', ''));
      if (percentage > 0) {
        tip = (total * percentage) / 100;
      }
    } else {
      percentage = 0;
      tip = 0;
    }

    total += tip;

    tipPP = tip / numberOfPpl;
    totalPP = total / numberOfPpl;

    tipSum.textContent = numberOfPpl > 0 ? tipPP.toFixed(2) : tip.toFixed(2);
    totalSum.textContent =
      numberOfPpl > 0 ? totalPP.toFixed(2) : total.toFixed(2);
  }),
);

// const handleCustomBtnClick = (btn, container) => {
//   if (!btn.classList.contains('custom')) {
//     container.classList.add('hidden');
//   } else {
//     container.classList.toggle('hidden');
//   }
// };

document.querySelectorAll('input').forEach((input) => {
  input.addEventListener('keypress', (e) => {
    const regexForPeople = /[0-9]/;
    const regexForSums = /[0-9.]/;

    if (
      e.target.classList.contains('floating-value') &&
      !regexForSums.test(e.key)
    ) {
      e.preventDefault();
      return;
    }

    if (
      e.target.classList.contains('absolute-value') &&
      !regexForPeople.test(e.key)
    ) {
      e.preventDefault();
    }
  });

  input.addEventListener('change', (e) => {
    if (
      +e.target.value === 0 &&
      e.target.classList.contains('absolute-value')
    ) {
      e.preventDefault();
      e.target.value = 1;
    }

    e.target.value = +e.target.value;
    const value = +e.target.value;
    const inputId = e.target.id;

    // let tip = 0;
    // let total = 0;
    // let tipPP = tip / numberOfPpl || tip;
    // let totalPP = total / numberOfPpl || total;

    switch (inputId) {
      case 'bill':
        {
          if (value === 0) {
            tip = 0;
            total = 0;
            tipPP = 0;
            totalPP = 0;
            tipSum.textContent = '0.00';
            totalSum.textContent = '0.00';

            disableResetBtn();
            return;
          }

          if (resetButton.disabled) {
            enableResetBtn();
          }

          total -= tip;

          if (percentage > 0) {
            tip = value * (percentage / 100);
          }

          total = value + tip;

          tipPP = tip / numberOfPpl;
          totalPP = total / numberOfPpl;

          tipSum.textContent =
            numberOfPpl > 0 ? tipPP.toFixed(2) : tip.toFixed(2);
          totalSum.textContent =
            numberOfPpl > 0 ? totalPP.toFixed(2) : total.toFixed(2);
        }
        break;
      case 'number-ppl':
        {
          numberOfPpl = value;
          tipPP = tip / numberOfPpl;
          totalPP = total / numberOfPpl;

          tipSum.textContent =
            numberOfPpl > 0 ? tipPP.toFixed(2) : tip.toFixed(2);
          totalSum.textContent =
            numberOfPpl > 0 ? totalPP.toFixed(2) : total.toFixed(2);
        }
        break;
      case 'custom-percentage':
        {
          total -= tip;
          percentage = value;
          tip = total * (percentage / 100);
          total += tip;

          tipPP = tip / numberOfPpl;
          totalPP = total / numberOfPpl;

          tipSum.textContent =
            numberOfPpl > 0 ? tipPP.toFixed(2) : tip.toFixed(2);
          totalSum.textContent =
            numberOfPpl > 0 ? totalPP.toFixed(2) : total.toFixed(2);
        }
        break;
    }
  });
});

function updateTip(sum) {}

function updateTotal(sum) {}

function enableResetBtn() {
  document.querySelector('.reset-btn').disabled = false;
}

function disableResetBtn() {
  document.querySelector('.reset-btn').disabled = true;
}

// !! The only visible limitation in my calculator is when the bill is at least 100 times less than the number of people (edge case)
