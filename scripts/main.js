import helpers from './helpers.js';

const initialState = {
  // input field values
  bill: 0,
  numberOfPpl: 1,
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
let state = { ...initialState };

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

const inputs = document.querySelectorAll('input');

const handleResetBtnClick = () => {
  // all html elements' values/textContents to 0/''
  helpers.resetInputValues(document.querySelectorAll('input'));
  helpers.resetNumericFields(document.querySelectorAll('span.numeric'));
  // hide the custom percentage input's container
  helpers.hideContainer(document.querySelector('.custom-percentage-container'));

  // reset the state to the initial state
  state = { ...initialState };

  // deactivate the button
  helpers.deactivateButton(state);

  // disables the 'reset' button
  helpers.disableBtn(resetButton);

  // recalculate the
  handleRecalc(state);
};

resetButton.addEventListener('click', () => {
  handleResetBtnClick();
});

const handleDeactivateCustomBtn = () => {
  helpers.hideContainer(customPercentageContainer);
  handleRecalc({ ...state, percentage: 0 });
};

const handleSameBtnDeactivation = (targetBtn, state) => {
  targetBtn.classList.remove('active');
  state.currentlyActiveBtn = null;
  helpers.disableBtn(resetButton);
};

const handleRecalc = (state) => {
  const { bill, numberOfPpl, percentage } = state;
  const tip1 = helpers.calculateTip(bill, percentage, numberOfPpl);
  const total1 = helpers.calculateTotal(bill, tip1, numberOfPpl);

  helpers.populateNumericField(tipSum, tip1);
  helpers.populateNumericField(totalSum, total1);
};

document.querySelectorAll('.percentage-btn').forEach((btn) =>
  btn.addEventListener('click', (e) => {
    const { currentlyActiveBtn } = state;
    const btn = e.target;

    if (
      currentlyActiveBtn &&
      currentlyActiveBtn.classList.contains('custom-btn')
    ) {
      handleDeactivateCustomBtn();
    }

    if (
      currentlyActiveBtn &&
      btn.textContent === currentlyActiveBtn.textContent
    ) {
      state.percentage = 0;

      handleSameBtnDeactivation(btn, state);
      handleRecalc(state);
      return;
    }

    state.percentage = Number(btn.textContent.replace('%', ''));

    enableResetBtn();

    currentlyActiveBtn && currentlyActiveBtn.classList.remove('active');
    btn.classList.add('active');
    state.currentlyActiveBtn = btn;

    handleRecalc(state);
  }),
);

document.querySelector('.custom-btn').addEventListener('click', (e) => {
  const btn = e.target;
  if (btn.classList.contains('active')) {
    // deactivate it and hide the container
    helpers.deactivateButton(state);
    helpers.hideContainer(customPercentageContainer);
  } else {
    // activate it and show the container
    helpers.activateButton(btn, state);
    helpers.showContainer(customPercentageContainer);
    handleRecalc({ ...state, percentage: 0 });
  }
});

const handleInputKeypress = (e) => {
  const input = e.target;
  const regexForAbsoluteNumValues = /[0-9]/;
  const regexForFloatingNumValues = /[0-9.]/;

  if (
    input.classList.contains('floating-value') &&
    !regexForFloatingNumValues.test(e.key)
  ) {
    e.preventDefault();
    return;
  }

  if (
    input.classList.contains('absolute-value') &&
    !regexForAbsoluteNumValues.test(e.key)
  ) {
    e.preventDefault();
  }
};

inputs.forEach((input) => {
  input.addEventListener('keypress', handleInputKeypress);
  input.addEventListener('change', (e) => {
    const input = e.target;
    if (+input.value === 0 && input.classList.contains('absolute-value')) {
      e.preventDefault();
      input.value = 1;
    }

    input.value = +input.value;
    const value = +input.value;
    const inputId = input.id;

    switch (inputId) {
      case 'bill':
        {
          state.bill = value;

          if (value === 0) {
            handleRecalc(state);
            helpers.disableBtn(resetButton);
            return;
          }

          if (resetButton.disabled) {
            enableResetBtn();
          }
        }
        break;
      case 'number-ppl':
        {
          state.numberOfPpl = value;
        }
        break;
      case 'custom-percentage':
        {
          state.percentage = value;
        }
        break;
    }

    handleRecalc(state);
  });
});
function enableResetBtn() {
  document.querySelector('.reset-btn').disabled = false;
}

// !! The only visible limitation in my calculator is when the bill is at least 100 times less than the number of people (edge case)
