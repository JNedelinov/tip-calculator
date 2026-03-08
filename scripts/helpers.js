const resetInputValues = (inputs) =>
  inputs.forEach((input) => (input.value = ''));
const resetNumericFields = (fields) =>
  fields.forEach((field) => (field.textContent = '0.00'));
const resetState = (state, initialState) => {
  state = { ...initialState };
};

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

const disableBtn = (btn) => {
  btn.disabled = true;
};

const calculateTotal = (bill = 0, tip = 0, amountOfPeople = 1) =>
  (bill + tip) / amountOfPeople;

const calculateTip = (bill = 0, tipPercentage = 0, amountOfPeople = 1) =>
  (bill * (tipPercentage / 100)) / amountOfPeople;

const populateNumericField = (field, number = 0) => {
  field.textContent = number.toFixed(2);
};

export default {
  resetInputValues,
  resetNumericFields,
  resetState,
  hideContainer,
  showContainer,
  activateButton,
  deactivateButton,
  disableBtn,
  calculateTip,
  calculateTotal,
  populateNumericField,
};
