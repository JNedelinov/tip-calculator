let currentlyActiveBtn = null;
const customPercentageContainer = document.querySelector(
  '.custom-percentage-container',
);

document.querySelectorAll('.percentage-btn').forEach((btn) =>
  btn.addEventListener('click', (e) => {
    handleCustomBtnClick(e.target, customPercentageContainer);

    if (!currentlyActiveBtn) {
      e.target.classList.add('active');
      currentlyActiveBtn = e.target;
      return;
    }

    if (e.target.textContent === currentlyActiveBtn.textContent) {
      e.target.classList.remove('active');
      currentlyActiveBtn = null;
      return;
    }

    currentlyActiveBtn.classList.remove('active');
    e.target.classList.add('active');
    currentlyActiveBtn = e.target;
  }),
);

const handleCustomBtnClick = (btn, container) => {
  if (!btn.classList.contains('custom')) {
    container.classList.add('hidden');
  } else {
    container.classList.toggle('hidden');
  }
};

const resetButton = document.querySelector('.result .reset-btn');

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
    if (e.target.classList.contains('absolute-value')) {
      const value = e.target.value.toString();
      const newValue = [];
      for (let i = 0; i < value.length; i++) {
        if (i !== value.length - 1) {
          const currNum = Number(value[i]);
          const nextNum = Number(value[i + 1]);
          if (currNum === 0 && nextNum >= 0) {
            continue;
          }
        }
        newValue.push(value[i]);
      }

      e.target.value = newValue.join('');
    }

    // TODO: that's actually unnecessary since when we have '0' | '.' | '0.' | '0.0000' it's literally 0
    if (e.target.classList.contains('floating-value')) {
      const value = e.target.value;
      if (value.includes('.')) {
        const idxOfIntegerDot = value.indexOf('.');
        if (idxOfIntegerDot === 0) {
          e.target.value = '0' + value;
        }

        if (idxOfIntegerDot === value.length - 1) {
          e.target.value = value + '00';
        }
      }
    }
  });
});
