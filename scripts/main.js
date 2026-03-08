import ui from './ui.js';
import handlers from './handlers.js';

const { inputs, percentageBtns, customPercentageBtn, resetButton } = ui;
const {
  handleOnInputKeypress,
  handleOnInputChange,
  handleOnPercentageBtnClick,
  handleOnCustomBtnClick,
  handleResetBtnClick,
} = handlers;

// !! The only visible limitation in my calculator is when the bill is at least 100 times less than the number of people (edge case)

inputs.forEach((input) => {
  input.addEventListener('keypress', handleOnInputKeypress);
  input.addEventListener('change', handleOnInputChange);
});

percentageBtns.forEach((btn) =>
  btn.addEventListener('click', handleOnPercentageBtnClick),
);

customPercentageBtn.addEventListener('click', handleOnCustomBtnClick);

resetButton.addEventListener('click', handleResetBtnClick);
