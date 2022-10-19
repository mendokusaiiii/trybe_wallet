import currenciesAPI from '../../services/currenciesAPI';

export const SUBMIT_EMAIL = 'SUBMIT_EMAIL';
export const submitEmail = (email) => ({
  type: SUBMIT_EMAIL,
  email,
});

export const REQUEST_API = 'REQUEST_API';
export const requestAPI = () => ({
  type: REQUEST_API,
});

export const DATA = 'DATA';
export const setAPIData = (data) => ({
  type: DATA,
  data,
});

export const FAIL_TO_CONNECT = 'FAIL_TO_CONNECT';
export const failToConnect = (fail) => ({
  type: FAIL_TO_CONNECT,
  fail,
});

export const dispatchAPI = () => async (dispatch) => {
  dispatch(requestAPI());
  try {
    const response = await currenciesAPI();
    delete response.USDT;
    dispatch(setAPIData(Object.keys(response)));
  } catch (error) {
    dispatch(failToConnect(error));
  }
};

export const SUM_EXPENSES = 'SUM_EXPENSES';
export const sumExpenses = (expenses) => ({
  type: SUM_EXPENSES,
  expenses,
});

export const ALL_EXPENSES = 'ALL_EXPENSES';
export const allExpenses = (allValueBRL) => ({
  type: ALL_EXPENSES,
  payload: {
    allValueBRL,
  },
});

export const ARR_EXPENSES = 'ARR_EXPENSES';
export const arrExpenses = (arr) => ({
  type: ARR_EXPENSES,
  payload: {
    arr,
  },
});

export const SUM_EDIT = 'SUM_EDIT';
export const sumEdit = (idToEdit) => ({
  type: SUM_EDIT,
  payload: {
    idToEdit,
  },
});
