const resetInputValues = (inputs) =>
  inputs.forEach((input) => (input.value = ''));
const resetNumericFields = (fields) =>
  fields.forEach((field) => (field.textContent = '0.00'));

const hideContainer = (container) => container.classList.add('hidden');
const showContainer = (container) => container.classList.remove('hidden');

const deactivateButton = (state) => {
  if (state.currentlyActiveBtn) {
    state.currentlyActiveBtn.classList.remove('active');
    state.currentlyActiveBtn = null;
  }
};

const activateButton = (targetBtn, state) => {
  if (state.currentlyActiveBtn) {
    state.currentlyActiveBtn.classList.remove('active');
  }

  targetBtn.classList.add('active');
  state.currentlyActiveBtn = targetBtn;
};

const enableBtn = (btn) => {
  btn.disabled = false;
};

const disableBtn = (btn) => {
  btn.disabled = true;
};

const calculateTotal = (bill = 0, tipPercentage = 0, amountOfPeople = 1) =>
  (bill + bill * (tipPercentage / 100)) / amountOfPeople;

const calculateTip = (bill = 0, tipPercentage = 0, amountOfPeople = 1) =>
  (bill * (tipPercentage / 100)) / amountOfPeople;

const populateNumericField = (field, number = 0) => {
  field.textContent = number.toFixed(2);
};

export default {
  resetInputValues,
  resetNumericFields,
  hideContainer,
  showContainer,
  activateButton,
  deactivateButton,
  enableBtn,
  disableBtn,
  calculateTip,
  calculateTotal,
  populateNumericField,
};
