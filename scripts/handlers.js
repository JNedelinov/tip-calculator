import { state, resetState } from './state.js';
import ui from './ui.js';
import helpers from './helpers.js';

const { resetButton, customPercentageContainer, recalc } = ui;
const {
  resetInputValues,
  resetNumericFields,
  hideContainer,
  showContainer,
  activateButton,
  deactivateButton,
  enableBtn,
  disableBtn,
} = helpers;

const handleResetBtnClick = () => {
  // all html elements' values/textContents to 0/''
  resetInputValues(document.querySelectorAll('input'));
  resetNumericFields(document.querySelectorAll('span.numeric'));
  // hide the custom percentage input's container
  hideContainer(document.querySelector('.custom-percentage-container'));

  // deactivate the button
  deactivateButton(state);

  // disables the 'reset' button
  disableBtn(resetButton);

  // reset the state to the initial state
  resetState();

  // recalculate the
  recalc(state);
};

const handleOnCustomBtnClick = (e) => {
  const btn = e.target;
  if (btn.classList.contains('active')) {
    // deactivate it and hide the container
    deactivateButton(state);
    hideContainer(customPercentageContainer);
    state.percentage = 0;
    recalc(state);
  } else {
    // activate it and show the container
    activateButton(btn, state);
    showContainer(customPercentageContainer);
    state.percentage = 0;
    recalc(state);
  }

  resetInputValues([document.querySelector('input[id=custom-percentage]')]);
};

const handleDeactivateCustomBtn = () => {
  hideContainer(customPercentageContainer);
  recalc({ ...state, percentage: 0 });
};

const handleSameBtnDeactivation = (targetBtn, state) => {
  targetBtn.classList.remove('active');
  state.currentlyActiveBtn = null;
  disableBtn(resetButton);
};

const handleOnPercentageBtnClick = (e) => {
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
    recalc(state);
    return;
  }

  state.percentage = Number(btn.textContent.replace('%', ''));

  enableBtn(resetButton);

  currentlyActiveBtn && currentlyActiveBtn.classList.remove('active');
  btn.classList.add('active');
  state.currentlyActiveBtn = btn;

  recalc(state);
};

const handleOnInputKeypress = (e) => {
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

const handleOnInputChange = (e) => {
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
          recalc(state);
          disableBtn(resetButton);
          return;
        }

        if (resetButton.disabled) {
          enableBtn(resetButton);
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

  recalc(state);
};

export default {
  handleResetBtnClick,
  handleOnCustomBtnClick,
  handleDeactivateCustomBtn,
  handleSameBtnDeactivation,
  handleOnPercentageBtnClick,
  handleOnInputKeypress,
  handleOnInputChange,
};
