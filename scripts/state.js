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
export let state = { ...initialState };

export const resetState = () => {
  state = { ...initialState };
};
