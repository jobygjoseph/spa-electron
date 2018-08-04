import fetch from 'node-fetch';

import C from '../constants';

export const clearForm = () => ({
  type: C.CLEAR_FORM,
  payload: null,
});

export const updateStatus = status => ({
  type: C.UPDATE_STATUS,
  payload: status,
});

export const addError = message =>
({
  type: C.ADD_ERROR,
  payload: message,
});

export const fetchStatus = apiUrl => (dispatch) => {
  fetch(apiUrl, { mode: 'cors' })
    .then((res) => {
      const { status } = res;
      dispatch(updateStatus(status));
    })
    .catch((e) => {
      console.error(e);
      dispatch(
        addError(e.message),
      );
    });
};
