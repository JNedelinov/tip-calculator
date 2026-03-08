import { state, resetState } from './state.js';
import ui from './ui.js';
import helpers from './helpers.js';

const {
  resetButton,
  customPercentageContainer,
  recalc,
  clearErrorSuccessClasses,
  clearAllUserMessages,
} = ui;
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

  // clear all success and error classes from all elements that contain them
  clearErrorSuccessClasses();

  // clear all user messages
  clearAllUserMessages();

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
  const labelContainer = [
    ...document.querySelectorAll('.label-container'),
  ].filter((container) => container.querySelector(`label[for=${input.id}]`))[0];
  const usrMsg = labelContainer.querySelector('.usr-msg');

  if (+input.value === 0 && input.classList.contains('absolute-value')) {
    e.preventDefault();
    input.value = '';
    input.parentElement.classList.remove('success');
    input.parentElement.classList.add('error');

    usrMsg.textContent = "Can't be zero";
  } else if (input.parentElement.classList.contains('error')) {
    input.parentElement.classList.remove('error');
    input.parentElement.classList.add('success');

    usrMsg.textContent = '';
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
          return;
        }
      }
      break;
    case 'number-ppl':
      {
        state.numberOfPpl = value || 1;
      }
      break;
    case 'custom-percentage':
      {
        state.percentage = value;
      }
      break;
  }

  const { bill, numberOfPpl, percentage } = state;

  if (bill > 0 || numberOfPpl > 0 || percentage > 0) {
    enableBtn(resetButton);
  }

  if (bill === 0 && numberOfPpl <= 1 && percentage === 0) {
    disableBtn(resetButton);
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
