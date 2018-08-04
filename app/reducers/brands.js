import initialState from '../initialState.json';

export default (state = initialState.brands, action) => {
  switch (action.type) {
    default:
      return state;
  }
};
